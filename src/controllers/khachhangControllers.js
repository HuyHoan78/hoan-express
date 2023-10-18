// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getkhachhangAll = (req, res) => {
    db.query('SELECT * FROM khachhang', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json({ data: results });
        }
    });
};

exports.getkhachhangById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM khachhang WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy khách hàng');
        } else {
            res.json(results[0]);
        }
    });
};

// // Thêm một loại sản phẩm mới
exports.createkhachhang = (req, res) => {
    const { TenKhachHang, DiaChi, SoDienThoai, Email } = req.body;
    const createdAt = null;
    const updatedAt = null;

    db.query(
        'INSERT INTO khachhang (TenKhachHang ,DiaChi ,SoDienThoai ,Email , created_at, updated_at) VALUES (?, ?, ?, ?, ?,?)', [TenKhachHang, DiaChi, SoDienThoai, Email, createdAt, updatedAt],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.json({ id: results.insertId, message: ' Khách hàng đã được thêm thành công' });
            }
        }
    );
};

// // Sửa thông tin một loại sản phẩm bằng ID
exports.updatekhachhang = (req, res) => {
    const { id } = req.params;
    const { TenKhachHang, DiaChi, SoDienThoai, Email } = req.body;
    const updatedAt = null;

    db.query(
        'UPDATE khachhang SET TenKhachHang = ?, DiaChi = ?, SoDienThoai = ?,Email = ? WHERE id = ?', [TenKhachHang, DiaChi, SoDienThoai, Email, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy khách hàng để cập nhật');
            } else {
                res.json({ message: 'Khách hàng đã được cập nhật thành công' });
            }
        }
    );
};

// // Xóa một loại sản phẩm bằng ID
exports.deletekhachhang = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM khachhang WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy khách hàng để xóa');
        } else {
            res.json({ message: 'Khách hàng đã được xóa thành công' });
        }
    });
};