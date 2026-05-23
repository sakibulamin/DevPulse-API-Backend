import { Router, type Request, type Response } from "express";
import { userController } from "./user.conntroller";
import auth from "../../middleware/auth";
import { User_Roles } from "../../middleware/types";


const router = Router();

router.post("/", auth(User_Roles.maintainer), userController.createUser);


router.get("/", auth(User_Roles.maintainer), userController.allUser);

router.get("/:id", auth(User_Roles.maintainer), userController.SingleUser);


router.put("/:id", auth(User_Roles.maintainer), userController.updateUser);


router.delete("/:id", auth(User_Roles.maintainer), userController.deletedUser);

export default router;