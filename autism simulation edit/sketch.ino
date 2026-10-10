#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

// إعدادات مستشعر الحرارة (DS18B20)
const int oneWireBus = 4; 
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

// إعدادات مستشعر الحركة (MPU6050)
Adafruit_MPU6050 mpu;

// المنافذ التناظرية (ADC)
const int gsrPin = 34;
const int heartRatePin = 32;

void setup() {
  Serial.begin(115200);
  
  // تشغيل مستشعر الحرارة
  sensors.begin();
  
  // تشغيل الـ I2C ومستشعر MPU6050
  Wire.begin(21, 22);
  if (!mpu.begin()) {
    Serial.println("❌ Failed to find MPU6050 chip!");
  } else {
    Serial.println("✅ MPU6050 Found!");
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  }
  
  pinMode(gsrPin, INPUT);
  pinMode(heartRatePin, INPUT);
  
  Serial.println("==================================================");
  Serial.println("System Initialized! Monitoring Child Status...");
  Serial.println("==================================================");
}

void loop() {
  // 1. قراءة درجة الحرارة
  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);
  
  // 2. قراءة وتحويل نبضات القلب (محاكاة Potentiometer إلى BPM)
  int rawHeart = analogRead(heartRatePin);
  int bpm = map(rawHeart, 0, 4095, 50, 160); // تحويل المدى إلى 50 - 160 نبضة/دقيقة
  
  // 3. قراءة التوتر الجلدي GSR وتحويله لنسبة مئوية
  int rawGsr = analogRead(gsrPin);
  int stressLevel = map(rawGsr, 0, 4095, 0, 100); // نسبة مئوية للتوتر 0-100%
  
  // 4. قراءة مستشعر الحركة MPU6050
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // حساب محصلة التسارع ثلاثية الأبعاد (X, Y, Z)
  float totalAccel = sqrt(sq(a.acceleration.x) + sq(a.acceleration.y) + sq(a.acceleration.z));

  // طباعة القراءات بشكل منظم
  Serial.print("🌡️ Temp: ");
  if (temperatureC == DEVICE_DISCONNECTED_C) {
    Serial.print("DISCONNECTED");
  } else {
    Serial.print(temperatureC, 1);
    Serial.print(" °C");
  }
  
  Serial.print(" | ❤️ HR: ");
  Serial.print(bpm);
  Serial.print(" BPM");

  Serial.print(" | ⚡ Stress: ");
  Serial.print(stressLevel);
  Serial.print("%");

  Serial.print(" | 🏃 Accel: ");
  Serial.print(totalAccel, 1);
  Serial.println(" m/s²");

  // متغير لتحديد ما إذا كان هناك خطر أو انزعاج
  bool isDistress = false;

  // ---------------- فحص التنبيهات ----------------

  // 1. فحص الحرارة (حمى أو سقوط المستشعر / برودة شديدة)
  if (temperatureC == DEVICE_DISCONNECTED_C) {
    Serial.println("⚠️ [ERROR]: Temperature Sensor Disconnected!");
    isDistress = true;
  } 
  else if (temperatureC > 37.8) {
    Serial.println("⚠️ [ALERT]: High Fever Detected! (>37.8°C)");
    isDistress = true;
  } 
  else if (temperatureC < 35.0) {
    Serial.println("⚠️ [WARNING]: Sensor Detached or Low Body Temp (<35.0°C)!");
    isDistress = true;
  }

  // 2. تنبيه نبضات القلب السريعة (خوف أو بداية نوبة هلع / Meltdown)
  if (bpm > 115) {
    Serial.println("⚠️ [ALERT]: High Heart Rate! (Panic / Meltdown signs)");
    isDistress = true;
  }

  // 3. تنبيه التعرق والتوتر العصبي (GSR)
  if (stressLevel > 65) {
    Serial.println("⚠️ [ALERT]: High Stress / Anxiety Detected (GSR Elevated)");
    isDistress = true;
  }

  // 4. تنبيه الحركة العنيفة أو السقوط أو الاهتزاز الشديد
  if (totalAccel > 17.0) {
    Serial.println("⚠️ [ALERT]: Violent Movement / Tremor / Fall Detected!");
    isDistress = true;
  }

  // إذا لم يكن هناك أي إنذار، تكون الحالة طبيعية
  if (!isDistress) {
    Serial.println("🟢 Status: Normal - Child is Calm.");
  }
  
  Serial.println("--------------------------------------------------");
  delay(1000); // تحديث القراءات كل ثانية
}