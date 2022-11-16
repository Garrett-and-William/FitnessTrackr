const client = require("./client");
const { attachActivitiesToRoutines,getActivityById } = require("./activities")
const { getUserByUserName } = require("./users")
async function createRoutine({ creatorId, isPublic, name, goal }) {

  try { 

    const createroutine = await client.query(`
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `,[creatorId, isPublic, name, goal])
    return createroutine
  } catch (error) {
    console.log(error)
  }
}

async function getRoutineById(id) {
  try {
    const {rows: [ getbyid ] } = await client.query(`
        SELECT * FROM routines
        WHERE id = $1;
    `,[id])
    return getbyid
  } catch (error) {
      console.log(error)
  }

}

async function getRoutinesWithoutActivities() {
  try {
    const {rows} = await client.query(`
      SELECT * FROM routines;
    `)
    return rows
  } catch (error) {
    console.log(error)
  }
}
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `)
    return rows
  } catch (error) {
    console.log(error)
  }

}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines
    WHERE 'isPublic' = true;`)
    return rows
  } catch (error) {
    console.log(error)
  }
}

async function getAllRoutinesByUser({ username }) {

    try {
        const user = getUserByUserName(username)
        const { rows } = await client.query(`
        SELECT * FROM routines
        WHERE 'creatorId' = ${user.id};`)
        return rows
    } catch (error) {
        console.log(error)
    }

  }
async function getPublicRoutinesByUser({ username }) {
  try {
    const user = getUserByUserName(username)
    const { rows } = await client.query(`
    SELECT * FROM routines
    WHERE 'creatorId' = ${user.id} AND 'isPublic' = true; `)
    return rows
  }   catch (error) {
    console.log(error)
  } 
}
async function getPublicRoutinesByActivity({ id }) {
  try {
    const activity = getActivityById(id)
    const activities = await client.query(`
    SELECT * FROM routineactivities
    WHERE 'activityId' = ${activity.routineId};`)

    let checkit = activities.rows.map((el) => {return ", "})
    let checkitInd = activities.rows.map((_,ind) => {return })

    const { rows } = await client.query(`
    SELECT * FROM routines
    WHERE 'id' IN (${checkit})
    `, [])

    
  }   catch (error) {
    console.log(error)
  } 
}

async function updateRoutine({ id, ...fields }) {

  const route = id.id
 
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return if no fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows } = await client.query(`
      UPDATE routineactivities
      SET ${setString}
      WHERE id=${ route }
      RETURNING *;
    `, Object.values(fields));

    return rows;
  } catch (error) {
    throw error;
  }

}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};