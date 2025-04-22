import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { signin, signup } from "../api/authAPI";

const getLocalStorageItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error parsing ${key}:`, error);
        return null;
    }
};

export const useAuthStore = create(
    devtools((set, get) => ({
        token: getLocalStorageItem("token"),
        user: getLocalStorageItem("user"),
        isLoading: false,
        error: null,

        signin: async (username, password) => {
            set({ isLoading: true, error: null });
            try {
                const { data } = await signin(username, password);

                const userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    roles: data.roles,
                    link: data.link,
                };

                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(userData));
                console.log(data);

                set({
                    token: data.accessToken,
                    user: userData,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                set({
                    error: error.response?.data?.message || "Signin failed",
                    isLoading: false,
                });
                throw error;
            }
        },

        signup: async (username, email, password, link) => {
            set({ isLoading: true, error: null });
            try {
                const { data } = await signup(username, email, password, link);

                localStorage.setItem("token", data.accessToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        roles: data.roles,
                        link: data.link,
                    })
                );

                set({
                    token: data.accessToken,
                    user: data.user,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                set({
                    error: error.response?.data?.message || "Signup failed",
                    isLoading: false,
                });
                throw error;
            }
        },

        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            set({ token: null, user: null });
        },

        isAuthenticated: () => {
            return !!get().user || !!get().token;
        },
    }))
);
