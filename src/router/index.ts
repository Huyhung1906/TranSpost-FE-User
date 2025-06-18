import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Ticket from '../pages/TicketBooking.vue'
import User from '../pages/User.vue'
import Payment from '../pages/Payment.vue'
import Schedule from '@/pages/Schedule.vue'
import TicketLookup from '@/pages/TicketLookup.vue'
import News from '@/pages/News.vue'
import Invoices from '@/pages/Invoices.vue'
import Contact from '@/pages/Contact.vue'
import PaymentSuccess from '@/pages/PaymentSuccess.vue'
import PaymentFail from '@/pages/PaymentFail.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/ticket', component: Ticket },
  { path: '/user', component: User },
  { path: '/payment', name: 'PaymentPage',component: Payment },
   { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/ticket-lookup', name: 'TicketLookup', component: TicketLookup },
  { path: '/news', name: 'News', component: News },
  { path: '/invoice', name: 'Invoices', component: Invoices },
  { path: '/contact', name: 'Contact', component: Contact },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
  },
  {
    path: '/payment/fail',
    name: 'PaymentFail',
    component: PaymentFail,
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router