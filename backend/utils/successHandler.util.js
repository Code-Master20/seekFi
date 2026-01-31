function SuccessHandler(statusCode, successMessage, data) {
  this.success = true;
  this.statusCode = statusCode || 200;
  this.successMessage = successMessage;
  this.data = data || null; //intentionally defined data is empty that's why null
}

SuccessHandler.prototype.send = function (res) {
  return res.status(this.statusCode).json({
    success: this.success,
    message: this.successMessage,
    data: this.data,
  });
};

module.exports = SuccessHandler;
