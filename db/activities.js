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
      const {rows: [allactivity]} = await client.query(`
      SELECT * from activities;`)
      console.log(allactivity)
      return allactivity
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
      console.log(activitybyid)
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
      console.log(getbyname)
      return getbyname
    } catch (error) {
      console.log(error)
    }
}

async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}; 