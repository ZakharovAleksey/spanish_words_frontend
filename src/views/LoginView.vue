<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card width="400" variant="outlined">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
        </template>

        <template v-slot:title class="text-md-center">
          User login
        </template>
        <v-sheet>
          <v-form validate-on="submit lazy" @submit.prevent="submit" :model-value="isValid">
            <v-card-text>
              <v-text-field
                  label="Username"
                  v-model="user"
                  variant="outlined"
                  class="ma-2"/>
              <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  variant="outlined"
                  class="ma-2"/>
              <v-alert
                  v-show="isValid === false"
                  border-color="red"
                  text="Incorrect username or password"
                  border="start"
                  class="text-subtitle-1"
              />
          </v-card-text>

          <v-card-actions class="align-center justify-center">
            <v-btn
                :loading="loading"
                text="submit"
                rounded="lg"
                size="large"
                class="text-uppercase"
                type="submit"/>
          </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'

export default {
  setup() {
    const store = useUserStore()

    return { store }
  },
  data () {
    return {
      user: '',
      password: '',
      // Passwords-related variables
      loading: false,
      isValid: null,
    }
  },
  methods: {
    async submit() {
      const store = useUserStore()

      console.log(store.isUserLoggedIn())

      // No need to do anything in case we already logged in
      if (store.isUserLoggedIn())
        return

      this.loading = true;
      this.isValid = await this.checkCredentials();
      this.loading = false;

      if (this.isValid) {
        store.logInUser()
        this.$router.push('/practice')
      }
    },
    async checkCredentials(){
      // TODO: implement correct API
      const user = import.meta.env.VITE_USER
      const pwd = import.meta.env.VITE_PWD

      return this.user === user && this.password === pwd;
    }
  }
}
</script>

<style scoped>
:deep .v-btn {
  min-width: 256px;
}
</style>