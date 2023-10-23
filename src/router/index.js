import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/UserStore'
import axios from 'axios'
import { kBaseUrl } from '@/js/constants'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:catchAll(.*)',
      name: 'pageNotFound',
      component: () => import('../views/PageNotFound.vue')
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
    },
    // TODO: test, remove when everything is done\
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/LessonRunner.vue')
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
        .post(`${kBaseUrl}/api/v1/jwt/verify/`, {
          token: access
        })
        .catch(() => {
          localStorage.clear()

          // In case user access token is no longer valid - redirect to the '/login' page
          router.push('/login')
        })
  }
})

export default router
