import { createApp } from 'vue'
import App from './App.vue'


import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

import VueRouter from 'vue-router'
import router from "./router";

var idFincaGlobal = '1'

///token github
//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

// createApp(App).mount('#app')

const app = createApp(App);
app.use(router);
app.mount("#app");

app.config.globalProperties.$myGlobalVariable = idFincaGlobal

//new
//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

//al llamarla es 
//this.$myGlobalVariable = "testt";
 


