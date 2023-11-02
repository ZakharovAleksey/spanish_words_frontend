<script setup>
import { RouterView } from 'vue-router'
import iconImage from '@/assets/translation.png'
</script>

<template>
  <v-app>

    <!--  NAVIGATION  -->
    <v-toolbar color="white" style="position:static">
      <v-btn icon to="/" size="large">
        <v-img :src="iconImage" max-width="36"/>
      </v-btn>
      <v-toolbar-title>
        <p class="text-h5">Catch Up Español</p>
      </v-toolbar-title>
    </v-toolbar>

    <!--  MAIN CONTENT  -->
    <v-main>
      <v-container class="fill-height" :fluid="true">
        <RouterView />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/UserStore.js'
import { kBaseUrl, kRefreshTokenTime } from '@/js/constants'

import axios from "axios";

export default {
  beforeCreate() {
    const store = useUserStore()
    store.initializeStorage()

    // Add the access token for each request to server
    const access = store.getAccessToken()
    if(access) {
      axios.defaults.headers.common['Authorization'] = 'JWT ' + access
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  mounted(){
    // Periodically update the access token
    setInterval(() => {
      this.refreshAccess()
    }, kRefreshTokenTime)
  },
  methods: {
    refreshAccess(){
      const store = useUserStore()
      const refresh = store.getRefreshToken()

      axios
          .post(`${kBaseUrl}/api/v1/jwt/refresh/`, {
            refresh: refresh
          })
          .then((response) => {
            const access = response.data.access

            store.setAccessToken(access)
            localStorage.setItem('access', access)
          }).catch((error) => {
            console.log('could not refresh token', error)
          })
    }
  }
}

</script>

<style scoped>
header {
  display: flex;
  place-items: center;
}
</style>
