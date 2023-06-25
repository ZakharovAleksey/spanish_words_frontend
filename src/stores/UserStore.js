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
        setAccessToken(token) {
            console.log('acc')
            localStorage.setItem('access', token)
        },
        getAccessToken() {
            return localStorage.getItem('access')
        },
        setRefreshToken(token) {
            console.log('refresh')
            localStorage.setItem('refresh', token)
        },
        getRefreshToken() {
            return localStorage.getItem('refresh')
        }
    }
})