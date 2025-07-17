import { Orders } from "@/types/orderType";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios, { isAxiosError } from "axios"; // 👈 Import isAxiosError
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;


export const useRestaurantStore = create<RestaurantState>()(persist((set, get) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrder: [],

    createRestaurant: async (formData: FormData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ restaurant: response.data.restaurant }); // Also update state on creation
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to create restaurant.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    getRestaurant: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ restaurant: response.data.restaurant });
            }
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                set({ restaurant: null }); // Handle case where user has no restaurant yet
            } else {
                toast.error("Could not fetch restaurant details.");
            }
        } finally {
            set({ loading: false });
        }
    },

    updateRestaurant: async (formData: FormData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${API_END_POINT}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ restaurant: response.data.restaurant }); // Update state with new details
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update restaurant.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: string[]) => {
        set({ loading: true });
        try {
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            if (selectedCuisines.length > 0) {
                params.set("selectedCuisines", selectedCuisines.join(","));
            }
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                set({ searchedRestaurant: response.data });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Search failed.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    addMenuToRestaurant: (menu: MenuItem) => {
        set((state) => ({
            restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
        }));
    },

    updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu: MenuItem) => // 👈 Added MenuItem type
                    menu._id === updatedMenu._id ? updatedMenu : menu
                );
                return {
                    restaurant: { ...state.restaurant, menus: updatedMenuList }
                };
            }
            return state;
        });
    },

    setAppliedFilter: (value: string) => {
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied
                ? state.appliedFilter.filter((item) => item !== value)
                : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter };
        });
    },

    resetAppliedFilter: () => {
        set({ appliedFilter: [] });
    },

    getSingleRestaurant: async (restaurantId: string) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
            if (response.data.success) {
                set({ singleRestaurant: response.data.restaurant });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Could not find restaurant.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    getRestaurantOrders: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_END_POINT}/order`);
            if (response.data.success) {
                set({ restaurantOrder: response.data.orders });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Could not fetch orders.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            set({ loading: false });
        }
    },

    updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
            const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, { status });
            if (response.data.success) {
                const updatedOrder = get().restaurantOrder.map((order: Orders) =>
                    order._id === orderId ? response.data.updatedOrder : order // 👈 Use the full returned object
                );
                set({ restaurantOrder: updatedOrder });
                toast.success(response.data.message);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update order status.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }

}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}));