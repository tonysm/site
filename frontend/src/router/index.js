import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sobre from '../views/Sobre.vue'
import SouCandidato from '../views/SouCandidato.vue'
import UpdateCandidato from "@/views/UpdateCandidato";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre
  },
  {
    path: '/sou-candidato',
    name: 'SouCandidato',
    component: SouCandidato
  },
  {
    path: '/atualizar-candidato',
    name: 'EditCandidato',
    component: UpdateCandidato,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
