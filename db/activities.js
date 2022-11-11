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
      const {rows} = await client.query(`
      SELECT * from activities;`)
      // console.log(rows)
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
    
  
    try{
        console.log(routines)
        const {row} = await client.query(`
        SELECT * FROM activities
        WHERE routineactivities("activityId") = ${routines.id};
        `)
      routines.activities = row;
      return routines.activities;
    }catch(error){
      console.log(error)
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