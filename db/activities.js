const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try{
    const activity = await client.query(`
      INSERT INTO activities(name,description)
      VALUES ($1,$2)
      RETURNING *;
  `,[name,description])
    return activity
  }catch(error){
    console.log(error)
  }
}

async function getAllActivities() {
    try {
      const { rows } = await client.query(`
      SELECT * FROM "activities";`)
     
      console.log('this is the active', rows)
      // console.log('these are the rows', rows)
      return rows
    } catch (error) {
      console.log(error)
    }
}

async function getActivityById(id) {
    try {
      const {rows: [activitybyid]} = await client.query(`
        SELECT * FROM activities
        WHERE id = $1;
      `,[id])
      // console.log(activitybyid)
      return activitybyid
    } catch (error) {
      console.log(error)
    }
  }
async function getActivityByName(name) {
    try {
      const {rows: [getbyname]} = await client.query(`
        SELECT * FROM activities
        WHERE name = $1;
      `, [name])
      // console.log(getbyname)
      return getbyname
    } catch (error) {
      console.log(error)
    }
}

async function attachActivitiesToRoutines(routines) {
  // no side effects
  const routinesToReturn = [...routines];
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];
  
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: activities } = await client.query(`
      SELECT activities.*, routineactivities.duration, routineactivities.count, routineactivities.id AS "routineActivityId", routineactivities."routineId"
      FROM activities 
      JOIN routineactivities ON routineactivities."activityId" = activities.id
      WHERE routineactivities."routineId" IN (${ binds });
    `, routineIds);

    // loop over the routines
    for(const routine of routinesToReturn) {
      // filter the activities to only include those that have this routineId
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      // attach the activities to each single routine
      routine.activities = activitiesToAdd;
    }
   
    // console.log(routinesToReturn)
    return routinesToReturn;
    
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  console.log(fields)
  const stringify = Object.keys(fields).map((key, index) => {
    return `"${key}" = $${index + 1} `
  }).join(', ')
  try{
    const {rows: [updateActivity]} = await client.query(`
      UPDATE activities
      SET ${stringify}
      WHERE id = ${id}
      RETURNING *;
    `, Object.values(fields))
    return updateActivity
  } catch(error){
    console.log(error)
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}; 