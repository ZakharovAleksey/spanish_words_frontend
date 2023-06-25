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
import axios from "axios";

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
      await this.checkCredentials();
    },
    async checkCredentials(){
      console.log('user:', this.user, 'pwd', this.password)
      axios
          .post('/api/v1/jwt/create/', {
            username: this.user,
            password: this.password
          })
          .then(response => {
            const store = useUserStore()

            const access_token = response.data.access
            store.setAccessToken(access_token)

            const refresh_token = response.data.refresh
            store.setRefreshToken(refresh_token)

            this.isValid = true
            this.$router.push('/practice')
          })
          .catch(error => {
            console.log(error)
            this.isValid = false
          })
          .finally(() => (this.loading = false))
    }
  }
}
</script>

<style scoped>
:deep .v-btn {
  min-width: 256px;
}
</style>