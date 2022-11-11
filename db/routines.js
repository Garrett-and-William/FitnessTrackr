const client = require("./client");

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
    // console.log(rows)
    return rows

  } catch (error) {
    console.log(error)
  }
}
async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

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