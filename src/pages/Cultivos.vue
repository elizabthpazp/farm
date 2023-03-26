<template>
  <Table name="cultivos" shortName="cultivo" :testFields="testFields" :testFieldsR="testFieldsR" :listModal="listModal"></Table>
</template>
  
  <script>
import  Table from "@/components/Table.vue"; 

import { ref, onMounted, inject } from "vue";

export default {
  name: "CultivosComponent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  }, 
  setup() { 
    const testFields = ref([
      "id",
      "name", 
      "tipo",
      "plan",
      "real",
      "areaExistencia",
      "tierraMov",
      "tierraLista",
      "fecha",
    ]);
    
    const testFieldsR = ref([
      "Id",
      "Nombre", 
      "Tipo",
      "Plan",
      "Real",
      "Area Existencia",
      "Tierra Mov",
      "Tierra Lista",
      "Fecha",
    ]); 

    let listModal = ref([
      {name :"Nombre", type: "text", realName: "name"}, 
      {name :"Tipo", type: "text", realName: "tipo"},
      {name :"Plan", type: "number", realName: "plan"},
      {name :"Real", type: "number", realName: "real"},
      {name :"Area Existencia", type: "text", realName: "areaExistencia"},
      {name :"Tierra Mov", type: "text", realName: "tierraMov"},
      {name :"Tierra Lista", type: "text", realName: "tierraLista"},
      {name :"Fecha", type: "date", realName: "fecha"},
     ]);

     return {
      listModal,
      testFields,
      testFieldsR,
    };

    
  },
};
</script>
 