const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Signup/Login</title>
      </head>
      <body>
        <h1>Welcome to my App!</h1>
        <button id="signupBtn">Signup</button>
        <button id="loginBtn">Login</button>

        <script>
          const signupBtn = document.getElementById('signupBtn');
          const loginBtn = document.getElementById('loginBtn');

          signupBtn.addEventListener('click', function() {
            window.location.href = '/signup';
          });

          loginBtn.addEventListener('click', function() {
            window.location.href = '/login';
          });
        </script>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/signup' , (req,res) => {

    const html = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset = "UTF-8">
            <title>Authorisation page</title>
        </head>
        <body>
        <h1 align = center>Signup Page</h1>
          <h1>Kindly enter your authorization details</h1>
          <form id = "#signup-form">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">

            <label for="password">Password:</label>
            <input type="password" id="password" name="password">

            <input type="submit" value="Submit">
           </form>

           <script>
            const form = document.querySelector('#signup-form');

            form.addEventListener('submit', async (event) => {
              event.preventDefault();

              const formData = new FormData(form);
              const response = await fetch('/signup', {
                method: 'POST',
                body: formData
              });

              if (response.ok) {
                console.log('User signed up successfully');
              } else {
                console.error('Failed to sign up user');
              }
            });
          </script>

        </body>
      </html>
    `
    res.send(html);
})


app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  console.log("sending post request to signup function");

  // Check if a user with the given email already exists in the USERS array
  const userExists = USERS.some(user => user.email === email);

  // If a user with the given email already exists, return a 409 (Conflict) status code
  if (userExists) {
    res.status(409).send('User already exists');
    return;
  }

  // Otherwise, store the email and password in the USERS array
  USERS.push({ email, password });

  // Return a 200 (OK) status code to the client
  res.status(200).send('User created successfully');
  window.location.href("/login");
})

app.get('/login' , (req,res) => {

  const html = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset = "UTF-8">
          <title>Authorisation page</title>
      </head>
      <body>
      <h1 align = center>Login Page</h1>
        <h1>Kindly enter your authorization details</h1>
        <form id = "#signup-form">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">

          <label for="password">Password:</label>
          <input type="password" id="password" name="password">

          <input type="submit" value="Submit">
         </form>

         <script>
          const form = document.querySelector('#signup-form');

          form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const response = await fetch('/login', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              console.log('User signed up successfully');
            } else {
              console.error('Failed to sign up user');
            }
          });
        </script>

      </body>
    </html>
  `
  res.send(html);
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  const {email , password} = req.body;
  console.log("Sending data to login");

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

  const exists = USERS.some(user=> user.email === email && user.password === password)

  // If the password is the same, return back 200 status code to the client

  if(exists === true)
    res.status(200);
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client


  res.send('Hello World from route 2!')
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})