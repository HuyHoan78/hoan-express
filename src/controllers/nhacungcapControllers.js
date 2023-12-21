// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getnhacungcapAll = async(req, res) => {

    try {
        const nhacungcap = await new Promise((resolve, reject) => {
            db.query('select * from nhacungcap', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const nhacungcap2 = await new Promise((resolve, reject) => {
            db.query('select * from nhacungcap', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhacungcap/index', {
                        nhacungcap: nhacungcap,
                        nhacungcap2: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getnhacungcapById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nhacungcap WHERE MaNCC = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy nha cung cap');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createnhacungcap = (req, res) => {
    const { MaNCC, TenNCC, SdtNCC, DiaChiNCC, EmailNCC } = req.body;

    db.query(
        'INSERT INTO nhacungcap (MaNCC,TenNCC, SdtNCC, DiaChiNCC, EmailNCC) VALUES (?, ?, ?, ?, ?)', [MaNCC, TenNCC, SdtNCC, DiaChiNCC, EmailNCC],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/nhacungcap');

            }
        }
    );
};
exports.createnhacungcap1 = (req, res) => {
    res.render('nhacungcap/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatenhacungcap = (req, res) => {
    const { id } = req.params;
    const { TenNCC, SdtNCC, DiaChiNCC, EmailNCC } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE nhacungcap SET TenNCC = ?, SdtNCC = ?, DiaChiNCC = ?, EmailNCC = ? WHERE MaNCC = ?', [TenNCC, SdtNCC, DiaChiNCC, EmailNCC, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy nhacungcap để cập nhật');
            } else {
                res.redirect('/admin/nhacungcap');
            }
        }
    );
};
exports.updatenhacungcap1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { TenNCC, SdtNCC, DiaChiNCC, EmailNCC } = req.body;
        const nhacungcapByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM nhacungcap WHERE MaNCC = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const nhacungcap2 = await new Promise((resolve, reject) => {
            db.query('select * from nhacungcap', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhacungcap/edit', {
                        nhacungcapByID: nhacungcapByID,
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
exports.deletenhacungcap = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM nhacungcap WHERE MaNCC = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy nhà cung cấp để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};