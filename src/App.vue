<script setup>
import { RouterView } from 'vue-router'
import iconImage from '@/assets/logo.svg'
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
      <v-container class="fill-height" fluid>
        <RouterView />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
</script>

<style scoped>
header {
  display: flex;
  place-items: center;
}
</style>
