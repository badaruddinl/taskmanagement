import  { FastifyInstance } from "fastify/fastify";
import pongHandler from "../handlers/pong.handler";

export default async function pongRoutes(fastify:FastifyInstance) {
    fastify.route({
        method:"GET",
        url:"/",
        handler: pongHandler
    })
}