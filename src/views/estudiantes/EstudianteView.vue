<template>
  <div class="row mt-3">
      <div class="col-md-4 offset-md-4">
          <div class="card">
              <div class="card-hearder bg-dark text-white text-center">
                  Estudiante 
              </div>
              <div class="card-body">
                <router-link class="btn btn-success" to="/"><i class="fa-solid fa-arrow-left"></i> Volver</router-link>
                <div class="d-grid col-4 mx-auto mb-3">
                    <img v-if="this.foto" height="100" :src="this.foto" id="fotoimg" class="img-thumbnail" alt="">
                    <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png" id="fotoimg" class="img-thumbnail" alt="">
                </div>
                <div class="d-grid col-4 mx-auto mb-3">
                    <h1 v-text="nombre"></h1><h3 v-text="apellido"></h3>
                </div>
                <div class="d-grid col-4 mx-auto mb-3">
                    
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//   import axios from 'axios';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default{
  data() {
    return {
      id: 0,
      nombre:'',
      apellido:'',
      foto:'',
      url:'http://academicobackend.test/api/v1/estudiantes',
      cargando:false
    }
  },
  mounted(){
      const route = useRoute();
      this.id = route.params.id;
      this.url += '/'+this.id;
      this.getEstudiante();
  },
  methods: {
      getEstudiante(){
          axios.get(this.url).then(
              res=>{
                  this.nombre = res.data.datos.nombre;
                  this.apellido = res.data.datos.apellido;
                  this.foto = res.data.datos.foto;
              }
          );
      },
      
    previsualizarFoto(event){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function() {
          var miFoto = document.getElementById('fotoimg');
          miFoto.src = reader.result;
          this.foto =miFoto.src;
      }
    }
  }
}
</script>

