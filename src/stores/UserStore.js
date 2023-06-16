import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        isUserLoggenIn: false
    }),
    getters: {
        // Some getters here - used for filtered methods
    },
    actions : {
        logInUser() {
            this.isUserLoggenIn = true
        }
    }
})