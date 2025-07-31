// console.log('Hello, World!');
const express=require ('express')
const app=express()
const port=3000

app.get('/',(req, res)=> {
  res.send('Hello expresso')
})

// app.post('/home', (req, res) => {
//   res.send('Got a POST request')
// })

app.get('/users/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello, ${username}!`);
});

app.all('/about', (req, res, next) => {
  console.log('Accessing the about section ...')
  next()
})

app.get('/example/a/:maybe', (req, res) => {
  const maybe = req.params.maybe;
  res.send(`Hello from A! Maybe: ${maybe}`);
})

app.get('/example/b/:maybe', (req, res) => {
  const maybe = req.params.maybe;
  res.send(`Hello from B! Maybe: ${maybe}`);
  app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})

})



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });




















