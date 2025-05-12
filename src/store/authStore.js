import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { signin, signup, checkauth, signout } from "../api/authAPI";

export const useAuthStore = create(
    persist(
        devtools((set) => ({
            user: null,
            isLoading: false,
            error: null,

            signin: async (username, password) => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = await signin(username, password);
                    console.log("signin data", data);
                    set({ user: data, isLoading: false, error: null });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Signin failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            signup: async (username, link, password) => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = await signup(username, link, password);
                    set({ user: data, isLoading: false, error: null });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Signup failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await signout();
                } catch (error) {
                    console.error("Logout error:", error);
                }
                set({ user: null, error: null });
                localStorage.removeItem("auth-storage");
                document.cookie =
                    "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            },

            checkAuth: async () => {
                try {
                    const response = await checkauth();
                    console.log("checkAuth response", response);
                    if (response) {
                        set({ user: response, error: null });
                    } else {
                        set({ user: null, error: null });
                    }
                } catch {
                    set({ user: null });
                }
            },

            isAuthenticated: () => !!useAuthStore.getState().user,

            isAdminOrModerator: () => {
                const user = useAuthStore.getState().user;
                return (
                    user && (user.role === "admin" || user.role === "moderator")
                );
            },
        }))
    ),
    {
        name: "auth-storage",
        getStorage: () => localStorage,
    }
);
