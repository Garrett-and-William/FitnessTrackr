const client = require("./client");
const  bcrypt  = require("bcrypt");
const { getAllRoutinesByUser } = require("./routines");

// database functions

// user functions
async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows} = await client.query(`
          INSERT INTO users(username, password)
          VALUES ($1,$2)
          RETURNING *; 
      `,[username, hashedPassword])
      //removed * from above so it would not return a password
console.log(rows)
      return rows
    }catch(error){
      console.log(error)
    }
}

async function getUser({username, password}) {
  const user = await getUserByUserName(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword)
  try {
    //select username from user table
    const {rows} = await client.query(`
    SELECT *
    FROM users
    `);
 
    
  console.log(rows)
  
  if (isValid= true){ //verify password against hashed password
 
    return rows
  }else{
    return console.log("password or user does not exist")
  }
    
    } catch (error) {
      return error;
    }
 

}

async function getUserById(userId) {
  try {
    const { rows } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${ userId }
    `);
   
    if (!user) {
      return null
    }

    // user.routines = await getAllRoutinesByUser(user.username);

    return rows;
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