
import { createRouter, createWebHistory } from "vue-router"; 
import Cultivos from './pages/Cultivos.vue'
import Animales from './pages/Animales.vue'
import Equipos from './pages/Equipos.vue'
import ModalAdd from './components/ModalAdd.vue'
import User from './pages/UserP.vue'
import Provincias from './pages/Provincias.vue'
import Altas from './pages/Altas.vue'
import Bajas from './pages/Bajas.vue'
import Datos from './pages/Datos.vue'
import Resultados from './pages/Resultados.vue'
import Hechos from './pages/Hechos.vue' 

const routes = [ 
  {
    path: "/animales",
    name: "Animales",
    component: Animales
  },
  {
    path: "/cultivos",
    name: "Cultivos",
    component: Cultivos
  }, 
  {
    path: "/equipos",
    name: "Equipos",
    component: Equipos
  }, 
  {
    path: "/users",
    name: "User",
    component: User
  },
  {
    path: "/equipos",
    name: "Equipos",
    component: Equipos
  },   
  {
    path: "/results",
    name: "Resultados",
    component: Resultados
  }, 
  {
    path: "/data",
    name: "Datos",
    component: Datos
  }, 
  {
    path: "/bajas",
    name: "Bajas",
    component: Bajas
  }, 
  {
    path: "/altas",
    name: "Altas",
    component: Altas
  }, 
  {
    path: "/provincias",
    name: "Provincias",
    component: Provincias
  }, 
  {
    path: "/hechos",
    name: "Hechos",
    component: Hechos
  }, 
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;