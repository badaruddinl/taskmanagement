import { FastifyReply } from "fastify";

interface Response {
  success: boolean;
  message: string | object;
  data?: any | undefined;
  errors?: any | undefined;
}

function Interceptor(
  reply: FastifyReply,
  statusCode: number,
  success: boolean,
  message: string | object,
  data?: any,
  errors?: any
) {
  const response: Response = {
    success,
    message,
    data: data || null,
    errors: errors || null,
  };

  const responseSend = { ...response };

  if(!response?.errors){
    delete responseSend.errors
  }

  return reply.code(statusCode).send(responseSend);
}

export default Interceptor;