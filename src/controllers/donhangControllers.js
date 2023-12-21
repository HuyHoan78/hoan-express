// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getdonhangAll = async(req, res) => {

    try {
        const donhang = await new Promise((resolve, reject) => {
            db.query('select * from donhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const donhang2 = await new Promise((resolve, reject) => {
            db.query('select * from donhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // res.render('donhang/index', {
                    //     donhang: donhang,
                    //     donhang2: results
                    // });
                    res.json(results);
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getdonhangById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM donhang WHERE Madon = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy đơn hàng ');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createdonhang = (req, res) => {
    const { Madon, MaNV, MaKH, Ngaymua } = req.body;

    db.query(
        'INSERT INTO donhang (Madon, MaNV, MaKH,Ngaymua) VALUES (?, ?, ?, ?)', [Madon, MaNV, MaKH, Ngaymua],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {

                res.redirect('/admin/donhang');

            }
        }
    );
};
exports.createdonhang1 = (req, res) => {
    res.render('donhang/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatedonhang = (req, res) => {
    const { id } = req.params;
    const { MaNV, MaKH, Ngaymua } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE donhang SET MaNV = ?, MaKH = ? , NgayMua = ? WHERE Madon = ?', [MaNV, MaKH, Ngaymua, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/donhang');
            }
        }
    );
};
exports.updatedonhang1 = async(req, res) => {

    // const updatedAt = null;

    try {
        const { id } = req.params;
        const { MaNV, MaKH, Ngaymua } = req.body;
        const donhangByID = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM donhang WHERE Madon = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const donhang2 = await new Promise((resolve, reject) => {
            db.query('select * from donhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('donhang/edit', {
                        donhangByID: donhangByID,
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
exports.deletedonhang = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM donhang WHERE Madon = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy donhang để xóa');
        } else {
            res.json({ message: 'xóa thành công' });
        }
    });
};