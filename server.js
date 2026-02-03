const axios = require('axios');

// معلومات البوت
const BOT_TOKEN = '8575662863:AAFvaDlDKRNX9c6kSB6iHST30TIZf1nqzMo';
const CHAT_ID = '5155984592';

async function sendTelegramMessage(message) {
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log('✅ تم إرسال رسالة');
    } catch (error) {
        console.log('❌ خطأ:', error.message);
    }
}

// بداية التشغيل
console.log('🚀 بدأ خادم المراقبة 24/7');
sendTelegramMessage('🎯 خادم المراقبة يعمل الآن 24/7\n✅ سأرسل إشعارات التداول تلقائياً');

// إبقاء الخادم نشطاً
const KEEP_ALIVE_URL = 'https://golden-backend-24-7.onrender.com';
setInterval(async () => {
    try {
        await axios.get(KEEP_ALIVE_URL);
        console.log('💓 الخادم نشط:', new Date().toLocaleTimeString('ar-SA'));
    } catch (error) {
        console.log('⚠️ خطأ:', error.message);
    }
}, 240000); // كل 4 دقائق

// تقرير كل ساعة
setInterval(() => {
    const time = new Date().toLocaleTimeString('ar-SA');
    console.log(`🕒 تقرير: ${time} - النظام يعمل`);
    sendTelegramMessage(`🕒 تقرير نشاط: ${time}\n✅ الخادم يعمل بشكل طبيعي`);
}, 3600000); // كل ساعة

console.log('✅ جاهز للمراقبة المستمرة...');
