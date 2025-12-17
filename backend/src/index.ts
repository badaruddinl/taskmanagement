import { config } from "dotenv";
import { init, run } from "./app";

config();

(async () => {
  try {
    const server = await init();
    
    process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

    await run(server);
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();