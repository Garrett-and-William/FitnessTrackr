const express = require('express');
const routinesRouter = express.Router();
const { getAllRoutines, getRoutineById, updateRoutine, destroyRoutine, destroyRoutineActivity, getActivityById, createRoutine } = require("../db")

const { requireUser } = require('./utils');

// GET /api/routines


routinesRouter.get('/', async (req, res, next) => {
    try {
      const allRoutines= await getAllRoutines();
  // console.log(allRoutines)
      const publicRoutines = allRoutines.filter(publicRoutines => {
        // retrieve all public routines
        if (publicRoutines.isPublic) {
          return true;
        }
      
        // if private but routine belongs to owner
        if (req.user && allRoutines.creatorId === req.user.id) {
          return true;
        }
      
        // none of the above are true
        return false;
      });
    // console.log(publicRoutines)
      res.send({
        publicRoutines
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


// POST /api/routines

routinesRouter.post('/', requireUser, async (req, res, next) => {
    const { name, goal, isPublic } = req.body;

    const postRoutine = {}
  
    try {
      postRoutine.creatorId = req.user.id;
      postRoutine.name = name;
      postRoutine.goal = goal;
      postRoutine.isPublic = isPublic;
  
      const {rows: [routine]} = await createRoutine(postRoutine);
  
      if (routine) {
        // console.log('routine', routine)
        res.send(routine);
        
        
      } else {
        next({
          name: 'RoutineCreationError',
          message: 'There was an error creating your routine. Please try again.'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// PATCH /api/routines/:routineId

routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
    const { rid } = req.params;
    const { name, goal, isPublic } = req.body;
  
    const updateFields = {};
  
    if (name) {
      updateFields.name = name;
    }
  
    if (goal) {
      updateFields.goal = goal;
    }

    if (isPublic) {
        updateFields.isPublic = isPublic;
      }
  
    try {
      const routine = await getRoutineById(rid);
  
      if (routine.creatorId === req.user.id) {
        const updatedRoutine = await updateRoutine(rid, updateFields);
        res.send({ updatedRoutine })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a routine that is not yours'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// DELETE /api/routines/:routineId

routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
    try {
      const routine = await getRoutineById(req.params.routineId);
      // console.log("this is rout:", routine)
      if (routine && routine.creatorId === req.user.id) {
       await Promise.all(
        destroyRoutineActivity(routine.routineId),
        destroyRoutine(routine.id)
       )
  
        res.send('Succesfully Deleted');
      } else {
        //if no routine is found send not found error. If no user then through no user error
        next(routine ? { 
          name: "UnauthorizedUserError",
          message: "You cannot delete a routine which is not yours"
        } : {
          name: "RoutineNotFoundError",
          message: "That routine does not exist"
        });
      }
  
    } catch ({ name, message }) {
      next({ name, message })
    }
  });

// POST /api/routines/:routineId/activities



module.exports = routinesRouter;