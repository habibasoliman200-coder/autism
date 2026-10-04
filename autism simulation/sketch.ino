#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* serverName = "http://192.168.1.8:5000/api/data";

const int oneWireBus = 4; 
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

Adafruit_MPU6050 mpu;

const int gsrPin = 34;
const int heartRatePin = 32;

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");

  sensors.begin();
  
  Wire.begin(21, 22);
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip!");
  } else {
    Serial.println("MPU6050 Found!");
  }
  
  pinMode(gsrPin, INPUT);
  pinMode(heartRatePin, INPUT);
  
  Serial.println("System Initialized Successfully! Monitoring Child Status...");
}

void sendDataToServer(float temp, int gsr, int hr, String statusStr) {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String httpRequestData = "{\"temperature\":" + String(temp) + 
                             ",\"gsr\":" + String(gsr) + 
                             ",\"heart_rate\":" + String(hr) + 
                             ",\"status\":\"" + statusStr + "\"}";

    int httpResponseCode = http.POST(httpRequestData);
    http.end();
  }
}

void loop() {
  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);
  
  int gsrValue = analogRead(gsrPin);
  int heartRateValue = analogRead(heartRatePin);
  
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  Serial.print("Temp: ");
  Serial.print(temperatureC);
  Serial.print(" °C  |  ");
  
  Serial.print("GSR: ");
  Serial.print(gsrValue);
  Serial.print("  |  ");

  Serial.print("Heart Rate: ");
  Serial.print(heartRateValue);
  Serial.print("  |  ");

  Serial.print("Accel X: ");
  Serial.print(a.acceleration.x);
  Serial.print(" Y: ");
  Serial.println(a.acceleration.y);
  
  bool isDistress = false;
  String currentStatus = "Normal - Child is Calm.";

  if (temperatureC > 37.5) {
    Serial.println("ALERT: High Temperature Detected! (Possible Fever)");
    isDistress = true;
    currentStatus = "High Temperature Detected (Possible Fever)";
  }

  if (gsrValue > 2500) {
    Serial.println("ALERT: High Stress / Anxiety Detected (GSR High)");
    isDistress = true;
    currentStatus = "High Stress / Anxiety Detected (GSR High)";
  }

  if (heartRateValue > 3000) {
    Serial.println("ALERT: High Heart Rate Detected! (Anxiety/Panic)");
    isDistress = true;
    currentStatus = "High Heart Rate Detected (Anxiety/Panic)";
  }

  if (abs(a.acceleration.x) > 15.0 || abs(a.acceleration.y) > 15.0) {
    Serial.println("ALERT: Sudden Violent Movement / Fall Detected!");
    isDistress = true;
    currentStatus = "Sudden Violent Movement / Fall Detected";
  }

  if (!isDistress) {
    Serial.println("Status: Normal - Child is Calm.");
  }
  
  sendDataToServer(temperatureC, gsrValue, heartRateValue, currentStatus);

  Serial.println("---------------------------------------------------");
  delay(1500);
}