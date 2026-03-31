import type {  Request,  Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express"; 


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProduct();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    if (!product) {
      res.status(404).json({ error: "product not found" });
      return;
    }
    res.status(200).json(product); // add this line
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getMyProduct = async (req:Request<{userId:string}>,res:Response)=>{
  try{
    const {userId}=getAuth(req);//this is actually bcoz user id should be protected
    if (!userId){
      res.status(401).json({error:"Unauthorized"})
      return
    }
    const product = await queries.getProductsByUserId(userId)
    res.status(200).json()
  }catch(error){
    console.log("error getting the product",error);
    res.status(500).json({error:"failed to get the prodcut"})
  }
};

export const createProduct = async (req:Request,res:Response)=>{
  try{
    const {userId}=getAuth(req);
    if (!userId){
      res.status(401).json({error:"Unauthorized"});
      return

    }
    const {title,description,imageUrl} = req.body;
    if (!imageUrl||!description||!title){
      res.status(400).json({error:"Missing information "})
      return
    }
    const createProduct = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    })
    res.status(201).json(createProduct);

  }
  catch(error){
    console.log("Error creating product",error);
    res.status(500).json({error:"Failed to create Produc"})
  }
}

export const updateProduct = async (req:Request<{id:string}>,res:Response)=>{
    try{
    const {userId}=getAuth(req);
    if (!userId){
      res.status(401).json({error:"Unauthorized"});
      return

    }
    const {id}=req.params;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const {title,description,imageUrl} = req.body;
    if (!imageUrl||!description||!title){
      res.status(400).json({error:"Missing information "})
      return
    }
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct){
      res.status(404).json({error :"prodcut not found"})
      return
    }
    if (existingProduct.userId!=userId){
      res.status(403).json({error:"You can only cahne your own product"})
      return
    }
    const updateProduct = await queries.updateProduct({
      title,
      description,
      imageUrl,
    },id);
  return res.status(200).json(updateProduct);
  }
  catch(error){
    console.log("Error creating product",error);
    res.status(500).json({error:"Failed to update Product"})
  }
}

export const deleteProduct = async (req:Request<{id:string}>, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only delete your own products" });
      return;
    }

    await queries.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};


