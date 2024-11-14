import { Socket } from 'socket.io'
import { IMissileLaunch } from '../models/missileLaunch.model'
import missiles from '../data/missiles.json'

export const handelIoConnection = (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('join_room', (roomName) => {
    socket.join(roomName)
    console.log(`User with ID: ${socket.id} joined room: ${roomName}`)
  })

  socket.on('missile_launch', (misileLaunch: IMissileLaunch) => {
    misileLaunch.timeToHit = missiles.find(m=> m.name == misileLaunch.rocketType)?.speed!
    socket.to(misileLaunch.launchTo).emit('new_launch_has_accord', misileLaunch)
    console.log(`missile_launch to ${misileLaunch.launchTo}`)
    socket.to(misileLaunch.launchFrom).emit('new_launch_has_accord', misileLaunch)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
}
