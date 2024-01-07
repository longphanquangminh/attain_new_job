export const responseData = (
  statusCode: number,
  message: string,
  content: any,
) => {
  return {
    statusCode,
    message,
    content,
    date: new Date(),
  };
};
