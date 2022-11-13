const express = require('express');
const usersRouter = express.Router();
const {getUserByUserName, createUser, getUser } = require('../db');
const jwt = require('jsonwebtoken');
const  bcrypt  = require("bcrypt");


//May not be needed
// router.get('/', async (req, res) => {
//     const users = await getAllUsers();
//   res.send({
//     users
//   });
  
//   });
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
    const user = await getUserByUserName(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword)
    if (user && isValid) {
      // create token & return to user
      const token = jwt.sign({id: user.id, username: username }, 'server secret');

      res.send({ message: "you're logged in!", token: token });
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
    const { username, password} = req.body;
  
    try {
      const _user = await getUserByUserName(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password,
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;