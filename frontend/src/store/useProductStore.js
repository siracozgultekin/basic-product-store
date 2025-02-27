import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: "",
    image: "",
    price: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429) set({ error: "Too many requests" });
      else set({ error: "An error occurred" });
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      set({ products: get().products.filter((product) => product.id !== id) });
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error while deleting product:", error);
      toast.error("An error occurred while deleting the product");
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (product) => {
    set({ loading: true });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        product
      );
      set({ products: [...get().products, response.data.data] });
      toast.success("Product added successfully");
    } catch (error) {
      console.log("Error while adding product:", error);
      toast.error("An error occurred while adding the product");
    } finally {
      set({ loading: false });
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true });

    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      console.log("response:", response);
      set({
        currentProduct: response.data.data,
        error: null,
        formData: response.data.data,
      });
    } catch (error) {
      console.log("Error while fetching product:", error);
      toast.error("An error occurred while fetching the product");
      set({
        error: "An error occurred while fetching the product",
        currentProduct: null,
      });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });

    try {
      const { formData } = get();
      const response = await axios.put(
        `http://localhost:3000/api/products/${id}`,
        formData
      );
      set({
        currentProduct: response.data.data,
      });
      toast.success("Product updated successfully");
    } catch (error) {
      console.log("Error while updating product:", error);
      toast.error("An error occurred while updating the product");
    } finally {
      set({ loading: false });
    }
  },
}));
