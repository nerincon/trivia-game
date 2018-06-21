const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

app.get('/api/get-questions', function (req, res, next) {
  var apiUrl = 'https://opentdb.com/api.php?amount=10'
  axios.get(apiUrl)
    .then(function (r) {
      console.log('sending back data')
      var data = r.data.results
      res.json(data)
    })
    .catch(next)
})

// app.get('/play/:game-id', function (req, res, next) {
//   var apiUrl = 'https://opentdb.com/api.php?amount=10'
//   axios.get(apiUrl)
//     .then(function (r) {
//       console.log('sending back data')
//       var data = r.data.results
//       res.json(data)
//     })
//     .catch(next)
// })

app.listen(9090, function () {
  console.log('Listening on port 9090')
})
