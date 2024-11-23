// apiResponse.js

class ApiResponse {
  success(res, message = "Success", data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      status: true,
      message: message,
      data: data,
    });
  }

  error(res, message = "Error", data = {}, statusCode = 500) {
    return res.status(statusCode).json({
      status: false,
      message: message,
      data: data,
    });
  }

  validationError(
    res,
    message = "Validation Error",
    errors = [],
    statusCode = 400
  ) {
    return res.status(statusCode).json({
      status: false,
      message: message,
      errors: errors,
    });
  }

  unauthorized(res, message = "Unauthorized", statusCode = 401) {
    return res.status(statusCode).json({
      status: false,
      message: message,
    });
  }

  notFound(res, message = "Not Found", statusCode = 404) {
    return res.status(statusCode).json({
      status: false,
      message: message,
    });
  }
}

exports = ApiResponse;
