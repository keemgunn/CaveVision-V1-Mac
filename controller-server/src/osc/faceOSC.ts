import { Server } from 'node-osc';
import servoController from "../arduino/serials/servoController.js";

export const FACE_OSC_PORT = 12300;
export const FACE_OSC_WIDTH = 640;
export const FACE_OSC_HEIGHT = 480;

function handleMessagePack(address: string, messagePack: Array<string>) {
    switch (address) {

    case '/found':
      break;

    case '/pose/position':
      servoController.sendFacePosition(messagePack);
      break;

    default:
      break;
  }
}

export function useFaceOSCstreamline(oscServer: Server) {

  oscServer.on('bundle', (bundle) => {
    bundle.elements.forEach((element, i) => {
      const messagePack = element.toString().split(',');
      const address = messagePack.splice(0, 1)[0];
      handleMessagePack(address, messagePack);
    })
  })
}