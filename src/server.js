const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const loaiSPRoute = require('./router/loaiSPRoute');
const sanphamRoute = require('./router/sanphamRoute')
const khachhangRoute = require('./router/khachhangRoute')
const donhangRoute = require('./router/donhangRoute')

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(session({
    secret: 'your-secret-key', // Thay 'your-secret-key' bằng một chuỗi bất kỳ
    resave: false,
    saveUninitialized: true,
}));

// Sử dụng express-flash
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('kính chào quý khách');
});

app.use('/admin', loaiSPRoute, sanphamRoute, khachhangRoute, donhangRoute);

// app.use('/api');

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});