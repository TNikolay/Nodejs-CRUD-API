import 'dotenv/config'
import http from 'http'
import { MongoLite } from './MongoLite.js'
import { getBody, isUUID4, sendError, sendError404 } from './utils.js'
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
        res.statusCode = 200
        res.end(JSON.stringify(db.getUsers()))
      } else if (req.url?.startsWith('/api/users/')) {
        const uuid = req.url.slice(11)

        if (isUUID4(uuid)) {
          const user = db.getUser(uuid)
          if (user) {
            res.statusCode = 200
            res.end(JSON.stringify(user))
          } else sendError(res, 404, 'User not found')
        } else sendError(res, 400, 'Invalid user id format')
      } else sendError404(res)
      break

    case 'POST':
      if (req.url === '/api/users') {
        const data = await getBody(req)
        if (isUserData(data)) {
          const newUser = db.addUser(data)
          res.statusCode = 201
          res.end(JSON.stringify(newUser))
        } else sendError(res, 400, 'Invalid data in request')
      } else sendError404(res)
      break

    case 'DELETE':
      if (req.url?.startsWith('/api/users/')) {
        const uuid = req.url.slice(11)
        if (isUUID4(uuid)) {
          if (db.deleteUser(uuid)) {
            res.statusCode = 204
            res.end()
          } else sendError(res, 404, 'User not found')
        } else sendError(res, 400, 'Invalid user id format')
      } else sendError404(res)
      break

    case 'PUT':
      if (req.url?.startsWith('/api/users/')) {
        const uuid = req.url.slice(11)
        if (isUUID4(uuid)) {
          const data = await getBody(req)
          if (isUserData(data)) {
            const user = db.updateUser(uuid, data)
            if (user) {
              res.statusCode = 200
              res.end(JSON.stringify(user))
            } else sendError(res, 404, 'User not found')
          } else sendError(res, 400, 'Invalid data in request')
        } else sendError(res, 400, 'Invalid user id format')
      } else sendError404(res)
      break

    default:
      sendError404(res)
  }
})

server.listen(PORT, 'localhost', () => {
  console.log(`Server started at ${PORT}`)
})
