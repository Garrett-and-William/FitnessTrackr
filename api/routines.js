const express = require('express');
const routinesRouter = express.Router();
const { getAllRoutines, getRoutineById, updateRoutine} = require("../db")

const { requireUser } = require('./utils');

// GET /api/routines


routinesRouter.get('/', async (req, res, next) => {
    try {
      const allRoutines = await getAllRoutines();
  
      const publicRoutines = allRoutines.filter(post => {
        // retrieve all public posts
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
  
      const routine = await createRoutine(postRoutine);
  
      if (routine) {
        res.send(routine);
        alert('Routine has posted')
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

postsRouter.patch('/:routineId', requireUser, async (req, res, next) => {
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

// POST /api/routines/:routineId/activities

module.exports = router;