import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Ticket from '../pages/TicketBooking.vue'
import User from '../pages/User.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/ticket', component: Ticket },
  { path: '/user', component: User }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router