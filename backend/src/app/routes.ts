import { FastifyInstance } from "fastify/fastify";
import pongRoutes from "./pong/routes";

export default async (fastify: FastifyInstance) => {
    fastify.register(pongRoutes, {prefix:"/ping"})
}