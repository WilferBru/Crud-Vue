<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-striped table-bordered" style="margin-top:30px;">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Curso</th>
              <th scope="col">Registro</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody id="contenido">
            <tr v-if="this.cargando">
              <td colspan="6">
                <div class="text-center">
                  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="estudiante, i in this.estudiantes" :key="estudiante.id">
              <td v-text="(i+1)"></td>
              <td v-text="(estudiante.id)"></td>
              <td>
                <img v-if="estudiante.foto" style="width: 70px !important;" :src="estudiante.foto" class="img-thumbnail" alt="">
                <img v-else style="width: 70px !important;" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png" class="img-thumbnail" alt="">
              </td>
              <td v-text="(estudiante.nombre)"></td>
              <td v-text="(estudiante.apellido)"></td>
              <td v-text="(estudiante.curso.curso)"></td>
              <td v-text="(new Date(estudiante.created_at).toLocaleDateString())"></td>
              <td>
                  <router-link :to="{path:'viewE/'+estudiante.id}" class="btn btn-primary">
                    <i class="fa-solid fa-eye"></i>
                  </router-link>
                  &nbsp;
                  <router-link :to="{path:'editE/'+estudiante.id}" class="btn btn-warning">
                    <i class="fa-solid fa-edit"></i>
                  </router-link>
                  &nbsp;
                  <button class="btn btn-danger" v-on:click="$event=>eliminar(estudiante.id,estudiante.nombre)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {confirmar} from '../funciones';


  export default{
    data() {
      return {
        estudiantes:null,
        cargando:false
      }
    },
    mounted() {
      this.getEstudiantes();
    },
    methods: {
      getEstudiantes(){
        this.cargando = true;
        axios.get('http://academicobackend.test/api/v1/estudiantes').then(
          res =>{
            this.estudiantes = res.data;
            this.cargando = false;
          }
        );
      },
      eliminar(id,nombre){
        confirmar('http://academicobackend.test/api/v1/estudiantes/',id,'Eliminar estudiante','Quieres eliminar a '+nombre+'?');
        this.cargando = false
      }
    }
  }
</script>
