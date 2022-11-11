const client = require("./client");
const  bcrypt  = require("bcrypt")
// database functions

// user functions
async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const user = await client.query(`
          INSERT INTO users(username, password)
          VALUES ($1,$2)
          RETURNING *;
      `,[username, hashedPassword])

      return user
    }catch(error){
      console.log(error)
    }
}

async function getUser({ username, password }) {

}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}