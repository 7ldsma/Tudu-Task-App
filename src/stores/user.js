// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
    state() {
        return {
            user: null,
        };
    },

    actions: {
        async fetchUser() {
            const user = await supabase.auth.user();
            this.user = user;
        },
        async signUp(email, password) {
            const response = await supabase.auth.signUp({
                email: 'ejemplo@email.com',
                password: 'ejemplo-password',
            });
            const data = response.data
            const error = response.error;

            if (error) {
                throw error;
            }
            if (data.user) {
                this.user = data.user;
            }

        },
        persist: {
            enabled: true,
            strategies: [{
                key: "user",
                storage: localStorage,
            }, ],
        },
    },
});