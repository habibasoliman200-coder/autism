
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

// --- إعدادات شبكة الواي فاي في Wokwi ---
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// --- رابط السيرفر الخارجي ومفتاح الجهاز ---
const char* serverUrl = "https://maryam2005.pythonanywhere.com/api/device/data";
const char* deviceKey = "03263210d02263b2efef100a96151a03";

// --- إعدادات الحساسات والمنافذ ---
const int oneWireBus = 4;
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

Adafruit_MPU6050 mpu;

const int gsrPin = 34;
const int heartRatePin = 32;

void setup() {
  Serial.begin(115200);

  sensors.begin();

  Wire.begin(21, 22);
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050!");
  } else {
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  }

  pinMode(gsrPin, INPUT);
  pinMode(heartRatePin, INPUT);

  // الاتصال بالشبكة
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
  Serial.println("System Ready.");
}

void loop() {
  // 1. قراءة درجة الحرارة
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);
  if (temperatureC == DEVICE_DISCONNECTED_C) {
    temperatureC = 36.5;
  }

  // 2. قراءة نبضات القلب (50 إلى 160 BPM)
  int rawHeart = analogRead(heartRatePin);
  float bpm = map(rawHeart, 0, 4095, 50, 160);

  // 3. قراءة التوتر الجلدي (EDA)
  int rawGsr = analogRead(gsrPin);
  float gsrEda = ((float)rawGsr / 4095.0) * 2.0;

  // 4. قراءة التسارع بوحدة الجاذبية g
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  float x_g = a.acceleration.x / 9.80665;
  float y_g = a.acceleration.y / 9.80665;
  float z_g = a.acceleration.z / 9.80665;

  float totalAccel = sqrt(sq(a.acceleration.x) + sq(a.acceleration.y) + sq(a.acceleration.z));

  // تحديد الحالة
  String statusMsg = "Normal";
  if (bpm > 115 || gsrEda > 1.3 || totalAccel > 17.0) {
    statusMsg = "Alert";
  }

  Serial.printf("Temp: %.1f C | HR: %.0f BPM | GSR: %.2f | Accel: %.1f m/s2\n",
                temperatureC, bpm, gsrEda, totalAccel);

  // 5. إرسال البيانات إلى السيرفر
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure(); // قبول شهادة SSL

    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Device-Key", deviceKey);

    String jsonPayload = "{";
    jsonPayload += "\"heart_rate\":" + String(bpm, 1) + ",";
    jsonPayload += "\"temperature\":" + String(temperatureC, 1) + ",";
    jsonPayload += "\"gsr\":" + String(gsrEda, 3) + ",";
    jsonPayload += "\"x\":" + String(x_g, 3) + ",";
    jsonPayload += "\"y\":" + String(y_g, 3) + ",";
    jsonPayload += "\"z\":" + String(z_g, 3) + ",";
    jsonPayload += "\"status\":\"" + statusMsg + "\"";
    jsonPayload += "}";

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.printf("Server Response [%d]: %s\n", httpResponseCode, response.c_str());
    } else {
      Serial.printf("HTTP Error: %s\n", http.errorToString(httpResponseCode).c_str());
    }
    http.end();
  }

  delay(1500); // إرسال قراءة كل 1.5 ثانية
}