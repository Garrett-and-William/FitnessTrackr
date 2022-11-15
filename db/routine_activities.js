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
        try{
          const {row : [getbyid]} = client.query(`
          SELECT * FROM routineactivities
          WHERE id = $1;
          `, [id])
          return getbyid
        }catch(error){
          console.log(error)
        }
}

async function getRoutineActivitiesByRoutine({ id }) {
  // select and return an array of all routine_activity records
  console.log('getting to the problem area')
  try {
    
  const attachedRoutine = await 
    attachActivitiesToRoutines(await getActivityById(id))
  
  console.log(attachedRoutine)
} catch (error) {
    console.log(error)
}
    

}


async function updateRoutineActivity({ id, ...fields }) {

}

async function destroyRoutineActivity(id) {

}

async function canEditRoutineActivity(routineActivityId, userId) {

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};