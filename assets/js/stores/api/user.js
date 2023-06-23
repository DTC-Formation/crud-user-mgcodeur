import { defineStore } from "pinia";
import { _app } from "@/config/app";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: {}
    }),

    actions: {
        async fetchUsers() {
            const response = await fetch(`${_app.apiBaseUrl}/users`);
            this.users = await response.json();
        },

        async storeUser(payload) {
            const response = await fetch(`${_app.apiBaseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            return response.json();
        },

        async showUser(payload) {
            const response = await fetch(`${_app.apiBaseUrl}/users/${payload.id}`);
            this.user = await response.json();
            return this.user;
        },

        async updateUser(payload) {
            const response = await fetch(`${_app.apiBaseUrl}/users/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            return response.json();
        },

        async deleteUser(payload) {
            const response = await fetch(`${_app.apiBaseUrl}/users/${payload.id}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    }
});
