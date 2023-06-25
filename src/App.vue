<script setup>
import { RouterView } from 'vue-router'
import iconImage from '@/assets/spain-logo.svg'
</script>

<template>
  <v-app>

    <!--  NAVIGATION  -->
    <v-toolbar color="white" style="position:static">
      <v-btn icon to="/" size="large">
        <v-img :src="iconImage" max-width="36"/>
      </v-btn>
      <v-toolbar-title>
        Spanish Words Practice
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
  }
}

</script>

<style scoped>
header {
  display: flex;
  place-items: center;
}
</style>
