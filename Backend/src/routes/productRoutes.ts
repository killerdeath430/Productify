import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productController.getAllProducts);

router.get("/my",requireAuth ,productController.getMyProduct);

router.get("/:id",productController.getProductById)

router.get("/",requireAuth,productController.createProduct)
router.get("/:id",requireAuth,productController.updateProduct)
router.get("/:id",requireAuth,productController.deleteProduct)


export default router;