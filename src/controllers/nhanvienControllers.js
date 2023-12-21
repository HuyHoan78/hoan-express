// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getnhanvienAll = async(req, res) => {

    try {
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const nhanvien2 = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhanvien/index', {
                        nhanvien: nhanvien,
                        nhanvien2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getnhanvienById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nhanvien WHERE MaNV = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy nhân viên');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createnhanvien = (req, res) => {
    const { MaNV, TenNV, GioitinhNV, NgaySinhNV, SdtNV, QueQuan, Noicutru, EmailNV } = req.body;

    db.query(
        'INSERT INTO nhanvien (MaNV, TenNV, GioitinhNV, NgaySinhNV,SdtNV, QueQuan, Noicutru, EmailNV) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [MaNV, TenNV, GioitinhNV, NgaySinhNV, SdtNV, QueQuan, Noicutru, EmailNV],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/nhanvien');

            }
        }
    );
};
exports.createnhanvien1 = (req, res) => {
    res.render('nhanvien/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatenhanvien = (req, res) => {
    const { id } = req.params;
    const { TenNV, GioitinhNV, NgaySinhNV, SdtNV, QueQuan, Noicutru, EmailNV } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE nhanvien SET TenNV = ?, GioiTinhNV = ?, NgaySinhNV = ?, SdtNV = ?, QueQuan = ?, Noicutru = ?, EmailNV = ?  WHERE MaNV = ?', [TenNV, GioitinhNV, NgaySinhNV, SdtNV, QueQuan, Noicutru, EmailNV],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy nhanvien để cập nhật');
            } else {
                res.redirect('/admin/nhanvien');
            }
        }
    );
};
exports.updatenhanvien1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { TenNV, GioitinhNV, NgaySinhNV, SdtNV, QueQuan, Noicutru, EmailNV } = req.body;
        const nhanvienByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM nhanvien WHERE MaNV = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const nhanvien2 = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhanvien/edit', {
                        nhanvienByID: nhanvienByID,
                        // LoaiSP2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

// Xóa một loại sản phẩm bằng ID
exports.deletenhanvien = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM nhanvien WHERE MaNV = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy nhanvien để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};