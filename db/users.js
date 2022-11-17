const client = require("./client");
const  bcrypt  = require("bcrypt");
const { getAllRoutinesByUser } = require("./routines");

// database functions

// user functions
async function createUser( {username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows: [users]} = await client.query(`
          INSERT INTO users(username, password)
          VALUES ($1,$2)
          RETURNING id, username; 
      `,[username, hashedPassword])
      //removed * from above so it would not return a password
// console.log(users)
      return users
    }catch(error){
      console.log(error)
    }
}
 // currently returning all users
async function getUser(username, password) {
  const userByName = await getUserByUserName(username);
  const hashedPassword = userByName.password;
  
  const isValid = await bcrypt.compare(password, hashedPassword)
  if (isValid == true){ //verify password against hashed password
  try {
    //select username from user table
    const {rows:[user]} = await client.query(`
    SELECT id, username
    FROM users
    WHERE username = $1;
    `, [username]);
 
     
  console.log(user)
 
    return user
  } catch (error) {
    return error;
  }

    }else{
    return console.log("password or user does not exist")
  
}
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1
    `, [userId]);
   
    if (!user) {
      return null
    }

    // user.routines = await getAllRoutinesByUser(user.username);

    return user;
  } catch (error) {
    throw error;
  }
}


async function getUserByUserName(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1
    `, [username]);

    if (!user) {
      return null
    }

    // user.routines = await getAllRoutinesByUser(userName);
// console.log('getUserByUserName: ', user)
    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUserName,
}