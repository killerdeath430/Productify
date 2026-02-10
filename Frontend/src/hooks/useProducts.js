import { Query, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../lib/api";
import ProductPage from "../pages/ProductPage";


export const useProducts = ()=>{
  const result = useQuery({
    queryKey:["products"],
    queryFn:getAllProducts
  })

  return result;
}

export const useCreateproduct = ()=>{
  return useMutation({mutationFn:createProduct});

}

