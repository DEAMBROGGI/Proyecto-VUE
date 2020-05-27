<template>
        <tr >
          <th class="tabla" scope="row">{{gasto.concepto}}</th>
          <td class="tabla">${{gasto.monto}}</td>
          <td class="tabla">{{gasto.cuenta}}</td>
          <td class="boton"><div id='editar'  class='btn btn-warning text-right'
                v-on:click='editarClick($event,{indice:indice, id:id, concepto:concepto, monto:monto, cuenta:cuenta});botonEditarAgegar($event);'
                v-b-modal="'my-modal'">
                <i class="fa fa-edit"></i>
              </div> 
          </td>
          <td><div id='eliminar'  class='btn btn-danger text-left iconos'
                v-on:click='manejarClick($event,{indice:indice, id:id})'>
                <i class="fa fa-trash"></i>
              </div>
          </td>
        </tr>  
</template>

<script>

export default {
  name: 'gastos',
  props: ['gasto','id','indice','concepto','monto','cuenta',],
  data: function () {
    return {
      test: 'test',
   
    }
  },
  
  methods: {

    manejarClick: function (evento,gastoID) {
      if (evento.target.id==='eliminar'){
        this.$emit('eliminarGasto',gastoID)
      }
    },

    editarClick: function (evento,gasto,) {
      if (evento.target.id==='editar'){
        this.$emit('editarGasto',gasto)    
      }
    },

    botonEditarAgegar:function(evento){
      if (evento.target.id==='editar'){
        this.botonEditar=true
        this.$emit('botonEditarAgregar')
      }
    },

  }
}
</script>

<style>
.iconos{
  margin: 0%;
  padding: 0%;
}
</style>
