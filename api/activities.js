const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, updateActivity} = require('../db');

const { requireUser } = require('./utils');


// GET /api/activities/:activityId/routines



// GET /api/activities

activitiesRouter.get('/', async (req, res, next) => {
    try {
      const allActivities = await getAllActivities();
    
      res.send({
        allActivities
      });
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
    const { aid } = req.params;
    const { name, description } = req.body;
  
    const updateFields = {};
  
    if (name) {
      updateFields.name = name;
    }
  
    if (goal) {
      updateFields.description = description;
    }

    try {
  
      if (req.user) {
        const updatedActivity = await updateActivity(aid, updateFields);
        res.send({ updatedActivity })
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

module.exports = activitiesRouter;