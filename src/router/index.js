import { createRouter, createWebHistory } from 'vue-router'
import TicTacToe from '../views/TicTacToe';
import Gobblet from "../views/Gobblet";
import Rules from "../views/Rules";

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
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules
  },
  {
    path: "/",
    redirect: "/gobblet"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
