#include <Arduino.h>
#include <Servo.h>

Servo servo;

const int SERVO_PIN = 8;
const int SERVO_INTERVAL = 800;
unsigned long prevDelay = 0; // instead of using delay()

int degree = 0;
int direction = 1;

void checkDirection() {
  if (degree >= 180)
  {
    direction = -1;
  }
  else if (degree <= 0)
  {
    direction = 1;
  }
}

void rotateAbout(int amount) {
  checkDirection();
  degree += amount * direction;
  servo.write(degree);
}

void setup()
{
  servo.attach(SERVO_PIN);
  Serial.begin(115200);

  servo.write(0);
}


void serialEvent() {
  byte recievedByte = Serial.read();
  if (recievedByte == 1)
    rotateAbout(30);
}


void loop() {
  // unsigned long currentMillis = millis();
  // if (currentMillis - prevDelay >= SERVO_INTERVAL)
  // {
  //   prevDelay = currentMillis;
  //   rotateAbout(30);
  // }

  if(Serial.available() > 0) {
    serialEvent();
  }
}
