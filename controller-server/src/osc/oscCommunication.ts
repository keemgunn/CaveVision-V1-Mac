import { Server, Client } from 'node-osc'
import { internalIP } from '../helpers/ipAddress.js';
import { FACE_OSC_PORT } from './faceOSC.js';

const RASPBERRY_PI_IP = '126.126.0.88';
const RASPBERRY_PI_OSC_PORT = 12800;


export function useOSCserver() {

  console.log("* Opening OSC Server ...");
  const oscServer = new Server(FACE_OSC_PORT, 'localhost');

  oscServer.on('listening', () => { 
    console.log("======== OSC SERVER RUNNING");
    console.log(`Listening On PORT : ${internalIP}:${FACE_OSC_PORT}\n`);
  })

  return oscServer;
}


export function useOSCclient() {

  console.log("* Opening OSC Client ...");
  const oscClient = new Client(RASPBERRY_PI_IP, RASPBERRY_PI_OSC_PORT);

  console.log(`======== OSC CLIENT RUNNING FOR RASPBERRY PI`);
  console.log(`Sending Message To : ${RASPBERRY_PI_IP}:${RASPBERRY_PI_OSC_PORT}\n`);

  return oscClient;
}