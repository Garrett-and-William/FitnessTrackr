const express = require('express');
const usersRouter = express.Router();
const { 
    getUserByUserName, 
    createUser, 
    getUser, 
    getAllRoutinesByUser, 
    getPublicRoutinesByUser } = require('../db');

const  bcrypt  = require("bcrypt");
const jwt = require('jsonwebtoken');



// POST /api/users/login

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    //Can Probably Use getUser func
    const user = await getUserByUserName(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword)
    if (user && isValid) {
      // create token & return to user
      const token = jwt.sign({id: user.id, 
        username: username 
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'});
      
        res.send({ message: `Thank you for logging in ${username}`, token: token });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});


// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  // console.log('made it to api')
    const { username, password} = req.body;
  
    try {
      const userExists = await getUserByUserName(username);
  
      if (userExists) {
        next({
          name: 'UserExistsError',
          message: 'That Username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password
      });
      
  
      const token = jwt.sign({id: user.id, 
        username: username 
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'});
  
      res.send({ 
        user,
        message: "You are ready to start tracking your fitness journey",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
    const {username, password} = req.user;
    
    try {
    const user = await getUser(username, password)
    // console.log('/me', user)
   res.send(user)
    } catch ({ name, message }) {
      next({ name, message })
    } 
    }
// }
);



// GET /api/users/:username/routines
usersRouter.get('/:username/routines', async (req, res, next) => {
    
    const username = req.params.username;
    // console.log('params', username)
    try {
      const routines = await getAllRoutinesByUser({username: username})
      res.send(routines)
  
    } catch ({ name, message }) {

      next({ name, message });
    }
  });

module.exports = usersRouter;