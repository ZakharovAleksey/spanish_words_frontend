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
                type="submit"
                variant="elevated"
            />
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
import { kBaseUrl } from '@/js/constants'

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
      isValid: null
    }
  },
  methods: {
    async submit() {
      await this.checkCredentials();
    },
    async checkCredentials(){
      // Clear the storage before setting up a new tokens
      localStorage.clear()
      axios
          .post(`${kBaseUrl}/api/v1/jwt/create/`, {
            username: this.user,
            password: this.password
          })
          .then(response => {
            const store = useUserStore()

            const access = response.data.access
            store.setAccessToken(access)
            localStorage.setItem('access', access)

            const refresh = response.data.refresh
            store.setRefreshToken(refresh)
            localStorage.setItem('refresh', refresh)

            // Update authorization header
            axios.defaults.headers.common['Authorization'] = 'JWT ' + access

            this.isValid = true
            this.$router.push('/practice')
          })
          .catch(error => {
            console.log('incorrect credentials', error)

            // Update authorization header
            axios.defaults.headers.common['Authorization'] = ''
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