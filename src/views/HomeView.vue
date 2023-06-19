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
        <v-dialog v-model="dialog" width="auto">

          <template v-slot:activator="{ props }">
            <v-btn rounded="lg" size="large" class="text-uppercase mb-2" v-bind="props">login</v-btn>
          </template>

          <!--   LOGIN DIALOG WINDOW     -->
          <v-card title="Login to the Spanish Words Practice">
              <v-sheet>
                <v-form validate-on="submit lazy" @submit.prevent="submit" :model-value="isValid">

                  <v-card-text>
                    <v-text-field label="User name" v-model="user"/>
                    <v-text-field label="Password" v-model="password" type="password"/>
                    <v-alert
                        v-show="isValid !== null"
                        :border-color="alertColor[index]"
                        :text="alertText[index]"
                        border="start"
                        class="text-subtitle-1"/>
                  </v-card-text>

                  <v-card-actions>
                    <v-row cols="12">
                      <v-col sm="6" justify="center" align="center">
                        <v-btn block rounded="lg" size="large" class="text-uppercase" :loading="loading" type="submit" text="submit"/>
                      </v-col>
                      <v-col sm="6" justify="center" align="center">
                        <v-btn block rounded="lg" size="large" class="text-uppercase" @click="closeDialog" text="close"/>
                      </v-col>
                    </v-row>
                  </v-card-actions>

                </v-form>
              </v-sheet>
          </v-card>

        </v-dialog>
      </v-row>

      <v-row align="center" justify="center">
        <v-btn
            :disabled="!store.isUserLoggenIn"
            rounded="lg"
            size="large"
            class="text-uppercase"
            to="/practice"
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
  data () {
    return {
      dialog: false,
      // Input user data
      user: '',
      password: '',
      // Passwords-related variables
      loading: false,
      isValid: null,
      // Alert support data
      alertColor: ['success', 'error'],
      alertText: [
        'Login is successful. Please, close the window to start the practice.',
        'Incorrect user name or password. Please, try again.'
      ],
      index: null,
      isReadyToStart: false
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      this.isValid = await this.checkCredentials();
      this.loading = false;

      if (this.isValid) {
        const store = useUserStore()
        store.logInUser()
      }

      this.index = this.isValid ? 0 : 1;
    },
    async checkCredentials(){
      // TODO: implement correct API
      const user = import.meta.env.VITE_USER
      const pwd = import.meta.env.VITE_PWD

      return this.user === user && this.password === pwd;
    },
    closeDialog() {
      this.user = '';
      this.password = '';
      this.isValid = null;
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
:deep .v-btn {
  min-width: 256px;
}
</style>