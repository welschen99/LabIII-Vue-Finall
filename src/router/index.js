import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Coins from '../views/Coins.vue'
import Movimientos from '../views/Movimientos.vue'
import newMovimiento from '../views/newMovimiento.vue'
import editMovimiento from '../views/editMovimiento.vue'
import Resumen from '../views/Resumen.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  
  },
  {
    path: '/coins',
    name: 'Coins',
    component:Coins
  },
  {
    path: '/movimientos',
    name: 'Movimientos',
    component:Movimientos
  },
  {
    path: '/:accion/:id',
    props:true,
    name: 'newMovimiento',
    component:newMovimiento
  }
  ,
  {
    path: '/:id',
    props:true,
    name: 'editMovimiento',
    component:editMovimiento
  }
  ,
  {
    path: '/resumen',
    name: 'resumen',
    component: Resumen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
