// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getLoaiSPAll = async(req, res) => {

    try {
        const LoaiSP = await new Promise((resolve, reject) => {
            db.query('select * from loaisp', (err, results) => {
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
                    res.render('loaisp/index', {
                        LoaiSP: LoaiSP,
                        LoaiSP2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getLoaispById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM loaisp WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createLoaisp = (req, res) => {
    const { TenLoai, TrangThai } = req.body;
    const createdAt = null;
    const updatedAt = null;

    db.query(
        'INSERT INTO loaisp (TenLoai, TrangThai, created_at, updated_at) VALUES (?, ?, ?, ?)', [TenLoai, TrangThai, createdAt, updatedAt],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/loaisp');

            }
        }
    );
};
exports.createLoaisp1 = (req, res) => {
    res.render('loaisp/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updateLoaisp = (req, res) => {
    const { id } = req.params;
    const { TenLoai, TrangThai } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE loaisp SET TenLoai = ?, TrangThai = ? WHERE id = ?', [TenLoai, TrangThai, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/loaisp');
            }
        }
    );
};
exports.updateLoaisp1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { TenLoai, TrangThai } = req.body;
        const LoaiSPByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM loaisp WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from LoaiSP', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('loaisp/edit', {
                        LoaiSPByID: LoaiSPByID,
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
exports.deleteLoaisp = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM loaisp WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};