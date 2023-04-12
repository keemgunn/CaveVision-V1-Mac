#include <Arduino.h>

const int RED_LIGHT_PIN = 4;
const int GREEN_LIGHT_PIN = 8;
const int GREEN_LIGHT_INTERVAL = 1000;
unsigned long prevGreenlightDelay = 0; // instead of using delay()

void setup()
{
  pinMode(RED_LIGHT_PIN, OUTPUT);
  pinMode(GREEN_LIGHT_PIN, OUTPUT);

  Serial.begin(115200);
}


void serialEvent() {
  // String receivedString = Serial.readStringUntil('\n');
  // receivedString.trim();

  // if (receivedString == "1")
  //   digitalWrite(RED_LIGHT_PIN, HIGH);
  // else
  //   digitalWrite(RED_LIGHT_PIN, LOW);
  //

  byte recievedByte = Serial.read();
  if (recievedByte == 1)
    digitalWrite(RED_LIGHT_PIN, HIGH);
  else
    digitalWrite(RED_LIGHT_PIN, LOW);
}


void loop() {
  
  // Green Light
  unsigned long currentMillis = millis();
  if (currentMillis - prevGreenlightDelay >= GREEN_LIGHT_INTERVAL) {
    prevGreenlightDelay = currentMillis;

    // Toggle the green LED state
    digitalWrite(8, !digitalRead(GREEN_LIGHT_PIN));
  }

  if(Serial.available() > 0) {
    serialEvent();
  }
}
