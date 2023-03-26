<template>
  <Table name="equipos" shortName="equipo" :testFields="testFields" :testFieldsR="testFieldsR" :listModal="listModal"></Table>
</template>
  
  <script>
import  Table from "@/components/Table.vue"; 

import { ref, onMounted } from "vue";

export default {
  name: "EquiposComponent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  }, 
  setup() { 
    const testFields = ref([
      "id",
      "name", 
      "parque",
      "activos",
      "incidencias", 
      "fecha",
    ]);
    
    const testFieldsR = ref([
      "Id",
      "Nombre", 
      "Parque",
      "Activos",
      "Incidencias", 
      "Fecha",
    ]); 

    let listModal = ref([
      {name :"Nombre", type: "text", realName: "name"}, 
      {name :"Parque", type: "text", realName: "parque"},
      {name :"Activos", type: "number", realName: "activos"},
      {name :"Incidencias", type: "number", realName: "incidencias"}, 
      {name :"Fecha", type: "date", realName: "fecha"},
     ]);

     return {
      listModal,
      testFields,
      testFieldsR
    };
  },
};
</script>
 