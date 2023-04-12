import { Server } from 'node-osc'
import { internalIP } from '../helpers/ipAddress.js';
import { FACE_OSC_PORT } from './faceOSC.js';


export function useOSCserver() {

  console.log("* Opening OSC Server ...");
  const oscServer = new Server(FACE_OSC_PORT, 'localhost');

  oscServer.on('listening', () => { 
    console.log("======== OSC SERVER RUNNING");
    console.log(`Listening On PORT : ${internalIP}:${FACE_OSC_PORT}\n`);
  })

  // oscServer.on('message', (msg) => {
  //   console.log(`Message: ${msg}`);
  //   const [address, ...args] = msg;
  // })

  return oscServer;
}