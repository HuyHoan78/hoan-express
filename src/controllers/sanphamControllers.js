// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getsanphamAll = async(req, res) => {

    try {
        const SanPham = await new Promise((resolve, reject) => {
            db.query('select * from SanPham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const SanPham1 = await new Promise((resolve, reject) => {
            db.query('select * from SanPham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // res.render('sanpham/index', {
                    //     SanPham: SanPham,
                    //     SanPham1: results
                    // });
                    res.json(results);
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getsanphamById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM SanPham WHERE MaSP = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy sản phẩm');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createsanpham = (req, res) => {
    const { MaSP, MaNCC, MaLoai, TenSP, SoLuong, DviTinh, Gia, Anh, TrangThai } = req.body;

    db.query(
        'INSERT INTO SanPham (MaSP, MaNCC, MaLoai, TenSP,SoLuong, DviTinh, Gia, Anh, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [MaSP, MaNCC, MaLoai, TenSP, SoLuong, DviTinh, Gia, Anh, TrangThai],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/sanpham');

            }
        }
    );
};
exports.createsanpham1 = (req, res) => {
    res.render('sanpham/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatesanpham = (req, res) => {
    const { id } = req.params;
    const { MaNCC, MaLoai, TenSP, SoLuong, DviTinh, Gia, Anh, TrangThai } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE SanPham SET MaNCC = ?, MaLoai = ?, TenSP = ?,SoLuong=?, DviTinh = ?, Gia = ?, Anh =?, TrangThai =? WHERE MaSP = ?', [MaNCC, MaLoai, TenSP, SoLuong, DviTinh, Gia, Anh, TrangThai, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/sanpham');
            }
        }
    );
};
exports.updatesanpham1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { MaNCC, MaLoai, TenSP, SoLuong, DviTinh, Gia, Mota, Anh, TrangThai } = req.body;
        const SanPhamByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM SanPham WHERE MaSP = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const SanPham1 = await new Promise((resolve, reject) => {
            db.query('select * from SanPham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('sanpham/edit', {
                        SanPhamByID: SanPhamByID,
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
exports.deletesanpham = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM SanPham WHERE MaSP = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy sản phẩm để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};