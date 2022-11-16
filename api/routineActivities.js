const express = require('express');
const routineActivitiesRouter = express.Router();
const { requireUser } = require('./utils');

const { 
    getRoutineById,
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity
  } = require('../db');
  

// PATCH /api/routine_activities/:routineActivityId

routineActivitiesRouter.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const { raid } = req.params;
    const { duration, count } = req.body;
  
    const updateFields = {};
  
    if (duration) {
      updateFields.duration = duration;
    }
  
    if (count) {
      updateFields.count = count;
    }
  
    try {
      const originalRaid = await getRoutineById(await getRoutineActivityById(raid).routineId);
  
      if (originalRaid.creatorId === req.user.id) {
        const updatedRoutineActivity = await updateRoutineActivity(raid, updateFields);
        res.send({ post: updatedRoutineActivity })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a post that is not yours'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// DELETE /api/routine_activities/:routineActivityId

routineActivitiesRouter.delete('/:routineActivityId', requireUser, async (req, res, next) => {
    try {
      const raid = await getRoutineActivityById(req.params);
      const routineById = await getRoutineById(raid.routineId);
  
      if (routineById.creatorId === req.user.id) {
         await destroyRoutineActivity(req.params);
  
        res.send('Succesfully Deleted');
      } else {
       
        next( raid ? { 
          name: "UnauthorizedUserError",
          message: "You cannot delete a post which is not yours"
        } : {
          name: "PostNotFoundError",
          message: "That post does not exist"
        });
      }
  
    } catch ({ name, message }) {
      next({ name, message })
    }
  });

module.exports = routineActivitiesRouter;