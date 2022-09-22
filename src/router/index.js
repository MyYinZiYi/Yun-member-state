import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import("../layout/Layout.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
