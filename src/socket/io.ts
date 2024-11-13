import { Socket } from 'socket.io'
import { io } from '../app'

export const handelIoConnection = (socket: Socket) => {
  socket.on('disconnect', () => console.log(socket.id + ' disconnect'))
  socket.on('new-vote', () => {
    io.emit('newDataHAsAccord')
  })
}
