const errorHandler = async (err, req, res, next) => {
  const message = err?.message || "Something Went Wrong";
  const status = err?.status || err?.code || err?.statusCode || 500;
  res.status(status).json({ message });
};

export default errorHandler;
