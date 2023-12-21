// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getkhachhangAll = async(req, res) => {

    try {
        const khachhang = await new Promise((resolve, reject) => {
            db.query('select * from khachhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const khachhang2 = await new Promise((resolve, reject) => {
            db.query('select * from khachhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('khachhang/index', {
                        khachhang: khachhang,
                        khachhang2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getkhachhangById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM khachhang WHERE MaKH = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy khachhang');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createkhachhang = (req, res) => {
    const { MaKH, TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH } = req.body;

    db.query(
        'INSERT INTO khachhang (MaKH, TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH) VALUES (?, ?, ?, ?, ?, ?, ?)', [MaKH, TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/khachhang');

            }
        }
    );
};
exports.createkhachhang1 = (req, res) => {
    res.render('khachhang/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatekhachhang = (req, res) => {
    const { id } = req.params;
    const { TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE khachhang SET TenKH = ?, GioiTinhKH = ?, NgaySinhKH = ?, SdtKH = ?, DiaChiKH = ?, EmailKH = ? WHERE MaKH = ?', [TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy khách hàng để cập nhật');
            } else {
                res.redirect('/admin/khachhang');
            }
        }
    );
};
exports.updatekhachhang1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH } = req.body;
        const khachhangByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM khachhang WHERE MaKH = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const khachhang2 = await new Promise((resolve, reject) => {
            db.query('select * from khachhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('const { TenKH, GioiTinhKH, NgaySinhKH, SdtKH, DiaChiKH, EmailKH } = req.body;/edit', {
                        khachhangByID: khachhangByID,
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
exports.deletekhachhang = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM khachhang WHERE MaKH = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy khách hàng để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};