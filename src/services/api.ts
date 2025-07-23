import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Thay bằng URL thật

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để tự động gắn phone và role vào headers
api.interceptors.request.use((config) => {
    const phone = localStorage.getItem('phone');
    const role = localStorage.getItem('role');
    console.log(`Using phone: ${phone}, role: ${role} in request headers`);

    if (phone) config.headers['phone'] = phone;
    if (role) config.headers['role'] = role;
    return config;
}, (error) => Promise.reject(error));

// Hàm GET
export const get = (url: string, headers = {}) =>
    api.get(url, { headers });

// Hàm POST
export const post = (url: string, data: any, headers = {}) =>
    api.post(url, data, { headers });

// Hàm PUT
export const put = (url: string, data: any, headers = {}) =>
    api.put(url, data, { headers });

// Hàm DELETE
export const del = (url: string, headers = {}) =>
    api.delete(url, { headers });

// Lấy danh sách sinh viên cho instructor
export const getInstructorStudents = () => get('/instructor/students');