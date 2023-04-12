import { SerialPort } from "serialport";
import { SerialPortOpenOptions, ReadlineParser } from "serialport";
import configs from "../configs/configs.js";

const serialportOptions: SerialPortOpenOptions<any> = {
  path: configs.arduinoConnection.SERIAL_PORT_PATH,
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
}

/**
  IMPORTANT:
  Note that when the serial port is opened, the Arduino tries to reset the sketch.
  So the server has to wait for the Arduino to be ready before sending data.
  */
console.log('* Opening serial port...');
const serialPortInstance = new SerialPort(serialportOptions, (error) => {
  if (error) {
    console.error("Error opening serial port:", error.message);
  } else {
    console.log("=== SERIAL PORT OPENED");
  }
});

serialPortInstance.pipe(new ReadlineParser({
  delimiter: '\r\n',
}));

export default serialPortInstance;