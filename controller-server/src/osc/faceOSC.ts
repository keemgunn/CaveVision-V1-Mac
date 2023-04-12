import { Server, Client, Message } from 'node-osc';
import { mapRange } from "../helpers/numbers.js";

export const FACE_OSC_PORT = 12300;
export const FACE_OSC_WIDTH = 640;
export const FACE_OSC_HEIGHT = 480;

const SERVO_ANGLE_START = 30;
const SERVO_ANGLE_END = 150;

// '/pose/position'
// SAMPLE : [ '323.3333', '185.3333' ]
/**
  * Maps face position to servo angles(Array[int, int])
* @param facePositionArray - from MessagePack
* @returns [x, y] - x and y position of face
*/
function mapFacePosition(facePositionArray: Array<string>) {

  const formattedArray = facePositionArray.map((value) => Number(value));

  // Notice that servo angle is reversed.
  const x = mapRange(formattedArray[0], 0, FACE_OSC_WIDTH, SERVO_ANGLE_END, SERVO_ANGLE_START);

  // If I wanna use both x and y
  // const y = mapRange(formattedArray[1], 0, FACE_OSC_WIDTH, 0, 0);

  // return [ Math.round(x), Math.round(y) ];
  return [Math.round(x), 0];
}

function handleMessagePack(address: string, messagePack: Array<string>, oscClient: Client) {
  switch (address) {

    case '/found':
      break;

    case '/pose/position':
      const [x, y] = mapFacePosition(messagePack);
      oscClient.send(new Message('/face/position', x));
      console.log(` - SENT OSC MESSAGE to '/face/position' : ${x}`);
    break;

    default:
      break;
  }
}

export function useFaceOSCstreamline(oscServer: Server, oscClient: Client) {

  oscServer.on('bundle', (bundle) => {
    bundle.elements.forEach((element, i) => {
      const messagePack = element.toString().split(',');
      const address = messagePack.splice(0, 1)[0];
      handleMessagePack(address, messagePack, oscClient);
    })
  })
}