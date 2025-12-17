import  { FastifyInstance } from "fastify/fastify";

import routeHandler from "@/utils/routeHandler.util";
import pongHandler from "../pong/handlers/pong.handler";

export default async function userRoutes(fastify:FastifyInstance) {
    fastify.route(routeHandler({
        method:"GET",
        url:"/",
        // schema
        handler: pongHandler
    }))
}