<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <User></User>
  </template>
    
    <script>
  import  User from "@/components/User.vue"; 
  
  import { ref, onMounted } from "vue";
  
  export default {
    name: "UserPComponent",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      User
    }, 
    //setup() { 
    //   const testFields = ref([
    //     "id",
    //     "name", 
    //     "parque",
    //     "activos",
    //     "incidencias", 
    //     "fecha",
    //   ]);
      
    //   const testFieldsR = ref([
    //     "Id",
    //     "Nombre", 
    //     "Parque",
    //     "Activos",
    //     "Incidencias", 
    //     "Fecha",
    //   ]); 
  
    //   let listModal = ref([
    //     {name :"Nombre", type: "text", realName: "name"}, 
    //     {name :"Parque", type: "text", realName: "parque"},
    //     {name :"Activos", type: "number", realName: "activos"},
    //     {name :"Incidencias", type: "number", realName: "incidencias"}, 
    //     {name :"Fecha", type: "date", realName: "fecha"},
    //    ]);
  
    //    return {
    //     listModal,
    //     testFields,
    //     testFieldsR
    //   };
    //},
  };
  </script>
   