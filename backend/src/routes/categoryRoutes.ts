import { Router } from "express";
import { getAllCategory, createCategory, deleteCategory } from "../controller/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router()

router.post("/", createCategory)
router.get("/",authMiddleware, getAllCategory)
router.get("/", deleteCategory)

export default router;