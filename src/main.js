import { createApp } from 'vue'
import App from './App.vue'


import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

import VueRouter from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { useFincaStore } from '@/stores/finca'

const pinia = createPinia()
var idFincaGlobal = '1' 
 

const app = createApp(App); 
app.use(pinia);
app.use(PiniaVuePlugin);


const fincaStore = useFincaStore();

import router from "./router";
app.use(router);

app.config.globalProperties.$myGlobalVariable = idFincaGlobal 


app.mount("#app"); 
app.provide('myGlobalVariable', app.config.globalProperties.$myGlobalVariable) 
 


