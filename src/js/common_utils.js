import { useUserStore } from "@/stores/UserStore";
import axios from "axios";

export async function isUserLoggedIn() {
    const store = useUserStore()

    const access = store.getAccessToken()
    const refresh = store.getRefreshToken()

    // There is no information in local storage about these variables
    if (access == null && refresh == null) {
        console.log('No token data')
        return false
    }

    axios
        .post('/api/v1/jwt/verify/', {
          token: store.getRefreshToken()
        })
        .then((response) => {
            console.log('Token valid', response)
            return true
        })
        .catch(error => {
            console.log('Token invalid', error)
            return false
          // this.$router.push('/login')
        })
}