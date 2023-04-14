<!-- eslint-disable vue/no-multiple-template-root -->
<template>   
     <transition name="fade" appear>
       <div class="modal-overlay" v-if="showModal"></div>
     </transition>
     <transition name="pop" appear>
       <div class="modal" role="dialog" v-if="showModal">
         <a @click="cleanForm()" class="modal-exit">x</a>
         <h2 style="margin-bottom:10px;margin-top:-15px">{{title}}</h2>
       
         <hr style="margin-bottom:10px"/>
         
     <div class="content-modal scrollbar" id="style-1">
       <form method="POST" name="sentMessage" id="contactForm" @submit="sendForm()" action="https://vuejs.org/" validate="novalidate"> 
        <div v-for="item in list" :key="item" class="row" style="zoom: 90%; padding-bottom:3%;padding-top:-50px">  
        <label for="name" style="width:200px;text-align:right;padding-right:20px;padding-top:5px">{{item.name}}:</label>
        <select v-if="item.type == 'selector'" name="select" ref="option" style="width:200px" :placeholder="item.name" @mousemove="clichSelect()"  @change="onChange($event)">
            <option v-for="s in selectt" :key="s" :value="s.name">{{ s.name }}</option> 
          </select>  
        <input v-else @click="clearError()" style="width:200px" class="input-modal" :ref="item.name" :type="item.type" :placeholder="item.name" required="required" :data-validation-required-message="'Please enter'+item.name"/> 
         </div>  
       </form>
     </div>
     <p v-if="errors.length">
    <br/>
     <b style="color:#EB5E30">Debe actualizar algun campo</b>
    <ul> 
      <!-- <li v-for="error in errors">{{ error }}</li> -->
    </ul>
  </p>
     
         <div style="display:flex; justify-content:center;text-align:center;margin-top:10px">
         <button type="button" class="button button--accept" @click="sendForm()">Aceptar</button>
         <button type="button" class="button button--cancel" @click="cleanForm()">Cancelar</button>
       </div>
    
     </div>
     </transition> 
        
   </template>
   
   <script> 
   
   export default {
     name: "ModalUpdateComponent", 
     props: {
       text: null,
       title: null,
       list: Array,
       table: null,
       id: null,
       selectt: Array,
       // eslint-disable-next-line vue/require-prop-type-constructor
     },
     data() {
       return {
         showModal: true,
         errors: [],  
         dataTest: [],
       selectedTemp: null
       };
     },
     emits: ['update', 'close'],
     methods: {
       sendForm() {  
      
       var tempcont = 0;
       this.list.forEach(element =>{  
        if(element.type!='selector')
         if(this.$refs[element.name][0].value != ''&&this.$refs[element.name][0].value!= null)
         tempcont ++; 
       }) 
    
       if (tempcont>0) {
        this.updateF();
       }
       else
       this.errors.push("campo obligatorio");
       }, 
       updateF: async function() {
         let data = {};
   
         this.list.forEach((element, index) =>{ 
          if(element.type=="selector"){
            if(this.selectedTemp != null)
            data[element.realName] = this.selectedTemp;
          }
         else if(this.$refs[element.name][0].value!=null &&this.$refs[element.name][0].value!='')    
         data[element.realName] = this.$refs[element.name][0].value;
         })    
         
        const url = await fetch(`http://localhost:9707/apis/${this.table}/${this.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
       }).then((res) => res.json());
   
   
         this.showModal = false; 
         this.errors = [];
    
        this.$emit("update")
   
       }, 
       cleanForm() {
         this.showModal = false; 
         this.errors = [];
         this.$emit("close")
       },
       clearError(){
        this.errors = [];
       },
      fetchData:async function(){ 
      const url = `http://localhost:9707/apis/${this.table}/`;
      const r = await fetch(url);
      const data = await r.json();
      this.dataTest = data; 

      //simplificar fecha
      this.dataTest.forEach((element) => {
        element.fecha = element?.fecha?.substring(0, 10);
      });
      this.updateData();
    },
     updateData(){ 
      this.dataTest.forEach(element =>{ 
        if(element.id== this.id){
          for (var i in element){  
         this.list.forEach(element2 =>{  
          if(element2.realName == i)
          { 
         if(element2.type=="selector"){   
          this.$refs.option[0].value = element[i];
         }
         else 
           this.$refs[element2.name][0].value = element[i];
          }
        }) 
      }
        } 
       }) 
    
     },
     clichSelect(){ 
      let select = document.querySelector('select');
if(select != null){
select.addEventListener('focus', () => {
 // select.size = 3; 
  select.classList.add('fadeIn'); 
  select.classList.remove('fadeOut');
  select.style.backgroundColor = '#FFF';
});

select.addEventListener('blur', () => {
  select.size = 1; 
  select.classList.add('fadeOut');
  select.classList.remove('fadeIn');
  select.style.backgroundColor = '#FFF';
});

select.addEventListener('change', () => {
  select.size = 1; 
  select.blur();
  select.style.backgroundColor = '#FFF';
});

select.addEventListener('mouseover', () => {
  if(select.size == 1){
     select.style.backgroundColor = 'rgb(247, 247, 247)';
  }
});
select.addEventListener('mouseout', () => {
  if(select.size == 1){
     select.style.backgroundColor = '#FFF';
  }
}); 
     }
    },
    onChange(e){ 
    this.selectedTemp = e.target.value;
    }
     },
      
     mounted(){  
      this.fetchData();
    }
   };
   </script>
   
   
   
   <style lang="scss">
  
   .button {
     margin: 0 15px;
     padding: 15px 0;
     min-width: 120px;
     border-radius: 23px;
     border: none;
     transition: all 0.3s linear;
     cursor: pointer; 
     font-weight: 700;
     font-size: medium; 
     display: flex;
     justify-content: center;
   }
   
   .button--accept {
     background-color: #42b983;//lighten(#5c8f22, 25);
     color: white;
   
     &:hover {
       background-color: #5ecc9a !important;//lighten(#5c8f22, 10);
     }
   }
    
   .button--cancel {
     background-color: lighten(#eb5e30, 10);
     color: white;
     &:hover {
       background-color: #eb5e30;
     }
   }
   
   .button--edit {
     background-color: lighten(#3f38cb, 10);
   
     &:hover {
       background-color: #5268a6;
     }
   }
   
   .button {
     cursor: pointer;
   }
   
   .modal {
     position: absolute;
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     margin: auto;
     text-align: center;
     width: auto;
     height: fit-content;
     max-width: 500px;
     padding: 2rem;
     border-radius: 1rem;
     box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
     background: #fff;
     z-index: 999;
     transform: none;
   }
   .modal h1 {
     margin: 0 0 1rem;
   }
   
   .modal-overlay {
     content: "";
     position: absolute;
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 998;
     background: #2c3e50;
     opacity: 0.6;
     cursor: pointer;
   }
   
   .modal-exit {
     font-size: 25px;
     padding-left: 85%;
     padding-top: 0px;
     margin-top: 0px;
     cursor: pointer;
     color: gray;
   }
   
   .content-modal {
     align-content: center;
     text-align: center;
     justify-content: center;
     background-color: rgb(243, 242, 242);
     
     border-radius: 1rem;
     margin-left: 5%;
     margin-right: 5%;
   }
   
   /* ---------------------------------- */
   
   .fade-enter-active,
   .fade-leave-active {
     transition: opacity 0.4s linear;
   }
   
   .fade-enter,
   .fade-leave-to {
     opacity: 0;
   }
   
   .pop-enter-active,
   .pop-leave-active {
     transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
   }
   
   .pop-enter,
   .pop-leave-to {
     opacity: 0;
     transform: scale(0.3) translateY(-50%);
   }
   
   .input-modal { 
     padding: 1.5%;
     border: 1px solid rgb(225, 225, 225);
     border-radius: 10px;
     outline: none;
     box-sizing: border-box;
     transition: 0.3s;
   }
   
   .input-modal:focus {
     border-color: #5c8f22;
     box-shadow: 0 0 8px 0 #5c8f22;
   }
   .scrollbar {
  width: auto;
  height: auto; 
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
    
   .row{--bs-gutter-x:1.5rem;--bs-gutter-y:0;display:flex;flex-wrap:wrap;margin-top:calc(var(--bs-gutter-y) * -1);margin-right:calc(var(--bs-gutter-x)/ -2);margin-left:calc(var(--bs-gutter-x)/ -2)}.row>*{flex-shrink:0;width:100%;max-width:100%;padding-right:calc(var(--bs-gutter-x)/ 2);padding-left:calc(var(--bs-gutter-x)/ 2);margin-top:var(--bs-gutter-y)}.col{flex:1 0 0%}.row-cols-auto>*{flex:0 0 auto;width:auto}.row-cols-1>*{flex:0 0 auto;width:100%}.row-cols-2>*{flex:0 0 auto;width:50%}.row-cols-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-4>*{flex:0 0 auto;width:25%}.row-cols-5>*{flex:0 0 auto;width:20%}.row-cols-6>*{flex:0 0 auto;width:16.6666666667%}.col-auto{flex:0 0 auto;width:auto}.col-1{flex:0 0 auto;width:8.3333333333%}.col-2{flex:0 0 auto;width:16.6666666667%}.col-3{flex:0 0 auto;width:25%}.col-4{flex:0 0 auto;width:33.3333333333%}.col-5{flex:0 0 auto;width:41.6666666667%}.col-6{flex:0 0 auto;width:50%}.col-7{flex:0 0 auto;width:58.3333333333%}.col-8{flex:0 0 auto;width:66.6666666667%}.col-9{flex:0 0 auto;width:75%}.col-10{flex:0 0 auto;width:83.3333333333%}.col-11{flex:0 0 auto;width:91.6666666667%}.col-12{flex:0 0 auto;width:100%}.offset-1{margin-left:8.3333333333%}.offset-2{margin-left:16.6666666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.3333333333%}.offset-5{margin-left:41.6666666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.3333333333%}.offset-8{margin-left:66.6666666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.3333333333%}.offset-11{margin-left:91.6666666667%}.g-0,.gx-0{--bs-gutter-x:0}.g-0,.gy-0{--bs-gutter-y:0}.g-1,.gx-1{--bs-gutter-x:0.25rem}.g-1,.gy-1{--bs-gutter-y:0.25rem}.g-2,.gx-2{--bs-gutter-x:0.5rem}.g-2,.gy-2{--bs-gutter-y:0.5rem}.g-3,.gx-3{--bs-gutter-x:1rem}.g-3,.gy-3{--bs-gutter-y:1rem}.g-4,.gx-4{--bs-gutter-x:1.5rem}.g-4,.gy-4{--bs-gutter-y:1.5rem}.g-5,.gx-5{--bs-gutter-x:3rem}.g-5,.gy-5{--bs-gutter-y:3rem}@media (min-width:576px){.col-sm{flex:1 0 0%}.row-cols-sm-auto>*{flex:0 0 auto;width:auto}.row-cols-sm-1>*{flex:0 0 auto;width:100%}.row-cols-sm-2>*{flex:0 0 auto;width:50%}.row-cols-sm-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-sm-4>*{flex:0 0 auto;width:25%}.row-cols-sm-5>*{flex:0 0 auto;width:20%}.row-cols-sm-6>*{flex:0 0 auto;width:16.6666666667%}.col-sm-auto{flex:0 0 auto;width:auto}.col-sm-1{flex:0 0 auto;width:8.3333333333%}.col-sm-2{flex:0 0 auto;width:16.6666666667%}.col-sm-3{flex:0 0 auto;width:25%}.col-sm-4{flex:0 0 auto;width:33.3333333333%}.col-sm-5{flex:0 0 auto;width:41.6666666667%}.col-sm-6{flex:0 0 auto;width:50%}.col-sm-7{flex:0 0 auto;width:58.3333333333%}.col-sm-8{flex:0 0 auto;width:66.6666666667%}.col-sm-9{flex:0 0 auto;width:75%}.col-sm-10{flex:0 0 auto;width:83.3333333333%}.col-sm-11{flex:0 0 auto;width:91.6666666667%}.col-sm-12{flex:0 0 auto;width:100%}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.3333333333%}.offset-sm-2{margin-left:16.6666666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.3333333333%}.offset-sm-5{margin-left:41.6666666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.3333333333%}.offset-sm-8{margin-left:66.6666666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.3333333333%}.offset-sm-11{margin-left:91.6666666667%}.g-sm-0,.gx-sm-0{--bs-gutter-x:0}.g-sm-0,.gy-sm-0{--bs-gutter-y:0}.g-sm-1,.gx-sm-1{--bs-gutter-x:0.25rem}.g-sm-1,.gy-sm-1{--bs-gutter-y:0.25rem}.g-sm-2,.gx-sm-2{--bs-gutter-x:0.5rem}.g-sm-2,.gy-sm-2{--bs-gutter-y:0.5rem}.g-sm-3,.gx-sm-3{--bs-gutter-x:1rem}.g-sm-3,.gy-sm-3{--bs-gutter-y:1rem}.g-sm-4,.gx-sm-4{--bs-gutter-x:1.5rem}.g-sm-4,.gy-sm-4{--bs-gutter-y:1.5rem}.g-sm-5,.gx-sm-5{--bs-gutter-x:3rem}.g-sm-5,.gy-sm-5{--bs-gutter-y:3rem}}@media (min-width:768px){.col-md{flex:1 0 0%}.row-cols-md-auto>*{flex:0 0 auto;width:auto}.row-cols-md-1>*{flex:0 0 auto;width:100%}.row-cols-md-2>*{flex:0 0 auto;width:50%}.row-cols-md-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-md-4>*{flex:0 0 auto;width:25%}.row-cols-md-5>*{flex:0 0 auto;width:20%}.row-cols-md-6>*{flex:0 0 auto;width:16.6666666667%}.col-md-auto{flex:0 0 auto;width:auto}.col-md-1{flex:0 0 auto;width:8.3333333333%}.col-md-2{flex:0 0 auto;width:16.6666666667%}.col-md-3{flex:0 0 auto;width:25%}.col-md-4{flex:0 0 auto;width:33.3333333333%}.col-md-5{flex:0 0 auto;width:41.6666666667%}.col-md-6{flex:0 0 auto;width:50%}.col-md-7{flex:0 0 auto;width:58.3333333333%}.col-md-8{flex:0 0 auto;width:66.6666666667%}.col-md-9{flex:0 0 auto;width:75%}.col-md-10{flex:0 0 auto;width:83.3333333333%}.col-md-11{flex:0 0 auto;width:91.6666666667%}.col-md-12{flex:0 0 auto;width:100%}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.3333333333%}.offset-md-2{margin-left:16.6666666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.3333333333%}.offset-md-5{margin-left:41.6666666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.3333333333%}.offset-md-8{margin-left:66.6666666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.3333333333%}.offset-md-11{margin-left:91.6666666667%}.g-md-0,.gx-md-0{--bs-gutter-x:0}.g-md-0,.gy-md-0{--bs-gutter-y:0}.g-md-1,.gx-md-1{--bs-gutter-x:0.25rem}.g-md-1,.gy-md-1{--bs-gutter-y:0.25rem}.g-md-2,.gx-md-2{--bs-gutter-x:0.5rem}.g-md-2,.gy-md-2{--bs-gutter-y:0.5rem}.g-md-3,.gx-md-3{--bs-gutter-x:1rem}.g-md-3,.gy-md-3{--bs-gutter-y:1rem}.g-md-4,.gx-md-4{--bs-gutter-x:1.5rem}.g-md-4,.gy-md-4{--bs-gutter-y:1.5rem}.g-md-5,.gx-md-5{--bs-gutter-x:3rem}.g-md-5,.gy-md-5{--bs-gutter-y:3rem}}@media (min-width:992px){.col-lg{flex:1 0 0%}.row-cols-lg-auto>*{flex:0 0 auto;width:auto}.row-cols-lg-1>*{flex:0 0 auto;width:100%}.row-cols-lg-2>*{flex:0 0 auto;width:50%}.row-cols-lg-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-lg-4>*{flex:0 0 auto;width:25%}.row-cols-lg-5>*{flex:0 0 auto;width:20%}.row-cols-lg-6>*{flex:0 0 auto;width:16.6666666667%}.col-lg-auto{flex:0 0 auto;width:auto}.col-lg-1{flex:0 0 auto;width:8.3333333333%}.col-lg-2{flex:0 0 auto;width:16.6666666667%}.col-lg-3{flex:0 0 auto;width:25%}.col-lg-4{flex:0 0 auto;width:33.3333333333%}.col-lg-5{flex:0 0 auto;width:41.6666666667%}.col-lg-6{flex:0 0 auto;width:50%}.col-lg-7{flex:0 0 auto;width:58.3333333333%}.col-lg-8{flex:0 0 auto;width:66.6666666667%}.col-lg-9{flex:0 0 auto;width:75%}.col-lg-10{flex:0 0 auto;width:83.3333333333%}.col-lg-11{flex:0 0 auto;width:91.6666666667%}.col-lg-12{flex:0 0 auto;width:100%}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.3333333333%}.offset-lg-2{margin-left:16.6666666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.3333333333%}.offset-lg-5{margin-left:41.6666666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.3333333333%}.offset-lg-8{margin-left:66.6666666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.3333333333%}.offset-lg-11{margin-left:91.6666666667%}.g-lg-0,.gx-lg-0{--bs-gutter-x:0}.g-lg-0,.gy-lg-0{--bs-gutter-y:0}.g-lg-1,.gx-lg-1{--bs-gutter-x:0.25rem}.g-lg-1,.gy-lg-1{--bs-gutter-y:0.25rem}.g-lg-2,.gx-lg-2{--bs-gutter-x:0.5rem}.g-lg-2,.gy-lg-2{--bs-gutter-y:0.5rem}.g-lg-3,.gx-lg-3{--bs-gutter-x:1rem}.g-lg-3,.gy-lg-3{--bs-gutter-y:1rem}.g-lg-4,.gx-lg-4{--bs-gutter-x:1.5rem}.g-lg-4,.gy-lg-4{--bs-gutter-y:1.5rem}.g-lg-5,.gx-lg-5{--bs-gutter-x:3rem}.g-lg-5,.gy-lg-5{--bs-gutter-y:3rem}}@media (min-width:1200px){.col-xl{flex:1 0 0%}.row-cols-xl-auto>*{flex:0 0 auto;width:auto}.row-cols-xl-1>*{flex:0 0 auto;width:100%}.row-cols-xl-2>*{flex:0 0 auto;width:50%}.row-cols-xl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xl-4>*{flex:0 0 auto;width:25%}.row-cols-xl-5>*{flex:0 0 auto;width:20%}.row-cols-xl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xl-auto{flex:0 0 auto;width:auto}.col-xl-1{flex:0 0 auto;width:8.3333333333%}.col-xl-2{flex:0 0 auto;width:16.6666666667%}.col-xl-3{flex:0 0 auto;width:25%}.col-xl-4{flex:0 0 auto;width:33.3333333333%}.col-xl-5{flex:0 0 auto;width:41.6666666667%}.col-xl-6{flex:0 0 auto;width:50%}.col-xl-7{flex:0 0 auto;width:58.3333333333%}.col-xl-8{flex:0 0 auto;width:66.6666666667%}.col-xl-9{flex:0 0 auto;width:75%}.col-xl-10{flex:0 0 auto;width:83.3333333333%}.col-xl-11{flex:0 0 auto;width:91.6666666667%}.col-xl-12{flex:0 0 auto;width:100%}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.3333333333%}.offset-xl-2{margin-left:16.6666666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.3333333333%}.offset-xl-5{margin-left:41.6666666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.3333333333%}.offset-xl-8{margin-left:66.6666666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.3333333333%}.offset-xl-11{margin-left:91.6666666667%}.g-xl-0,.gx-xl-0{--bs-gutter-x:0}.g-xl-0,.gy-xl-0{--bs-gutter-y:0}.g-xl-1,.gx-xl-1{--bs-gutter-x:0.25rem}.g-xl-1,.gy-xl-1{--bs-gutter-y:0.25rem}.g-xl-2,.gx-xl-2{--bs-gutter-x:0.5rem}.g-xl-2,.gy-xl-2{--bs-gutter-y:0.5rem}.g-xl-3,.gx-xl-3{--bs-gutter-x:1rem}.g-xl-3,.gy-xl-3{--bs-gutter-y:1rem}.g-xl-4,.gx-xl-4{--bs-gutter-x:1.5rem}.g-xl-4,.gy-xl-4{--bs-gutter-y:1.5rem}.g-xl-5,.gx-xl-5{--bs-gutter-x:3rem}.g-xl-5,.gy-xl-5{--bs-gutter-y:3rem}}@media (min-width:1400px){.col-xxl{flex:1 0 0%}.row-cols-xxl-auto>*{flex:0 0 auto;width:auto}.row-cols-xxl-1>*{flex:0 0 auto;width:100%}.row-cols-xxl-2>*{flex:0 0 auto;width:50%}.row-cols-xxl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xxl-4>*{flex:0 0 auto;width:25%}.row-cols-xxl-5>*{flex:0 0 auto;width:20%}.row-cols-xxl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xxl-auto{flex:0 0 auto;width:auto}.col-xxl-1{flex:0 0 auto;width:8.3333333333%}.col-xxl-2{flex:0 0 auto;width:16.6666666667%}.col-xxl-3{flex:0 0 auto;width:25%}.col-xxl-4{flex:0 0 auto;width:33.3333333333%}.col-xxl-5{flex:0 0 auto;width:41.6666666667%}.col-xxl-6{flex:0 0 auto;width:50%}.col-xxl-7{flex:0 0 auto;width:58.3333333333%}.col-xxl-8{flex:0 0 auto;width:66.6666666667%}.col-xxl-9{flex:0 0 auto;width:75%}.col-xxl-10{flex:0 0 auto;width:83.3333333333%}.col-xxl-11{flex:0 0 auto;width:91.6666666667%}.col-xxl-12{flex:0 0 auto;width:100%}}
    </style>