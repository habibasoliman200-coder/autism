from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # السماح لأي واجهة (ويب أو موبايل) بالاتصال بالسيرفر

# إعداد قاعدة البيانات المحلية SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///autism_health.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# تصميم جدول البيانات في قاعدة البيانات (لتخزين قراءات الحساسات)
class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    heart_rate = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    gsr = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "heart_rate": self.heart_rate,
            "temperature": self.temperature,
            "gsr": self.gsr,
            "timestamp": self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }

# إنشاء قاعدة البيانات والجدول تلقائياً عند تشغيل السيرفر لأول مرة
with app.app_context():
    db.create_all()

# 1. نقطة استقبال البيانات (تستقبل من الـ ESP32 وتخزنها في قاعدة البيانات)
@app.route('/api/data', methods=['POST'])
def receive_data():
    try:
        content = request.json
        if not content:
            return jsonify({"status": "error", "message": "No JSON data received"}), 400

        # استخراج قراءات الحساسات القادمة من ESP32
        hr = content.get('heart_rate', 0.0)
        temp = content.get('temperature', 0.0)
        gsr = content.get('gsr', 0.0)

        print(f"Received -> HR: {hr}, Temp: {temp}, GSR: {gsr}")

        # حفظ البيانات في قاعدة البيانات
        new_record = SensorData(heart_rate=hr, temperature=temp, gsr=gsr)
        db.session.add(new_record)
        db.session.commit()

        return jsonify({"status": "success", "message": "Data saved successfully"}), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 2. نقطة إرسال البيانات للواجهات (تخدم الويب أو الموبايل وتعيد آخر القراءات)
@app.route('/api/data', methods=['GET'])
def get_data():
    # جلب آخر 20 قراءة مسجلة لكي تعرضها الواجهة (تاريخياً ولحظياً)
    records = SensorData.query.order_by(SensorData.id.desc()).limit(20).all()
    data_list = [record.to_dict() for record in records]
    return jsonify(data_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)