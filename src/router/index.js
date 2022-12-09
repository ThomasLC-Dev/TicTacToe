import { createRouter, createWebHistory } from 'vue-router'
import TicTacToe from '../views/TicTacToe';

const routes = [
  {
    path: '/tic-tac-toe',
    name: 'tic-tac-toe',
    component: TicTacToe
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
