import { create } from 'zustand';
import axios from 'axios';
import { type Product } from '../types/Product';
import { apiRoutes } from '../route/apiroute';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getFilteredProducts: (filters: Record<string, any>) => Promise<void>;
}

export const productStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiRoutes.base}${apiRoutes.getProducts}`);
      const currentProducts = get().products;

      // Compare old and new data
      const isDifferent = JSON.stringify(currentProducts) !== JSON.stringify(res.data);
      if (isDifferent) {
        set({ products: res.data });
      }
      set({ loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      set({ loading: false, error: message });
    }
  },

  getFilteredProducts: async (filters: Record<string, any>) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${apiRoutes.base}${apiRoutes.filterProducts}`, {
        params: filters,
      });
      const currentProducts = get().products;

      const isDifferent = JSON.stringify(currentProducts) !== JSON.stringify(res.data);
      if (isDifferent) {
        set({ products: res.data });
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },
}));
