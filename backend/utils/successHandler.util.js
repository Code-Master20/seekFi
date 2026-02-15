function SuccessHandler(statusCode, message, data) {
  this.statusCode = statusCode || 200;
  this.success = true;
  this.message = message;
  this.data = data || null;
}

SuccessHandler.prototype.send = function (res) {
  return res.status(this.statusCode).json({
    status: this.statusCode,
    success: this.success,
    message: this.message,
    data: this.data,
  });
};

module.exports = SuccessHandler;
