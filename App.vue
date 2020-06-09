<template>
  <div v-if='logon && !registro'  id='app' class=''>  

<!-------MENU TABS-------------->   
      <div id="tabs">
     <ul class="menu">
      <li v-for='(tab,index) in tabs'
          :key='index'
          :title='tab.name'>
          <a href='#'
             :ref='tab.name'
             :id='tab.name'
             :class='tab.className'
             @click='manejoClick($event);'
              >{{tab.name}}</a></li>
    </ul>
    <ul ref='menuBar' class="menu-bar"></ul>

<!-------TAB USUARIO-------------->   

   <div id ='UsuarioContenido' class='contenido openContenido'  >
         <div>
           <h1>USUARIO</h1>
         </div>
     <div id="usuario" class='card '>
      <div class="card-header">
          <div class=" col-4 usuario">Bienvenido Usuario: </div>
          <div class="col-4 nusuario">{{idUsuario}}</div>
      </div> 
     </div>
    </div> 
 
<!-------TAB AGREGAR EDITAR-------------->      
    
    <div id ='Agregar Editar GastosContenido' class='contenido' >
      <div v-if='botonEditar'><h1>EDITAR GASTOS</h1></div>
      <div v-if='!botonEditar'><h1>AGREGAR GASTOS</h1></div>
       <form class="card">
      <div class="card-body">
        <div class="form-group row">
          <label for="concepto" class='col-sm-2 col-form-label'>Concepto</label>
          <div class="col-sm-10">
            <input v-model='conceptoGasto' 
                   class='form-control' id="concepto" type='text'>
          </div>
          
        </div>
        <div class="form-group row">
          <label for="importe" class='col-sm-2 col-form-label'>Importe $</label>
          <div class="col-sm-10">
            <input v-model='montoGasto' class='form-control' id="importe" type='number' restri>
          </div>
        </div>
        <div class="form-group row">
          <label for="Cuenta" class='col-sm-2 col-form-label'>Cuenta</label>
          <div class="col-sm-10">
            <input v-model='cuentaGasto' class='form-control' id="Cuenta" type='text'>
          </div>
        </div>

        <div class="form-group row">
          <div class='col-12'>
            <div id='agregar' class='btn btn-warning btn-lg btn-block'
              v-if='botonEditar'
              v-on:click='editonClick($event)'
              >Editar Registro</div>   
          </div>
          <div class='col-12'>
            <div id='agregar' class='btn btn-success btn-lg btn-block'
              v-if='!botonEditar'
              v-on:click='manejarClick($event)'
              >Cargar Nuevo Registro</div>   
          </div>
          
        </div>
        
      </div>
    </form>
    </div>

<!------- TAB TABLA-------------->   
 
    <div id ='Consultar Tabla GastosContenido' class='contenido' >
      <div><h1>TABLA DE GASTOS </h1></div>

 <!--------- TABS HORIZONTALES --------------------------------->   
       
<div id= 'Cuentas'>
<div>
    <b-nav tabs align="center" >
      <b-nav-item 
      @click='baseCompleta=true
              filtroBase=false'               
      >Completa</b-nav-item>
<!--------- SELECTOR DE MENU PARA BUSQUEDA DE TABLA DINAMICA --------------------------------->
      <b-nav-item-dropdown 
      id="select"
      text="Cuentas" right
      v-model="seleccionado">

<!--------DROPDOWN PAR FACILITAR LA SELECCION DE CUENTAS---------->  
      <b-dropdown-item disabled value="0">Seleccione una cuenta</b-dropdown-item>
        <b-dropdown-item 
        href="#profile"
        v-for="select in selectOption" 
               :key='select' 
               :value='select' 
               @click="seleccionado = select ,
                baseCompleta=false
                filtroBase=true
                baseFiltrada()">
                {{select}}</b-dropdown-item>
      </b-nav-item-dropdown>
  </b-nav>
</div>
     
 <!------ CARGA DINAMICA DE TABLA COMPLETA EN PESTANA "TODAS" DE TABS HORIZONTALES------------------>        
        <div class="tab-content" id="myTabContent">
        <div 
        v-if='baseCompleta && !filtroBase'>
           <div> 
            <div id="tabla" class="card">
            <table class="table table-sm">
              <thead class="bg-primary encabezado">
                <tr>
                  <th scope="col">Concepto</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Cuenta</th>
                  <th class="boton" scope="col"><i class="fa fa-edit"></i></th>
                  <th class="boton" scope="col"><i class="fa fa-trash"></i></th>
                </tr>
              </thead>     
              <tbody>
 <!--------- INCRUSTADO COMPONENETE LibrosComponent--------------------------->               
              <librosComponente 
                v-for="(gasto,index) in gastos"
                v-bind:gasto='gasto'
                v-bind:id='gasto.id'
                v-bind:concepto='gasto.concepto'
                v-bind:monto='gasto.monto'
                v-bind:cuenta='gasto.cuenta'
                v-bind:indice='index'
                v-bind:key='index'
                v-on:eliminarGasto='eliminar($event)'
                v-on:editarGasto='editar'
                v-on:botonEditarAgregar='botonEditarAgegar'
                ></librosComponente> 
              </tbody>
              <tfoot> 
                <tr>
                </tr>  
              </tfoot>
            </table>
            </div>
            </div>
 <!--------- INCRUSTADO SUMA TOTALES--------------------------->            
            <div id="suma"><h4>Total de regitros: <strong>${{totales}}</strong></h4> </div>
            </div>
        
<!--------- INCRUSTADO TABLA FILTRADA POR CUENTA---------------------------> 
        <div 
        v-if='!baseCompleta && filtroBase'>
        <div> 
            <div id="tabla" class="card">
            <table class="table table-sm">
              <thead class="bg-primary encabezado">
                <tr>
                  <th scope="col">Concepto</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Cuenta</th>
                  <th class="boton" scope="col"><i class="fa fa-edit"></i></th>
                  <th class="boton" scope="col"><i class="fa fa-trash"></i></th>
                </tr>
              </thead>
              <tbody>
<!--------- INCRUSTADO COMPONENTE BaseConFiltro--------------------------->                
              <baseConFiltro        
                v-for="(gasto,index) in baseFiltradaCuenta"
                v-bind:gasto='gasto'
                v-bind:id='gasto.id'
                v-bind:concepto='gasto.concepto'
                v-bind:monto='gasto.monto'
                v-bind:cuenta='gasto.cuenta'
                v-bind:indice='index'
                v-bind:key='index'
                v-on:eliminarGasto='eliminar($event)'
                v-on:editarGasto='editar'
                v-on:botonEditarAgregar='botonEditarAgegar'
                ></baseConFiltro>
              </tbody>
              <tfoot>
                <tr>
                </tr>  
              </tfoot>
            </table>
            </div>
            </div>
<!--------- INCRUSTADO SUMA TOTALES, PARCIALES POR CUENTA Y PORCENTAJE--------------------------->             
            <div id="suma"><p>Total de regitros: <strong>${{totales}}</strong></p> </div>
            <div id="suma"><h4>Total de Cuenta {{seleccionado}}: <strong>${{totalCuentas}}</strong></h4> </div>
            <div id="suma"><p>Porcentaje de cuenta sobre total: <strong>%{{porcentaje}}</strong></p> </div>
        </div>      
        </div>
    </div>
    </div>
    </div>  
  </div>
  
<!-------CARGA LOGIN INCRUSTADO COMPONENTE LoginForm y Registro---------------->
  <div v-else>   
    <loginForm v-if='!registro && !logon'
               v-bind:firebase="firebase"
               v-on:ingresoCorrecto='ingresoCorrecto($event)'
               v-on:eventoRegistro='activarRegistro'>
    </loginForm>
    <registro-component 
          v-if='registro && !logon'
          @cancelarRegistro='quitarRegistro'
          @irLogin='aLogin($event)'>
    </registro-component>           
  </div>
</template>

<script>

import firebase from 'firebase'
import 'firebase/firestore'
import librosComponente from './components/LibrosComponente.vue'
import loginForm from './components/loginForm.vue'
import RegistroComponent from "./components/Registro.vue"
import baseConFiltro from './components/baseConFiltro.vue'



export default {
  name: 'app',
  props: ['gasto','id','indice','concepto','monto','cuenta',],
  data: function() {
    return {gastos : [],
    idGastos:'',
    conceptoGasto:'',
    montoGasto:'',
    cuentaGasto:'',
    coleccion:{},
    logon: false,
    registro:false,
    botonEditar:false,
    firebase:'',
    idUsuario:'',
    db:'',
    editado:"",
    tabs: [  {name:'Usuario',className:'about fa fa-user'},
             {name:'Consultar Tabla Gastos',className:'archive fa fa-archive'},
             {name:'Agregar Editar Gastos',className:'pencil fa fa-pencil'},
            ],
    totales:0,
    totalCuentas:0,
    selectOption:[],
    baseFiltradaCuenta:[],
    seleccionado:{},
    baseCompleta:true,
    filtroBase:false,
    porcentaje:0,
    } 
  },
  
  methods: {

calculoPorcentaje:function(){
  var total=this.totales
  var cuenta=this.totalCuentas
  var porcentaje=(cuenta*100)/total
  var porcenrdosdecimales = porcentaje.toFixed(2)
  this.porcentaje = porcenrdosdecimales
},

//GENERAR OPTION SELECT DE CUENTAS ELIMINANDO REPETIDOS
   opcionesSelect:function(gastos){
    gastos = this.gastos
    var unique = [...new Set(gastos.map(gasto => gasto.cuenta))] 
    this.selectOption = unique                
   }, 
   
   baseFiltrada:function(){
   this.baseFiltradaCuenta=[],
   this.coleccion.where("cuenta","==",this.seleccionado)
   .get()
    .then((gastos)=>{
            gastos.forEach((gasto) => {
            this.baseFiltradaCuenta.push({id:gasto.id,concepto:gasto.data().concepto,monto:gasto.data().monto, cuenta:gasto.data().cuenta})
        
            this.suma()////SE RECALCULA TOTAL
            this.sumaCuentas()//RECALCULA TOTAL POR CUENTA
            this.calculoPorcentaje()
            this.opcionesSelect()
            
        });
     })  
    }, 
         
//TOTAL DE GASTOS
    suma: function(gastos) {
    gastos = this.gastos
  
           var cont=0;
           var total=0;
           gastos.forEach((gasto) => {
              gasto  = parseFloat(gastos[cont].monto);
              cont++;
              total = total+gasto;
     });

     this.totales = total  
    },

//CALCULA LOS SUBTOTALES POR CUENTA
     sumaCuentas: function(gastos) {
     gastos = this.baseFiltradaCuenta
  
           var cont=0;
           var total=0;
           gastos.forEach((gasto) => {
              gasto  = parseFloat(gastos[cont].monto);
              cont++;
              total = total+gasto;
     });

     this.totalCuentas = total  
    },
   
//AGREGAR REGISTRO A BASE DE DATOS   
    manejarClick: function (evento) {
      if (evento.target.id==='agregar'){
        var gastoData = {concepto:this.conceptoGasto,
                          monto:this.montoGasto,
                          cuenta:this.cuentaGasto}
        this.coleccion.add(gastoData)
        .then((docReference) => {
          this.gastos.unshift({id:docReference.id, concepto: gastoData.concepto, monto: gastoData.monto, cuenta: gastoData.cuenta})   
        })
        .catch((Errro) => {
          alert('No se pudo agregar el libro al sistema. Error: '+Errro.message)
        })
        this.conceptoGasto=''
        this.montoGasto=''
        this.cuentaGasto=''
        this.baseFiltrada()//APLICA FILTRO DE VISTA RECARGADO
        this.suma()////SE RECALCULA TOTAL
        this.sumaCuentas()//RECALCULA TOTAL POR CUENTA
        this.opcionesSelect()

          //MUESTRA NUEVAMENTE TABLA
          var tabTabla = this.tabs[1]
          var idTabla = document.getElementById("Consultar Tabla Gastos")
          idTabla.className=tabTabla.className+' selected'
          document.getElementById("Consultar Tabla Gastos"+'Contenido').className='contenido openContenido'

          //QUITAR VISTA DE EDICION
          var tabEdicion = this.tabs[2]
          var idEdicion = document.getElementById("Agregar Editar Gastos")
          idEdicion.className=tabEdicion.className
          document.getElementById("Agregar Editar Gastos"+'Contenido').className='contenido'
      }
    },
  
//ELIMINAR REGISTRO DE BASE DE DATOS
    eliminar: function (gastoID){
      this.coleccion.doc(gastoID.id).delete()
      this.gastos.splice(gastoID.indice,1)
      
      this.suma()////SE RECALCULA TOTAL
      this.sumaCuentas()//RECALCULA TOTAL POR CUENTA
      this.opcionesSelect()
      this.baseFiltrada()//APLICA FILTRO DE VISTA RECARGADO
    },

//EDITAR REGISTRO DE BASE DE DATOS (SE ACTUALIZA BASE CON CADA CAMBIO)   
// En este caso no utilizo set o update dado que la nueva consulta no en todos los casos toma la ultima//
//actualizacion en ocaciones toma un registro anterior//
    editar:function(gasto){
      this.idGastos=gasto.id
      this.conceptoGasto =gasto.concepto;
      this.montoGasto=gasto.monto;
      this.cuentaGasto=gasto.cuenta; 
    },

      editonClick:function(evento) {
      if (evento.target.id==='agregar'){
        var datosEdit={concepto:this.conceptoGasto,
                         monto:this.montoGasto,
                         cuenta:this.cuentaGasto,}
       this.coleccion.add(datosEdit)
 
      this.conceptoGasto="";
      this.montoGasto="";
      this.cuentaGasto="";
      this.botonEditar=false

      this.gastos=[];
      this.baseFiltradaCuenta=[];
     
        this.coleccion.get()
        .then((gastos)=>{
            gastos.forEach((gasto) => {
            this.gastos.unshift({id:gasto.id,concepto:gasto.data().concepto,monto:gasto.data().monto, cuenta:gasto.data().cuenta})
            
            })
           this.suma()////SE RECALCULA TOTAL
           this.opcionesSelect()
        })
       
      this.coleccion.doc(this.idGastos).delete()
      this.gastos.splice(this.idGastos.indice,1)       
      }  
     
            this.sumaCuentas()//RECALCULA TOTAL POR CUENTA
            this.opcionesSelect()   
            this.baseFiltrada()//APLICA FILTRO DE VISTA RECARGADO
        
       //MUESTRA NUEVAMENTE TABLA
          var tabTabla = this.tabs[1]
          var idTabla = document.getElementById("Consultar Tabla Gastos")
          idTabla.className=tabTabla.className+' selected'
          document.getElementById("Consultar Tabla Gastos"+'Contenido').className='contenido openContenido'

          //QUITAR VISTA DE EDICION
          var tabEdicion = this.tabs[2]
          var idEdicion = document.getElementById("Agregar Editar Gastos")
          idEdicion.className=tabEdicion.className
          document.getElementById("Agregar Editar Gastos"+'Contenido').className='contenido'
    },
    
//MENU DE NAVEGACION     
     manejoClick: function (evento) {
        this.$refs.menuBar.className='menu-bar'
        this.cambiarSelected(evento.target.id)
      },
    
    cambiarSelected: function (id) {
      
      for (var tab of this.$data.tabs){
          if (tab.name===id){
          document.getElementById(id).className=tab.className+' selected'
          document.getElementById(id+'Contenido').className='contenido openContenido'}
        else{
          document.getElementById(tab.name).className=tab.className
          document.getElementById(tab.name+'Contenido').className='contenido'
        }
      }
    },
  
//INGRESO AL SISTEMA 
    ingresoCorrecto: function(usuario) {
        this.idUsuario=usuario
        this.logon=true
        this.registro=false
        this.coleccion = this.db.collection('/usuarios/'+usuario+'/gastos')
        this.coleccion.get()
        .then((gastos)=>{
          gastos.forEach((gasto) => {
            this.gastos.push({id:gasto.id,concepto:gasto.data().concepto,monto:gasto.data().monto, cuenta:gasto.data().cuenta})

       this.suma() 
       this.sumaCuentas()//RECALCULA TOTAL POR CUENTA
       this.opcionesSelect()
        })
      })
    },

    activarRegistro: function (){
      this.registro=true
      
    },

    quitarRegistro: function (){
      this.registro=false
    },

    aLogin: function (e){
      this.loginForm=e
      this.registro=false
    },

//DEFINICION DE BOTON EDITAR AGREGAR REGISTRO
    botonEditarAgegar:function(){
    this.botonEditar=true
        //MUESTRA NUEVAMENTE TABLA
          var tabTabla = this.tabs[1]
          var idTabla = document.getElementById("Consultar Tabla Gastos")
          idTabla.className=tabTabla.className
          document.getElementById("Consultar Tabla Gastos"+'Contenido').className='contenido '

        //QUITAR VISTA DE EDICION
          var tabEdicion = this.tabs[2]
          var idEdicion = document.getElementById("Agregar Editar Gastos")
          idEdicion.className=tabEdicion.className+' selected'
          document.getElementById("Agregar Editar Gastos"+'Contenido').className='contenido openContenido'
    },
  },
  
  components: {
    librosComponente, 
    loginForm,
    RegistroComponent,
    baseConFiltro, 
  },

  beforeMount: function () {
    var config = {
    apiKey: "YOUR API KEY",
    authDomain: "COPI DATA",
    databaseURL: "COPI DATA",
    projectId: "COPI DATA",
    storageBucket: "COPI DATA",
    messagingSenderId: "COPI DATA",
    appId: "COPI DATA:web:COPI DATA",
    measurementId: "COPI DATA"
    };
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    console.log(firebase.auth().currentUser)
 
    this.firebase = firebase
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.usuario{
  text-align: left;
  color: black;
  display: inline;
}

.nusuario{
  color: blue;
  display: inline;
}

.boton{
  width: 7%;
}

.tabla{
  text-align: center;
  padding-top: 2vw !important;
  padding-bottom: 0 !important;
  vertical-align: auto!important;
}

.encabezado{
  border-radius: 3px !important;
  color: white !important;
}

#tabla{
  border-radius: 3px !important;
}

.menu, .menu-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: #f7f7f7;
  z-index:10;  
  overflow:hidden;
  box-shadow: 2px 0 18px rgba(0, 0, 0, 0.26);
}

.menu li a{
  display: block;
  text-indent: -500em;
  height: 5em;
  width: 5em;
  line-height: 5em;
  text-align:center;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.1s ease-in-out;
}

.menu li a:before {
  font-family: FontAwesome; 
  text-indent: 0em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.4em;
}

.menu-bar li a:hover,
.menu li a:hover {
  background: #267fdd;
  color: #fff;
}

.menu-bar{
  overflow:hidden;
  left:5em;
  z-index:5;
  width:0;
  height:0;
  transition: all 0.1s ease-in-out;
}

.menu-bar li a{
  display: block;
  height: 4em;
  line-height: 4em;
  text-align:center;
  color: #72739f;
  text-decoration:none;  
  position: relative;
  font-family:verdana;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.1s ease-in-out;
}

.menu-bar li:first-child a{
  height:5em;
  background: #267fdd;
  color: #fff;    
  line-height:5
}

.contenido {
  overflow:hidden;
  top: 0;
  width:80%;
  height:0;
  padding-left: 6%;
  padding-right:2% ;
}

.contenido div{
  text-align:center;
  min-height: 30% !important;
  text-decoration:none;  
  font-family:verdana;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.para{
  color:#033f72;
  padding-left:100px;
  font-size:3em;
  margin-bottom:20px;
}

.open{
  width:10em;
  height:100%;
}
.openContenido{
  width:100%;
  height:100%;
}

.selected {
  background: #267fdd;
  color: #fff;
}

.tab-content > .tab-pane{
   min-height: 50vw !important;
}
@media all and (max-width: 500px) {
    .container{
      margin-top:100px;
    }
    .menu{
      height:5em;
      width:100%;
    }
    .menu li{
      display:inline-block;
    }
    .menu-bar li a{
      width:100%;
    }
    .menu-bar{
      width:100%;
      left:0;
      height:0;
    }
    .open{
      width:100%;
      height:auto;
    }
    .para{
      padding-left:5px;
}  
}
@media screen and (max-height: 34em){
  .menu li,
  .menu-bar {
    font-size:70%;
  }
}
@media screen and (max-height: 34em) and (max-width: 500px){
  .menu{
    height:3.5em;
    }
}
</style>
