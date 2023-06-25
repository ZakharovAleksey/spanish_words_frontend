<script setup>
</script>

<template>
  <v-row no-gutters justify="center" align="center">

    <!--  MAIN SCREEN LOGO  -->
    <v-col align="center" sm="12" md="4" lg="3">
      <img src="@/assets/logo.svg" width="256" height="256"/>
    </v-col>

    <v-col sm="12" md="4" lg="4">
      <v-row justify="center">
        <h1 class="text-center mb-12">On this site you can repeat spanish words</h1>
      </v-row>

      <v-row align="center" justify="center">
        <v-btn
            rounded="lg"
            size="large"
            class="text-uppercase"
            :to="pathToGo()"
        >start the practice</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'

export default {
  setup() {
    const store = useUserStore()
    return { store }
  },
  methods: {
    pathToGo(){
      const store = useUserStore()
      return store.getRefreshToken() !== null ? '/practice' : '/login'
    }
  }
}
</script>

<style scoped>
:deep .v-btn {
  min-width: 256px;
}
</style>