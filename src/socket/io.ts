import { Socket } from 'socket.io'
import { IMissileLaunch } from '../models/missileLaunch.model'
import missiles from '../data/missiles.json'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'
import { io } from '../app'

export const handelIoConnection = (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('missile_launch', (misileLaunch: IMissileLaunch) => {
    io.emit('new_launch_has_accord')
  })

  socket.on('interception_launch', (socket) => {
    io.emit('new_launch_has_accord', { _id: (socket as any)._id })
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
}
