#include <Arduino.h>
#include <Servo.h>
Servo servo;

const int SERVO_PIN = 8;

void setup()
{
  servo.attach(SERVO_PIN);
  Serial.begin(115200);

  servo.write(0);
  delay(1000);
  servo.write(180);
  delay(1000);
  servo.write(90);
}

void serialEvent()
{
  int recievedByte = Serial.read();
  servo.write(recievedByte);
}

void loop()
{

  if (Serial.available() == 1)
  {
    int recievedByte = Serial.read();
    servo.write(recievedByte);
  }
}
