import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/UserStore'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/PracticeView.vue')
    }
  ]
})

// https://jasonwatmore.com/post/2022/06/07/vue-3-redirect-to-login-page-if-unauthenticated
router.beforeEach(async (to) => {
  // Redirect to the '/login' page in case user is not logged in or access token is expired
  const publicPages = ['/', '/login']

  if (!publicPages.includes(to.path)) {
    const store = useUserStore()

    const access = store.getAccessToken()
    const refresh = store.getRefreshToken()

    // There is no information in local storage about these variables
    if (!access && !refresh) {
      return '/login'
    }

    axios
        .post('/api/v1/jwt/verify/', {
          token: access
        })
        .catch(() => {
          localStorage.clear()

          // In case user access token is no longer valid - redirect to the '/login' page
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        })
  }
})

export default router
