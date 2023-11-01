<template>
  <v-container align="center" justify="center">
    <v-card width="400" variant="flat">
      <template v-slot:title>
        <p class="text-center text-h3 pb-2">Sign in</p>
      </template>

      <v-form validate-on="submit lazy" @submit.prevent="submit" :model-value="isValid">
        <v-card-text>
          <v-text-field
              prepend-inner-icon="mdi-account"
              label="Username"
              v-model="user"
              variant="outlined"
              class="mb-4"
              :hide-details="true"
          />
          <v-text-field
              prepend-inner-icon="mdi-form-textbox-password"
              label="Password"
              v-model="password"
              type="password"
              variant="outlined"
              class="mb-4"
              :hide-details="true"
          />
          <router-link to="/login" class="text-center text-subtitle-1">
            Forgot your password?
          </router-link>

        </v-card-text>

        <v-card-actions class="align-center justify-center">

          <v-btn
              :loading="loading"
              text="submit"
              rounded="lg"
              size="large"
              class="text-uppercase"
              type="submit"
              color="success"
              variant="elevated"
              :disabled="!is_submit_button_active"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import {useUserStore} from '@/stores/UserStore'
import axios from "axios";
import {kBaseUrl} from '@/js/constants'
import {useToast} from "vue-toastification";

export default {
  setup() {
    const store = useUserStore()

    return {store}
  },
  data() {
    return {
      user: '',
      password: '',
      // Passwords-related variables
      loading: false,
      isValid: null
    }
  },
  computed: {
    is_submit_button_active() {
      return this.user !== '' && this.password !== ''
    }
  },
  methods: {
    showErrorToast(error) {
      console.log('incorrect credentials', error)
      useToast().error('Incorrect credentials')
    },
    async submit() {
      await this.checkCredentials();
    },
    async checkCredentials() {
      // Clear the storage before setting up a new tokens
      localStorage.clear()
      this.loading = true
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
            // Update authorization header
            axios.defaults.headers.common['Authorization'] = ''
            this.isValid = false

            this.showErrorToast(error)
          })
          .finally(() => (this.loading = false))
    }
  },
}
</script>

<style scoped>
:deep .v-btn {
  min-width: 256px;
}

.no-hover:hover {
  background-color: transparent !important; /* Make the background transparent on hover */
  color: inherit !important; /* Use the inherit color on hover */
  text-decoration: none !important; /* Remove text decoration on hover, if any */
  /* Add any other custom styles to achieve the desired appearance on hover */
}
</style>