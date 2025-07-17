import axios, { isAxiosError } from "axios";
axios.defaults.withCredentials = true;
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";
import { MenuItem } from "@/types/restaurantType"; // Assuming MenuItem type is defined here

const API_END_POINT = "http://localhost:3000/api/v1/menu";


// Define the state structure for clarity
type MenuState = {
    loading: boolean;
    // It's better to type the menu object, assuming you have a MenuItem type
    menu: MenuItem | null;
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
}

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,

    createMenu: async (formData: FormData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                const newMenu = response.data.menu;
                set({ menu: newMenu });
                // IMPORTANT: Only update the other store on success
                useRestaurantStore.getState().addMenuToRestaurant(newMenu);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to create menu item.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    editMenu: async (menuId: string, formData: FormData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                const updatedMenu = response.data.menu;
                set({ menu: updatedMenu });
                // IMPORTANT: Only update the other store on success
                useRestaurantStore.getState().updateMenuToRestaurant(updatedMenu);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update menu item.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },
}), {
    name: "menu-store", // Using a more specific name
    storage: createJSONStorage(() => localStorage)
}));
