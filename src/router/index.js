import { createRouter, createWebHistory } from 'vue-router'
import TicTacToe from '../views/TicTacToe';
import Gobblet from "../views/Gobblet";

const routes = [
  {
    path: '/tic-tac-toe',
    name: 'tic-tac-toe',
    component: TicTacToe
  },
  {
    path: '/gobblet',
    name: 'gobblet',
    component: Gobblet
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
