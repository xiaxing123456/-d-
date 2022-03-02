import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListView from '../views/ListView.vue'
import Search from '../views/Search.vue'
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/listview',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
