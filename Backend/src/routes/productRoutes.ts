import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productController.getAllProducts);

router.get("/my", requireAuth, productController.getMyProduct);

router.get("/:id", productController.getProductById);

router.post("/", requireAuth, productController.createProduct);       // POST
router.put("/:id", requireAuth, productController.updateProduct);     // PUT
router.delete("/:id", requireAuth, productController.deleteProduct);  // DELETE

export default router;