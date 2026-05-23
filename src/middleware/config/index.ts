import dotenv from "dotenv"
import path from "path"


dotenv.config({
    path: path.join(process.cwd(), "./src/.env")
})
const config = {
    connection_String: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
    secret: process.env.SECRET
}

export default config;