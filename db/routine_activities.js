const client = require("./client");
const {attachActivitiesToRoutines, getActivityById} = require('./activities')

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try{
    const addactivityroutine = await client.query(`
        INSERT INTO routineactivities("routineId", "activityId", count, duration)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `, [routineId, activityId, count, duration])
      return addactivityroutine
    } catch(error) {
      console.log(error)
    }
}

async function getRoutineActivityById(id) {
  // console.log(id)
        try{
          const {rows: [getbyid]} = await client.query(`
          SELECT * FROM routineactivities
          WHERE id = $1;
          `, [id])
          // console.log(getbyid)
          return getbyid
        }catch(error){
          console.log(error)
        }
}

async function getRoutineActivitiesByRoutine({ id }) {
  // select and return an array of all routine_activity records
  // console.log('getting to the problem area')
  try {
    
  const attachedRoutine = await 
    attachActivitiesToRoutines(await getActivityById(id))
  
  // console.log(attachedRoutine)
  return attachedRoutine
} catch (error) {
    console.log(error)
}
    

}


async function updateRoutineActivity({ id, ...fields }) {
  
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
// console.log('RoutineAcitivy Update: ', rows)
    return rows;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  // console.log(id)
  try {
    await client.query(`
      DELETE FROM routineactivities
      WHERE id=$1;
      `, [id]);
    console.log('RoutineActivity Destroyed')
  } catch (error) {
    console.log (error)
    
  }

}

// async function canEditRoutineActivity(routineActivityId, userId) {
//   console.log(routineActivityId)
//   console.log (userId)
//     if(x){
      
//     }


// }

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  // canEditRoutineActivity,
};