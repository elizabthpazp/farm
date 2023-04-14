<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div id="container" :style="getStyle()">
  <div id="left">
    <img src="/test.png" width="300" height="200" style="padding-bottom: 5px;margin-bottom: 0px;margin-top: 30px;"/>
    <h1 id="welcome" style="font-weight:400;padding-top:0px;margin-top: 0px">Bienvenido</h1> 
    <p>
      Ingrese con su usuario y contraseña. 
      </p>
       <p>
      Comience a gestionar todo lo referente a sus fincas.
      </p>
       <p>
      Puede insertar, atualizar y eliminar datos 
    <br> 
    </p>
    <div style="display: flex; margin-top: 0%;margin-bottom: 10%;">
     <input v-if="sent" type="submit" id="submit" class="client-info button" style="margin-right: 1%; margin-left: 8%;" value="Registro" @click="register=true, login = false">
     <input v-if="sent" type="submit" id="submit" class="client-info button" style="margin-right: 8%; margin-left: 1%;" value="Acceso" @click="login=true, register = false">
    </div>
  </div> 
  <div id="right" v-if="login&&sent">
    <h1 id="login" style="font-weight: 400;">Acceso</h1><br>

    <form method="POST" action="javascript:void(0)" validate="novalidate" @submit="loginUser()"> 
    <input @click="error = ''" type="text" v-model="username" id="email" class="client-info" required="required" :data-validation-required-message="'Please enter username'">
    <label for="email">Nombre de usuario</label> 

    <input @click="error = ''" type="password" v-model="password" id="password" class="client-info" required="required" :data-validation-required-message="'Please enter password'">
    <label for="password">Contraseña</label>
  
    <input type="submit" id="submit" href="javascript:void(0)" class="client-info button" value="Acceder">
   </form>
   <p v-if="error" style="color:#EB5E30;text-align:center">
     {{error}}
  </p>
  </div>


  <div id="right" v-if="register&&sent">
    <h1 id="login" style="font-weight: 400; margin-top:-5%">Registro</h1><br>

   <form method="POST" action="javascript:void(0)" validate="novalidate" @submit="addUser()" style="margin-top:-5%"> 
    <input v-model="username" type="text" id="email" class="client-info" required="required" :data-validation-required-message="'Please enter username'">
    <label for="email">Nombre de usuario</label>

    <input v-model="finca" type="text" id="finca" class="client-info" required="required" :data-validation-required-message="'Please enter finca'">
    <label for="finca">Finca</label>

    <select id="rol" name="select" placeholder="admin" class="client-info">
     <option :value="rol1">{{rol1}}</option> 
     <option value="Otro">Otro</option> 
    </select> 
    <label for="rol">Rol</label>

    <input v-model="password" type="password" id="password" class="client-info" required="required" :data-validation-required-message="'Please enter password'">
    <label for="password">Contraseña</label>
  
    <input required type="submit" id="submit" href="javascript:void(0)" class="client-info button" value="Registrar">
   </form>
  
  </div>

</div> 
</template> 
 
<script setup> 

import { ref, getCurrentInstance } from "vue";
import { useFincaStore } from '@/stores/finca'

const fincaActual = useFincaStore()

let username = ref('');
let password = ref(''); 
let finca = ref('');  

let rol1 = ref("Administrador");

let login = ref(true);
let register = ref(false);

let sent = ref(true);

let error = ref(null);
       

let getStyle=()=>{
  return sent.value ? "margin-top:10px;padding-bottom:20px;margin-left: 100px;" : "margin-top:10px;padding-bottom:20px;margin-left: 350px;";
}

let list = ref([
      {name :"Nombre", type: "text", realName: "name"}, 
      {name :"Rol", type: "selector", realName: "rol"},
      {name :"Password", type: "text", realName: "password"}, 
     ]); 
 

 async function addUser(){ 
      let data = {};

      data["idFinca"] = finca.value;
        
      list.value.forEach((element, index) =>{     
      if(element.realName == 'rol'){
        data[element.realName] = rol1.value;
      }
      else if(element.realName == 'name'){
        data[element.realName] = username.value;
      } 
      else if(element.realName == 'password'){
        data[element.realName] = password.value;
      }  

      })  
 
 
      const url = await fetch(`http://localhost:9707/apis/usuario/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
 
     fincaActual.setFinca(finca.value);
     fincaActual.setUser(username.value);
      fincaActual.setRole(rol1.value);
       fincaActual.setPass(password.value);
     sent.value=false;
 
    };
 

    let loginUser = async () => {  
      
    if(fincaActual.user==username.value&&fincaActual.pass==password.value){
      error.value = "Ya se encuentra su usuario activo"
    }
    else{
      error.value = null;  
      const url = `http://localhost:9707/apis/usuario?name=${username.value}&password=${password.value}`;
   
      const r = await fetch(url, { 
       headers: {"Content-type": "application/json;charset=UTF-8"}, 
      });
      const data = await r.json();
     
      if(data[0] == null)
      error.value = "Los datos introducidos son incorrectos"
      else {
       
      fincaActual.setFinca(data[0].idFinca);
      fincaActual.setUser(data[0].name);
      fincaActual.setRole(data[0].rol); 
      fincaActual.setPass(data[0].password); 
      sent.value=false; 
      }
    }
    };
</script>
 

<style scoped>


:root {
  --main-color: #fff;
  --second-color: #347deb;
  --box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  --facebook-color: rgb(60, 90, 154);
  --google-color: rgb(220, 74, 61);
}

html {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
} 

#container {
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--main-color);
  width: 1200px;
  height: 800px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  box-shadow: var(--box-shadow);
  transition-duration: 1s;
  overflow: hidden;
}

#left, #right {
  margin: auto; 
  width: 100%;
  height: 92%;
  border-radius: 30px;
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
}

#left { 
  background-size: cover;
  background-position: center;
  box-shadow: var(--box-shadow);
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
             text-align: center;
}
#welcome, #lorem {
  margin: 20px;
  text-shadow: var(--box-shadow);
}
#welcome { 
  font-size: 75px;
  font-weight: 300; 
  text-shadow: var(--box-shadow);
}

#login {
  padding-top: 35%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 100;
  text-shadow: var(--box-shadow);
}
.client-info {
  display: block;
  margin: 20px auto;
  width: 60%;
  height: 50px;
  border: solid #999 1px;
  border-radius: 5px;
  text-indent: 15px;
  transition: all 200ms;
  box-shadow: var(--box-shadow);
  padding-top: 2.5%;
}
.client-info:focus {
  width: 80%;
}
label {
  position: absolute;
  margin: -76px 130px;
	font-size: 12px;
	white-space: nowrap;
	background: #fff;
	padding: 0 5px;
	color: #999;
  transition: all 200ms;
  text-shadow: var(--box-shadow);
}
#email:focus ~ label[for="email"] {
  margin: -76px 70px;
}
#password:focus ~ label[for="password"] {
  margin: -76px 70px;
}
#submit {
    margin-top: 7%;
  border: none; 
  color: white;
  width: 60%;
  text-align: center;
}
#submit:hover {
  background-color: #df98fa;
}

.social {
  background-color: #fff;
  display: block;
  margin: 10px auto;
  width: 70%;
  height: 50px;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  transition-duration: 200ms;
  box-shadow: var(--box-shadow);
  text-shadow: var(--box-shadow);
}
#facebook {
  border: solid var(--facebook-color) 1px;
  color: var(--facebook-color);
}
#facebook:hover {
  background-color: var(--facebook-color);
  color: white;
}
#google {
  border: solid var(--google-color) 1px;
  color: var(--google-color);
}
#google:hover {
  background-color: var(--google-color);
  color: white;
}

@media (max-width: 1250px) {
 
  #container {
    width: 600px;
    display: block;
  }
  #left {
    display: none;
  }
  #right {
    margin-top: 16px;
     background-size: cover;
    background-position: center;
    box-shadow: var(--box-shadow);
  }
  
}

@media (max-height: 850px) {
 
  #container {
    width: 1000px;
    height: 600px;
  }
  #login {
    padding-top: 20%;
  }
  #welcome {
    margin-top: 240px;
    font-size: 60px;
  }
  #lorem {
    font-size: 15px;
  }
  
}


.button { 
  padding-right: 15px;
  border-radius: 23px;
  border: none;
  transition: all 0.3s linear;
  cursor: pointer; 
  font-weight: 700;
  font-size: large;  
  background-color: #42b983; 
  color: white;
}
  .button:hover {
    background-color: #5ecc9a !important; 
  } 
</style>