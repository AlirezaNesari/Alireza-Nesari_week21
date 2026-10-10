export function getErrorMessage(error, fallbackMessage) {
  return error.response?.data?.message || fallbackMessage;
}