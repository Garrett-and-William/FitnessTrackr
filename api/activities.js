const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, } = require('../db');


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

routinesRouter.post('/', requireUser, async (req, res, next) => {
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

module.exports = activitiesRouter;