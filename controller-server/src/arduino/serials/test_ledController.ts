import { SerialPort } from "serialport";

const state = {
  red_light: {
    light: 0,
  }
}

export function test_on(serialPort: SerialPort) {
  // serialPort.write("1\n");
  serialPort.write(Buffer.from([1]));
  state.red_light.light = 1;
  console.log(" - Red Light : ON");
}

export function test_off(serialPort: SerialPort) {
  // serialPort.write("0\n");
  serialPort.write(Buffer.from([0]));
  state.red_light.light = 0;
  console.log(" - Red Light : OFF");
}

export function test_switch(serialPort: SerialPort) {
  if (state.red_light.light)
    test_off(serialPort);
  else
    test_on(serialPort);
}

export function test_drive(serialPort: SerialPort) {
  const DELAY = 200;
  test_switch(serialPort);

  setTimeout(() => {
    test_drive(serialPort);
  }, DELAY);
}  


