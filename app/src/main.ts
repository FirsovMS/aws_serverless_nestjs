import { bootstrap } from "./app";

async function start() {
  const app = await bootstrap();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
