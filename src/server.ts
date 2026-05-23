
import app from "./app"
import config from "./middleware/config";
import { initDB } from "./dataBase"
const port = 5000
const main = () => {
    initDB();
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
    })
}
main();