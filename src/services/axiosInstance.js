import axios from 'axios';

// إنشاء مثيل Axios مخصص
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // استبدل هذا بـ URL الخاص بـ API
  timeout: 10000, // تحديد مهلة الطلب (بالمللي ثانية)
});

// إعداد توكن المصادقة (إذا كنت تستخدمه)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // جلب التوكن من التخزين المحلي
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
