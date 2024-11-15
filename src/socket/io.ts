import { Socket } from 'socket.io'
import { IMissileLaunch } from '../models/missileLaunch.model'
import missiles from '../data/missiles.json'
import { OrgnizationsEnum } from '../enums/orgnizationEnum'
import { io } from '../app'

export const handelIoConnection = (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('join_room', (roomName) => {
    if(roomName.split(' ')[0] != 'IDF') {
      socket.join(OrgnizationsEnum.IDFCenter)
      socket.join(OrgnizationsEnum.IDFNorth)
      socket.join(OrgnizationsEnum.IDFSouth)
      socket.join(OrgnizationsEnum.IDFWestBank)
      console.log(`User with ID: ${socket.id} joined room: terorists room`)
    }else{
      console.log(`User with ID: ${socket.id} joined room: ${roomName}`)
    }
  })

  socket.on('missile_launch', (misileLaunch: IMissileLaunch) => {
    io.emit('new_launch_has_accord')
    io.to(misileLaunch.launchTo).emit('new_launch_has_accord')
    console.log(
      `missile_launch to ${misileLaunch.launchTo} from ${misileLaunch.launchFrom}`
    )
    io.to(misileLaunch.launchFrom).emit('new_launch_has_accord')
  })

  socket.on('interception_launch', ()=>{
    io.emit('new_launch_has_accord')
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
}
