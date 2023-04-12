import { FACE_OSC_WIDTH, FACE_OSC_HEIGHT } from "../../osc/faceOSC.js";
import serialPort from "../serialPort.js";
import { mapRange } from "../../helpers/numbers.js";


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


/**
 * Send mapped face position to Arduino
 * in a from of Array[int, int]
 * @param facePositionArray - from MessagePack
 */
function sendFacePosition(facePositionArray: Array<string>) {
  const [x, y] = mapFacePosition(facePositionArray);
  serialPort.write

  console.log(` - Mapped Face Position : [${x}, ${y}]`);

  // Send serial data to Arduino
  serialPort.write(Buffer.from([x]));
  
  
}


export default {
  sendFacePosition,
}