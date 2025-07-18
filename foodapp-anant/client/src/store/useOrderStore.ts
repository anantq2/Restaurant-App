import { CheckoutSessionRequest, OrderState, Orders } from "@/types/orderType";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT: string = `${
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
}/api/v1/order`;

axios.defaults.withCredentials = true;

// It's a good practice to define the full state type, including actions
interface FullOrderState extends OrderState {
    createCheckoutSession: (checkoutSession: CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;
}

export const useOrderStore = create<FullOrderState>()(persist((set) => ({
    loading: false,
    orders: [],

    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
        set({ loading: true });
        try {
            const response = await axios.post(
                `${API_END_POINT}/checkout/create-checkout-session`,
                checkoutSession
            );
            // Redirect to Stripe checkout page
            window.location.href = response.data.url;
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Checkout failed. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            // This might not be reached if redirection is successful, but it's good practice
            set({ loading: false });
        }
    },

    getOrderDetails: async () => {
        set({ loading: true });
        try {
            const response = await axios.get<{ success: boolean; orders: Orders[] }>(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ orders: response.data.orders });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Could not fetch your orders.");
            } else {
                toast.error("An unexpected error occurred while fetching orders.");
            }
        } finally {
            set({ loading: false });
        }
    }
}), {
    name: 'order-store', // Changed name to be more specific
    storage: createJSONStorage(() => localStorage)
}));
