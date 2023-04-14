
import { createRouter, createWebHistory } from "vue-router"; 
import Cultivos from './pages/Cultivos.vue'
import Animales from './pages/Animales.vue' 
import User from './pages/UserP.vue' 
import Total from './pages/Total.vue' 
import { useFincaStore } from '@/stores/finca' 

const routes = [ 
  {
    path: "/animales",
    name: "Animales",
    component: Animales,
    meta: {
      reload: false,
    }, 
  },
  {
    path: "/cultivos",
    name: "Cultivos",
    component: Cultivos,
    meta: {
      reload: false,
    }, 
  },  
  {
    path: "/users",
    name: "User",
    component: User,
    meta: {
      reload: false,
    }, 
  },
    {
      path: "/total",
      name: "Total",
      component: Total,
      meta: {
        reload: false,
      },  
  },    
 
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const fincaStore = useFincaStore(); 
// });

router.beforeEach((to) => {
  const fincaStore = useFincaStore(); 
  to.meta.fincaStore = fincaStore.finca;
  to.meta.reload= false; 
})

export default router;