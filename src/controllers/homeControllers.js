// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.home = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from LoaiSP', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/index', {
                        SP: SP,
                        LoaiSP2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};