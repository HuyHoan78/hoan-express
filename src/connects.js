const mysql = require('mysql');

// Tạo kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'caulong'
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    } else {
        console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
    }
});

module.exports = db;