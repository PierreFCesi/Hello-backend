const http = require('http')
const hash = require('object-hash')
const controller = require('./controller')
const PORT = 5000
var express = require('express')
var app = express()

app.get('/',  async function (req, res)  {
  res.send('home')
})

app.get('/login/:userid',  async function (req, res)  {
  res.json({userid: req.params.userid})
  const token = controller.generateAccessToken()
  res.send('login' + token)
})

app.get('/logout',  async function (req, res)  {
  res.send('logout')
})

app.post('/register',  async function (req, res)  {
  const body = req.rawHeaders
  const username = body[1]
  const psw = hash(body[3])

  const resp = {username: username, psw: psw, token: controller.generateAccessToken(username)}
  res.send(resp)
})

app.post('/create-session', async function (req, res)  {
  // requete en forme : http://localhost:5000/create-session/CD45FT

  var id = req.params.id_class
  var o_date = new Date();
  var period = ""
  var hours = o_date.getHours()
  if(hours <= 12)
  {
    period="morning"
  }
  if(hours >= 13) {
    period="afternoon"
  }
  res.send('create-session ' + id + ' ' + period)
})

app.get('/get-user-absences', async function(req, res) {
  res.send('get-user-absences')
})

app.get('/refresh-token', async function(req, res){
  res.send('refresh-token')

})

app.post('/end-session',  async function (req, res)  {
  res.send('end-session')
})


app.get('/get-token', async function(req, res){
  res.send('get-token')
})

app.get('/get-user-status', async function(req, res){
  res.send('get-user-status')
})


app.listen(PORT,  async function (){ 
  console.log(`listening on http://localhost:${PORT}`)
})