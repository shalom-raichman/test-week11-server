import express from 'express'
import 'dotenv/config'
import { connectToMongo } from './config/db'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { handelIoConnection } from './socket/io'
import userControllers from './controllers/user.controller'
import missilesComtroller from './controllers/missiles.controller'

const PORT = process.env.PORT || 3000

const app = express()
const httpServer = http.createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: '*',
  }
})

io.on('connection', handelIoConnection)
connectToMongo()

app.use(express.json())
app.use(cors())

app.use('/api/users', userControllers)
app.use('/api/missiles', missilesComtroller)

httpServer.listen(PORT, () => {
  console.log(`Server is up and runing on http://localhost:${PORT}`)
})
