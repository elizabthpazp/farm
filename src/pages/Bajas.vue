<template>
    <Table name="bajas" shortName="bajas" :testFields="testFields" :testFieldsR="testFieldsR" :listModal="listModal"></Table>
  </template>
    
    <script>
  import  Table from "@/components/Table.vue"; 
  
  import { ref, onMounted } from "vue";
  
  export default {
    name: "BajasComponent",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Table
    }, 
    setup() { 
      const testFields = ref([
        "id", 
      ]);
      
      const testFieldsR = ref([
        "Id", 
      ]); 
  
      let listModal = ref([
       // {name :"Nombre", type: "text", realName: "name"},  
       ]);
  
       return {
        listModal,
        testFields,
        testFieldsR
      };
    },
  };
  </script>
   