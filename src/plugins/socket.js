import { io } from 'socket.io-client'
import Vue from 'vue'

const wss = 'wss://jwpjxcdple.execute-api.ap-southeast-1.amazonaws.com/dev'

// const socket = io(wss)
// socket.on('connect', () => {
//   console.log(socket)
//   const engine = socket.io.engine
//   console.log(engine.transport.name)
// })

const socket = new WebSocket(wss)

socket.onopen = () => {
  console.log('Connected wss successfully.')
}

socket.onclose = ({ wasClean, code, reason }) => {
    console.log(`onclose:   ${JSON.stringify({ wasClean, code, reason })}`)
}

Vue.prototype.$wss = socket

export default socket
