function SuccessHandler(statusCode, message, data) {
  this.success = true;
  this.statusCode = statusCode || 200;
  this.message = message;
  this.data = data || null;
}

SuccessHandler.prototype.send = function (res) {
  return res.status(this.statusCode).json({
    success: this.success,
    message: this.message,
    data: this.data,
  });
};

module.exports = SuccessHandler;
