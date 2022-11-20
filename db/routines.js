const client = require("./client");
const { attachActivitiesToRoutines, getActivityById } = require("./activities")
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
  console.log(id)
  try {
    const {rows} = await client.query(`
        SELECT * FROM routines
        WHERE id = $1;
    `,[id])
    return rows
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
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id 
    `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error
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
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
        `, [username]);
        console.log(user)
    if (!user) {
      return null
    }
        const { rows } = await client.query(`
        SELECT * FROM routines
        WHERE "creatorId" = ${user.id};`)
        return rows
    } catch (error) {
        console.log(error)
    }

  }
async function getPublicRoutinesByUser({ username }) {
  // console.log('routines username', username)
  try {
  //  const user = await getUserByUserName(username)
  //  console.log(user)
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1;
  `, [username]);

  if (!user) {
    return null
  }
    // console.log('this is the user', user)
    const { rows } = await client.query(`
    SELECT * FROM routines
    WHERE "creatorId" = '${user.id}' AND "isPublic" = 'true'; `)
    // console.log(routinesByUser)
    return rows
  }   catch (error) {
    console.log(error)
  } 
}

async function getPublicRoutinesByActivity( id ) {
  try {
    // console.log('routebyactive', id)
    const activity = await getActivityById(id)
    console.log(activity.id)
    const {rows: [activeroute]} = await client.query(`
      SELECT * FROM routineactivities
      WHERE "activityId" = ${activity.id} 
      ;`)

console.log(activeroute)


    const routes = await getRoutineById(activeroute.routineId)
    console.log(routes)
      if (routes.isPublic == false){
        return null
      }
    return routes

    // let checkit = activities.rows.map((el) => {return ", "})
    // let checkitInd = activities.rows.map((_,ind) => {return })

    // const { rows } = await client.query(`
    // SELECT * FROM routines
    // WHERE 'id' IN (${checkit})
    // `, [])

    
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
      UPDATE routines
      SET ${setString}
      WHERE id=${ route }
      RETURNING *;
    `, Object.values(fields));

    return rows;
  } catch (error) {
    throw error;
  }

}

async function destroyRoutine(id) {
  try {
    await client.query(`
      DELETE FROM routines
      WHERE id=$1;
      `, [id]);
    console.log('Routine Destroyed')
  } catch (error) {
    console.log (error)
    
  }
}

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