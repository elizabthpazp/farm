<template>
  <div
    class="container text-center mt-4 mb-5"
    style="margin-right: 5%; margin-left: 5%"
  > 
    <div style="display:flex;margin:0 auto">
    <div style="text-align:start;justify-content:start;padding-top:-1%;">
      <h3 style="padding-bottom:10px">Categoría:</h3> 
      <input type="text" @change="filterTodo(activeFilter)" v-model="activeFilter" style="border-radius:10px;height:50%;">
    </div>

    <div style="text-align:end;justify-content:end;margin:0 auto;padding-left:68%;margin-top:2%;">
      <ModalAdd :title="'Agregar nuevo '+shortName" :table="name" :list="listModal" v-on:update="fetchData()" :selectt="selectt"/>
    </div> 
    </div>
    
    <br />
    <br />
    <div class="table-responsive scrollbar my-5" id="style-1">
      <table id="tableComponent" class="table table-striped" v-if="dataTest">
        <thead style="position:sticky;top:0px;">
          <tr>
            <!-- loop through each value of the fields to get the table header -->
            <th
              v-for="field in testFieldsR"
              :key="field"
              @click="sortTable(field)"
            >
              {{ field }}
            </th>

            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the list get the each student data -->
        <tr v-for="item in dataTest" :key="item.id" v-show="getCategory(item)"> 
          <td v-for="field in testFields" :key="field">{{ item[field] }}</td>
           
            <th class="trackB" @click="updateRow(item.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </th>

            <th class="trackB" @click="deleteItem(item.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                />
              </svg> 
            </th> 
          </tr>
        </tbody>
      </table>
    </div>

    <ModalUpdate v-if="updateD" :title="'Editar '+shortName" :id="idTemp" :table="name" :list="listModal" :selectt="selectt" v-on:close="updateD = false" v-on:update="updateD = false;fetchData()"/>

    <ModalDelete v-if="deleteD" :row="idTemp" :table="name" v-on:delete="fetchData()" v-on:close="deleteD = false"/>
 
  </div>
</template>
  
  <script>
import  ModalAdd from "@/components/ModalAdd.vue";
import  ModalUpdate from "@/components/ModalUpdate.vue";
import  ModalDelete from "@/components/ModalDelete.vue";

import { ref, onMounted, getCurrentInstance  } from "vue";

export default {
  name: "TableComponent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ModalAdd,
    // eslint-disable-next-line vue/no-unused-components
    ModalDelete,
     // eslint-disable-next-line vue/no-unused-components
    ModalUpdate
  },
  props: {
    name: {
      type: String,
    }, 
    shortName: {
      type: String,
    }, 
    listModal: {
      type : Object
    },
    testFields: {
      type : Object
    },
    testFieldsR: {
      type : Object
    },
    selectt: {
      type : Array
    },
  }, 
  setup(props) {
    let dataTest = ref(null);
    let loading = ref(true);
    let error = ref(null);  
    let deleteD = ref(false);
    let updateD = ref(false);
    let idTemp = ref(""); 
  
    const app = getCurrentInstance()

    const fetchData = async () => {
      loading.value = true;
      const finca = app.appContext.config.globalProperties.$myGlobalVariable
  
      const url = props.name == 'animals' ? `http://localhost:9707/apis/${props.name}?idFincaId=${finca}`
      : `http://localhost:9707/apis/${props.name}?idFinca=${finca}`;

      const r = await fetch(url, { 
       headers: {"Content-type": "application/json;charset=UTF-8"}, 
      });
      const data = await r.json();
      dataTest.value = data;
      loading.value = false;

      //simplificar fecha
      dataTest.value.forEach((element) => {
        element.fecha = element?.fecha?.substring(0, 10);
      });
    };

    function deleteItem(id) { 
      idTemp.value = id;
      deleteD.value = true;
    }
 
    async function updateRow(id) {  
      idTemp.value = id;
      updateD.value = true;
    } 

    const filters = ref(['All', 'Personal', 'Work', 'Other']);
    let activeFilter = ref('');
    let actual = ref();

    function filterTodo(type) {
      if(type != '')
      activeFilter.value = type; 
    }

    function getTodos (){
      if (activeFilter.value === 'All') {
        return todos.value;
      }
      return todos.value.filter((item) => item.type === activeFilter.value);
    };

    function getCategory(item){ 
      if(props.name == 'animals')
      return activeFilter.value != null && activeFilter.value != '' ? activeFilter.value == item.category : true;
      else
      return true;
    }

    onMounted(() => {  
      fetchData(); 
    });

    return { 
      dataTest,
      loading,
      error, 
      deleteD, 
      deleteItem, 
      fetchData, 
      updateRow,
      activeFilter,
      filters,
      filterTodo,
      getTodos,
      getCategory,
      actual, 
      idTemp,
      updateD
    };
  },
};
</script>

<style scoped lang="scss">
th,
td {
  padding: 15px !important;
  border-radius: 12px;
  border-color: lightgray !important;
  width: auto;
}

th {
  background-color: #42b983 !important;
  color: white;
  width: auto;
}

.trackB {
  width: auto;
}

.trackB:hover {
  background-color: #5ecc9a !important;
  cursor: pointer;
}

table {
  caption-side: bottom;
  border-collapse: collapse;
  text-align: center;
  width: auto;
}
caption {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #6c757d;
  text-align: left;
}
th {
  text-align: inherit;
  text-align: -webkit-match-parent;
  width: auto;
}
tbody,
td,
tfoot,
th,
thead,
tr {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  width: auto;
}
label {
  display: inline-block;
}
.table {
  --bs-table-color: var(--bs-body-color);
  --bs-table-bg: transparent;
  --bs-table-border-color: var(--bs-border-color);
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: var(--bs-body-color);
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: var(--bs-body-color);
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: var(--bs-body-color);
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: var(--bs-table-color);
  vertical-align: top;
  border-color: var(--bs-table-border-color);
}
.table > :not(caption) > * > * {
  padding: 0.5rem 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table > tbody {
  vertical-align: inherit;
}
.table > thead {
  vertical-align: bottom;
}
.table-group-divider {
  border-top: 2px solid currentcolor;
}
.caption-top {
  caption-side: top;
}
.table-sm > :not(caption) > * > * {
  padding: 0.25rem 0.25rem;
}
.table-bordered > :not(caption) > * {
  border-width: 1px 0;
}
.table-bordered > :not(caption) > * > * {
  border-width: 0 1px;
}
.table-borderless > :not(caption) > * > * {
  border-bottom-width: 0;
}
.table-borderless > :not(:first-child) {
  border-top-width: 0;
}
.table-striped > tbody > tr:nth-of-type(odd) > * {
  --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}
.table-striped-columns > :not(caption) > tr > :nth-child(2n) {
  --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}
.table-active {
  --bs-table-accent-bg: var(--bs-table-active-bg);
  color: var(--bs-table-active-color);
}
.table-hover > tbody > tr:hover > * {
  --bs-table-accent-bg: var(--bs-table-hover-bg);
  color: var(--bs-table-hover-color);
}
.table-primary {
  --bs-table-color: #000;
  --bs-table-bg: #cfe2ff;
  --bs-table-border-color: #bacbe6;
  --bs-table-striped-bg: #c5d7f2;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #bacbe6;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bfd1ec;
  --bs-table-hover-color: #000;
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
}
.table-secondary {
  --bs-table-color: #000;
  --bs-table-bg: #e2e3e5;
  --bs-table-border-color: #cbccce;
  --bs-table-striped-bg: #d7d8da;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #cbccce;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #d1d2d4;
  --bs-table-hover-color: #000;
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
} 
.table-responsive {
overflow-x: auto;
overflow-y: auto;
-webkit-overflow-scrolling: touch;

height: auto ;
max-height:580px;
}
@media (max-width: 575.98px) {
  .table-responsive-sm {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 767.98px) {
  .table-responsive-md {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 991.98px) {
  .table-responsive-lg {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1199.98px) {
  .table-responsive-xl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1399.98px) {
  .table-responsive-xxl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.mt-0 {
  margin-top: 0 !important;
}
.mt-1 {
  margin-top: 0.25rem !important;
}
.mt-2 {
  margin-top: 0.5rem !important;
}
.mt-3 {
  margin-top: 1rem !important;
}
.mt-4 {
  margin-top: 1.5rem !important;
}
.mt-5 {
  margin-top: 3rem !important;
}
.mt-auto {
  margin-top: auto !important;
}

.scrollbar {
  width: auto;
  height: auto;
  max-height: 580px;
  max-width: 100%;
  background: #f5f5f5;
}

/*
 *  STYLE 1
 */

#style-1::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>