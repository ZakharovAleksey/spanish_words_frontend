import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        access: '',
        refresh: ''
    }),
    getters: {
        // Some getters here - used for filtered methods
    },
    actions : {
        initializeStorage(){
            const access = localStorage.getItem('access')
            if (!access) {
                this.access = ''
            } else {
                this.access = access
            }

            const refresh = localStorage.getItem('refresh')
            if (!refresh) {
                this.refresh = ''
            } else {
                this.refresh = refresh
            }
        },
        setAccessToken(access) {
            this.access = access
        },
        getAccessToken() {
            return this.access
        },
        setRefreshToken(refresh) {
            this.refresh = refresh
        },
        getRefreshToken() {
            return this.refresh
        }
    }
})