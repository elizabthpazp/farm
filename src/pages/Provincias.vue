<template>
    <Table name="provincia" shortName="provincia" :testFields="testFields" :testFieldsR="testFieldsR" :listModal="listModal"></Table>
  </template>
    
    <script>
  import  Table from "@/components/Table.vue"; 
  
  import { ref, onMounted } from "vue";
  
  export default {
    name: "ProvinciasComponent",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Table
    }, 
    setup() { 
      const testFields = ref([
        "id",
        "name",  
      ]);
      
      const testFieldsR = ref([
        "Id",
        "Nombre",  
      ]); 
  
      let listModal = ref([
        {name :"Nombre", type: "text", realName: "name"},  
       ]);
  
       return {
        listModal,
        testFields,
        testFieldsR
      };
    },
  };
  </script>
   