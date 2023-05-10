import { Router } from "express";
import {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
} from "../controller/postController";
const router = Router();
import { upload } from "../utils/multer";
import { authMiddleware } from "../middleware/authMiddleware";

router.post("/",authMiddleware,upload.single("image"), createPost);
router.get("/", getAllPost);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

export default router;
