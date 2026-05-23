import { Router } from "express";
import auth from "../../middleware/auth";

import { User_Roles } from "../../middleware/types";
import { issueController } from "./issue.controller";

const router = Router();

router.post("/", auth(User_Roles.contributor, User_Roles.maintainer), issueController.createIssue);

router.get("/", auth(User_Roles.contributor, User_Roles.maintainer), issueController.getAllIssues);

router.get("/:id", auth(User_Roles.maintainer), issueController.getSingleIssue);

router.patch("/:id", auth(User_Roles.maintainer), issueController.updateIssue);

router.delete("/:id", auth(User_Roles.maintainer), issueController.deleteIssue);

export const issueRoutes = router;