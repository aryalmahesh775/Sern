import { Router } from "express";
const router = Router();

import {
  createRole,
  getAllRole,
  deleteRole,
} from "../controller/roleController";

router.post("/", createRole);
router.get("/", getAllRole);
router.delete("/:id", deleteRole);

export default router;
