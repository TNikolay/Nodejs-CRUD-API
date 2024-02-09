import 'dotenv/config'
import http from 'http'
import { MongoLite } from './MongoLite.js'
import { getBody } from './utils.js'
import { IUser, IUserData, isUserData } from './model.js'

const PORT = Number(process.env.PORT) || 4000
console.log('--------------', PORT)

const db = new MongoLite()

const server = http.createServer(async (req, res) => {
  console.log('We have a new request: ', req.url, req.method)

  res.setHeader('Content-Type', 'application/json')

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        console.log('!!!! Get', req.url)
        res.end(JSON.stringify(db.getUsers()))
        res.statusCode = 200
      }

      break

    case 'POST':
      {
        console.log('Post', req.url)
        const data = await getBody(req)
        console.log('user : ', data)
        if (isUserData(data)) {
          const newUser = db.addUser(data)
          res.statusCode = 201
          res.end(JSON.stringify(newUser))
        } else {
          res.statusCode = 400
          res.end(JSON.stringify({ message: 'Invalid data in request' }))
        }
      }
      break

    case 'DELETE':
      console.log('delete', req.url)
      break

    case 'PUT':
      console.log('put', req.url)
      break

    default:
      res.statusCode = 404
      res.end(JSON.stringify({ message: 'Error 404 - wrong address' }))
  }
})

server.listen(PORT, 'localhost', () => {
  console.log(`Server started at ${PORT}`)
})
