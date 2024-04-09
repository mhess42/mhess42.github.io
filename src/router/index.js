import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimelineView from '../views/TimelineView.vue'

const routes = [
  // home view is the interactive timeline
  // current landing view
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: TimelineView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
