import Interceptor from "@/utils/responseInterceptor.util";
import { FastifyReply, FastifyRequest } from "fastify/fastify";
import { StatusCodes } from "http-status-codes";

export default async function pongHandler(request:FastifyRequest, reply:FastifyReply){
    return Interceptor(reply, StatusCodes.OK,true,  request.id,"pong",)
}