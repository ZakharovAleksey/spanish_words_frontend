import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/UserStore'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PracticeView.vue')
    }
  ]
})

// https://jasonwatmore.com/post/2022/06/07/vue-3-redirect-to-login-page-if-unauthenticated
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login']
  if (!publicPages.includes(to.path)) {
    const store = useUserStore()

    if (!store.isUserLoggedIn()) {
      return '/login';
    }
  }
})

export default router
