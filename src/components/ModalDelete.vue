<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <transition name="fade" appear>
    <div class="modal-overlay"></div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" style="width: 30%" role="dialog">
      <a @click="$emit('close')" class="modal-exit">x</a>
      <br /><br />
      <h2>Seguro que desea eliminar?</h2>
      <br /><br />
      <div style="display: flex; justify-content: center">
        <button
          type="submit"
          class="button button--accept"
          @click="deleteRow()"
        >
          Aceptar
        </button>
        <button
          type="submit"
          class="button button--cancel"
          @click="$emit('close')"
        >
          Cancelar
        </button>
      </div>
    </div>
  </transition>

  <div v-if="closeFin">{{ $emit('close') }} {{ $emit('delete') }}</div>
</template>

<script> 

import { ref, onMounted, emits, emit } from "vue";

export default {
  name: "ModalDeleteComponent", 
  props: {
    row: Number,
    table:String
  }, 
  emits: ['delete', 'close'],
  setup(props) {  

    let closeFin = ref(false);

    async function deleteRow() {
  
      const url = await fetch(`http://localhost:9707/apis/${props.table}/${props.row}`, {
        method: "DELETE",
      }); 
      closeFin.value = true;
    }  
    return {   
      deleteRow, 
      closeFin
    };

    onMounted(()=>{
      closeFin.value = false;
    })
 
  },
};
</script>