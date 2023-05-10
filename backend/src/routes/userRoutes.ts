import { Router } from "express";
import { createUser, getAllUsers, loginUser,addUserRole, removeUserRole, getUserById } from "../controller/userController";
const router = Router();

router.post('/', createUser)
router.get('/', getAllUsers)
router.post("/login", loginUser)
router.get("/:id", getUserById)
router.put("/add_user_role/:userID", addUserRole)
router.put("/remove_user_role/:userID", removeUserRole)

export default router;