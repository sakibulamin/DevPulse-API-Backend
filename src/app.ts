import express, { type Application, type Request, type Response } from "express";
import router from "./modules/user/user.router";
import { authRoutes } from "./auth/auth.router";
import { issueRoutes } from "./modules/issue/issue.route";





const app: Application = express()


app.use(express.json());


app.use("/api/users", router)
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);



app.get('/', (req: Request, res: Response) => {
    res.send('Please signup!')
})


export default app;