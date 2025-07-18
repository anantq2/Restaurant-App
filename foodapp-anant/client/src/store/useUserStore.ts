import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, persist } from "zustand/middleware";
import axios, { isAxiosError } from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

// const API_END_POINT = `${ "http://localhost:3000"
// }/api/v1/menu`;
const API_END_POINT = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: Partial<User>) => Promise<void>;
};

export const useUserStore = createWithEqualityFn<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (input) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/signup`, input);
          if (res.data.success) {
            toast.success(res.data.message);
            set({
              user: res.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
          } else {
            toast.error("An unexpected error occurred during signup.");
          }
        } finally {
          set({ loading: false });
        }
      },

      login: async (input) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/login`, input);
          if (res.data.success) {
            toast.success(res.data.message);
            set({
              user: res.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
          } else {
            toast.error("An unexpected error occurred during login.");
          }
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (verificationCode) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode });
          if (res.data.success) {
            toast.success(res.data.message);
            set({
              user: res.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Email verification failed.");
          } else {
            toast.error("An unexpected error occurred during verification.");
          }
        } finally {
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        try {
          const res = await axios.get(`${API_END_POINT}/check-auth`, {
            withCredentials: true,
          });

          if (res.data.success) {
            set({
              user: res.data.user,
              isAuthenticated: true,
            });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch {
          set({ user: null, isAuthenticated: false });
        } finally {
          console.log("✅ Finished checkAuth: Setting isCheckingAuth = false");
          set({ isCheckingAuth: false, loading: false });
          console.log("🧠 Zustand state after auth check:", useUserStore.getState());
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/logout`);
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Logout failed.");
          } else {
            toast.error("An unexpected error occurred during logout.");
          }
        } finally {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      forgotPassword: async (email) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/forgot-password`, { email });
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Request failed. Please try again.");
          } else {
            toast.error("An unexpected error occurred.");
          }
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Password reset failed.");
          } else {
            toast.error("An unexpected error occurred.");
          }
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input) => {
        set({ loading: true });
        try {
          const res = await axios.put(`${API_END_POINT}/profile/update`, input);
          if (res.data.success) {
            toast.success(res.data.message);
            set({ user: res.data.user });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Profile update failed.");
          } else {
            toast.error("An unexpected error occurred.");
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
       name: "user-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      // Only persist small & necessary parts
      user: state.user
        ? {
            fullname: state.user.fullname,
            email: state.user.email,
            admin: state.user.admin,
            isVerified: state.user.isVerified,
          }
        : null,
      isAuthenticated: state.isAuthenticated,
    }),
  }
))
