<template>
  <div class='container ml-5 pl-5 mt-2' v-if='!finRegistro'>
    <div id='titulo' class="row my-2">
        <h1>Registro de Usuario</h1>
    </div>

    <div class="row text-left">
      <div class='col-8 border rounded'>					
        <div class="form-group">
          <label for="email" class="cols-sm-2 control-label">Correo Electrónico</label>
          <div class="input-group">
            <span class="pt-2 px-3 input-group-addon bg-info"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
            <input type="text"  name="email" 
              id="email"  placeholder="Correo Electrónico"
              v-model="Email"
              ref="Email"
              v-bind:class="'form-control ' + validEmail"
              v-on:keyup.enter='changeFocus($event)'
              v-on:keyup='manejaChange($event)'/>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="cols-sm-2 control-label">Contraseña</label>
          <div class="input-group">
            <span class="pt-2 px-3 input-group-addon bg-info"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
            <input type="password" class="form-control" name="password" 
              id="password"  placeholder="Ingrese la contraseña"
              v-model="Clave"
              ref="Clave"
              v-bind:class="'form-control ' + validClave"
              v-on:keyup.enter='changeFocus($event)'
              v-on:keyup='manejaChange($event)'/>
          </div>
        </div>

        <div class="form-group">
          <label for="confirm" class="cols-sm-2 control-label">Confirmar Contraseña</label>
          <div class="input-group">
            <span class="pt-2 px-3 input-group-addon bg-info"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
            <input type="password" class="form-control" name="confirm" 
              id="confirm"  placeholder="Confirme la contraseña"
              v-model="ClaveConfirmar"
              ref="ClaveConfirmar"
              v-bind:class="'form-control ' + validClaveConfirm"
              v-on:keyup.enter='changeFocus($event)'
              v-on:keyup='manejaChange($event)'/>
          </div>
        </div>

        <div class="form-group text-center">
          <button type="button" id='registrar'
            class="btn btn-primary btn-lg login-button"
            @click='manejoClick($event)'>Registro</button>
          <button type="button" id='cancelar'
            class="ml-2 btn btn-primary btn-lg login-button"
            @click='manejoClick($event)'>Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class='container'>
    Completa tu registro valida tu email. 
    <a href='#' @click='irLogin'>{{Email}}</a>
  </div>
</template>

<script>

import * as firebase from "firebase";

export default {
  name:'registro-component',
  data: function () {
    return {
        Email:'',
        Clave:'',
        ClaveConfirmar:'',
        validEmail: '',
        validClave:'',
        validClaveConfirm:'',
        finRegistro:false
      }
  },
  methods: {
    manejoClick: function (e) {
      if (e.target.id==='cancelar')
        this.$emit('cancelarRegistro')
      else{
        if (this.emailValido(this.Email) &&
          this.passValido(this.Clave) && 
          document.getElementById("password").value===document.getElementById("confirm").value
        ){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.Email, this.Clave)
        
        .catch(err => {
          this.error = err.message;
        });
        this.finRegistro=true;
        }else alert('Email o Contraseña inválidos');

      }
    },
    irLogin: function () {
      this.sendEmailVerification()
      this.$emit('irLogin',{email:this.Email, clave:this.Clave, confirm:this.ClaveConfirmar})
      
    },
    changeFocus: function(e){
      if (e.target.id==='email'){
        this.$refs.Clave.focus();
      }
      else if (e.target.id==='password'){
        this.$refs.ClaveConfirmar.focus();
      }
      else if (e.target.id==='confirm'){
        this.validateRegister();
      }
    },
    validateRegister: function(){
      if (this.emailValido(this.Email) &&
          this.passValido(this.Clave) &&
         this.confirmValid(this.ClaveConfirmar))
        this.finRegistro=true;
      else
        alert('Email o Contraseña inválidos');
    },
    emailValido:function(email){
      var reEmail=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return reEmail.test(email);
    },
    passValido:function(pass){
      var rePass=/.{3,14}/;
      return rePass.test(pass);
    },
    confirmValid:function(){
     if(document.getElementById("confirm").value=== document.getElementById("password").value){
       return  true
    }},
   
    manejaChange: function(e){
      if (e.target.id==='email'){
        this.validEmail = this.emailValido(this.Email) ?
          'is-valid' : 'is-invalid';
      }
      else if (e.target.id==='password'){
        this.validClave = this.passValido(this.Clave) ?
          'is-valid' : 'is-invalid';
      }
      else if (e.target.id==='confirm'){
        this.validClaveConfirm = this.confirmValid() ?
          'is-valid' : 'is-invalid';      
      }
    },
    sendEmailVerification() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {

        alert('Email de Verificacion Enviado');
   
      });

    },
  }
}
</script>

