<template>
    <div id='login'>
      <div class='container my-3 border rounded' style='width:350px'>
        <div class='row'>
          <div class='col-12 text-center'><h3>Ingreso al Sistema</h3></div>
        </div>
        <div class="form-group">
            <label for="email" class="cols-sm-2 control-label">Correo Electronico</label>
            <div class="cols-sm-10">
              <div class="input-group">
                <span class="pt-2 px-3 input-group-addon bg-primary">
                  <i class="fa fa-envelope fa white" aria-hidden="true"></i>
                </span>
                <input v-model='correo' type="text" class="form-control" placeholder='Ingrese el Correo Electrónico'/>
              </div>
            </div>
          </div>
        <div class="form-group">
            <label for="password" class="cols-sm-2 control-label">Password</label>
            <div class="cols-sm-10">
              <div class="input-group">
                <span class="pt-2 px-3 input-group-addon bg-primary" >
                  <i class="fa fa-lock fa-lg white"  aria-hidden="true"></i>
                </span>
                <input type="password" class="form-control" placeholder='Ingrese password' v-model='clave' />
              </div>
            </div>
          </div>
        <div class="form-group ">
            <button type="button" class="btn btn-primary" @click="ingresar">Ingresar</button>
        </div>
        <div class='text-left' >&#191;Usuario Nuevo? 
           <a id='registro' href='#' v-on:click='manejoClick($event)'>Registrate</a>
        </div>
      </div>

    </div>
    
</template>

<script>

export default {
  name:'loginForm',
  data: function () {
    return {
      correo:'',
      correoVerificado:false,
      clave:'',
      login:true
    }
  },
  props: ['firebase'],
  methods: {
    ingresar: function() {
      this.firebase.auth().signInWithEmailAndPassword(this.correo, this.clave)
      .then((response) => {
        
        console.log('Correo Verificado: '+response.user.emailVerified)
        console.log(response.user)
        
       
        if(response.user.emailVerified===true){
          this.correoVerificado =true
          this.$emit('ingresoCorrecto',response.user.email)
        }
        else {alert("Email no verificado");
        this.correoVerificado=false;
      
        }
     
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error: '+errorCode+' - '+errorMessage);
      })
    },
      manejoClick: function (e){
      if (e.target.id==='registro'){
        this.registro=true
        this.$emit('eventoRegistro')
      }
      }
  }
}
</script>

<style>
  #form {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.usuario_nuevo{
  text-align: right;
}
.white{
  color: white  
}
</style>
