const createError = require('http-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
let app = express();
var cors = require('cors');
let path = require('path');

const port = process.env.PORT || '5000';
app.set('port', port);

const productsRouter = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});
app.use(cors());
app.use(fileUpload());

app.use('/api/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

