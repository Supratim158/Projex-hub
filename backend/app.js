const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user.routes');
const FormRouter = require('./routes/form.routes');

const app = express();
app.use(cors());
app.use(body_parser.json());

// ✅ Serve uploaded static files correctly
app.use('/uploads/projectImages', express.static(path.join(__dirname, 'public/uploads/projectImages')));
app.use('/uploads/memberImages', express.static(path.join(__dirname, 'public/uploads/memberImages')));
app.use('/uploads/videos', express.static(path.join(__dirname, 'public/uploads/videos')));
app.use('/uploads/pdfs', express.static(path.join(__dirname, 'public/uploads/pdfs')));
app.use('/uploads/ppts', express.static(path.join(__dirname, 'public/uploads/ppts')));

app.use('/', userRouter);
app.use('/', FormRouter);

module.exports = app;
