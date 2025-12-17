import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify/fastify";
import { config } from "dotenv";
config()

const secret = process.env.secret

export default async (app:FastifyInstance) => {
    app.register(fastifyJwt,{secret})
}