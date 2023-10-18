// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getdonhangAll = (req, res) => {
    db.query('SELECT * FROM donhang', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json({ data: results });
        }
    });
};

exports.getdonhangById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM donhang WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy đơn hàng');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createdonhang = (req, res) => {
    const { MaKhachHang, NgayDat, TrangThaiDonHang, TongTien } = req.body;
    const createdAt = null;
    const updatedAt = null;

    db.query(
        'INSERT INTO donhang ( MaKhachHang ,NgayDat ,TrangThaiDonHang ,TongTien, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [MaKhachHang, NgayDat, TrangThaiDonHang, TongTien, createdAt, updatedAt],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.json({ id: results.insertId, message: 'đơn hàng đã được thêm thành công' });
            }
        }
    );
};

// // Sửa thông tin một loại sản phẩm bằng ID
exports.updatedonhang = (req, res) => {
    const { id } = req.params;
    const { MaKhachHang, NgayDat, TrangThaiDonHang, TongTien } = req.body;
    const updatedAt = null;

    db.query(
        'UPDATE donhang SET MaKhachHang = ?, NgayDat = ?, TrangThaiDonHang = ?,TongTien = ? WHERE id = ?', [MaKhachHang, NgayDat, TrangThaiDonHang, TongTien, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy đơn hàng để cập nhật');
            } else {
                res.json({ message: 'Đơn hàng đã được cập nhật thành công' });
            }
        }
    );
};

// // Xóa một loại sản phẩm bằng ID
exports.deletedonhang = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM donhang WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy đơn hàng để xóa');
        } else {
            res.json({ message: 'Đơn hàng đã được xóa thành công' });
        }
    });
};