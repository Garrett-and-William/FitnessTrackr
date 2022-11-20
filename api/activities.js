const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity, getActivityById} = require('../db');

const { requireUser } = require('./utils');


// GET /api/activities

activitiesRouter.get('/', async (req, res, next) => {
    try {
      const allActivities = await getAllActivities();

    // console.log('active api main', allActivities)
      res.send(
        allActivities
      );
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// POST /api/activities

activitiesRouter.post('/', requireUser, async (req, res, next) => {
    const { name, description } = req.body;

    const postActivity = {}
  
    try {
  
      postActivity.name = name;
      postActivity.description = description;

  
      const activity = await createActivity(postActivity);
  
      if (activity) {
        res.send(activity);
        alert('Activity has posted')
      } else {
        next({
          name: 'ActivityCreationError',
          message: 'There was an error creating your routine. Please try again.'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// PATCH /api/activities/:activityId

activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
  // console.log(req.params)  
  const aid = req.params;
    // console.log('activity id', aid)
    const { name, description } = req.body;
  
    const updateFields = {};
  
    if (name) {
      updateFields.name = name;
    }
  
    if (description) {
      updateFields.description = description;
    }

    try {
  
      if (req.user) {
        const updatedActivity = await updateActivity(aid, updateFields);
        // console.log('This is the patched', {updatedActivity})
        res.send(updatedActivity)
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You must be logged in to update an activity'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  
// GET /api/activities/:activityId/routines

activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  const aid = req.params.activityId
  // console.log(req.params)
  // console.log(aid)

  try {
    const allActivities = await getPublicRoutinesByActivity(aid);
  
    // console.log('this is all activities', allActivities)
    res.send(
      allActivities
    );
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;