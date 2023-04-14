<template>
  <Table name="animals" shortName="alimento" :testFields="testFields" :testFieldsR="testFieldsR" :listModal="listModal" :selectt="selectorEspecie"></Table>
</template>
  
  <script>
import  Table from "@/components/Table.vue"; 

import { ref, onMounted } from "vue";

export default {
  name: "AnimalesComponent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  }, 
  setup() { 
    const testFields = ref([
      "id",
      "name", 
      "especie",
      "category",
      "fecha",
    ]);

    const testFieldsR = ref([
      "Id",
      "Nombre", 
      "Especie",
      "Categoría",
      "Fecha",
    ]); 

    let listModal = ref([
      {name :"Nombre", type: "text", realName: "name"}, 
      {name :"Especie", type: "selector", realName: "especie"},
      {name :"Categoría", type: "text", realName: "category"},
      {name :"Fecha", type: "date", realName: "fecha"},
     ]); 

     let selectorEspecie = ref([
      {name :"Mamíferos"}, 
      {name :"Aves"}, 
      {name :"Peces"}, 
      {name :"Anfibios"}, 
      {name :"Reptiles"},  
     ]); 

     return {
      listModal,
      testFields,
      testFieldsR,
      selectorEspecie
    };
  },
};
</script>
 