import type {  Request,  Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express"; 
import { db } from "../db";


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProduct();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getProductById = async (req : Request,res:Response)=> {
  try{
    const { id }=req.params;
    const product =await db.queries.
  }
  catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
}

