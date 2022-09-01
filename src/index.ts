/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'

// const password = process.env.SECRET_KEY;
const app = express()

const PORT = process.env.PORT || 8000
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')

  // res.setHeader('Access-Control-Allow-Credentials', 'false');

  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// SEARCH REQUEST

app.get('/login', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

const handleLoginFull = () => {
  const code = location.href.includes('=') ? location.href.split('=')[1] : null

  const requestBody = {
    client_id:
      'dj0yJmk9Nfgdg1VYYlhZV0FXbXdjJmQ9WVdrOVYxVlNVV2RzUjBvbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ1',
    client_secret: '9aaa50e61add7e133c8802ef411e27fa16cceb30',
    redirect_uri: 'https://localhost:8080/',
    code: code,
    grant_type: 'authorization_code',
  }
  const data = Object.keys(requestBody)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key])
    )
    .join('&')

  fetch('https://api.login.yahoo.com/oauth2/get_token', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data, // body data type must match "Content-Type" header
  })
}
