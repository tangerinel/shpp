import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "";
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.3l83cw6.mongodb.net/?retryWrites=true&w=majority`;

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: PORT,
  },
};
