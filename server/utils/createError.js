// Dynamic Error Codes
export const createError = (status, message) => {
  err.status = status;
  err.message = message;
  return err;
};
