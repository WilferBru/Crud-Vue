<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <router-link to="/createC" class="btn btn-success mt-3"><i class="fa-solid fa-add"></i> Agregar nuevo Curso</router-link>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" style="margin-top:30px;">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Curso</th>
                <th scope="col">Horas</th>
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
                <tr v-else v-for="curso, i in this.cursos" :key="curso.id">
                <td v-text="(i+1)"></td>
                <td v-text="(curso.id)"></td>
                <td v-text="(curso.curso)"></td>
                <td v-text="(curso.horas)"></td>
                <td v-text="(new Date(curso.created_at).toLocaleDateString())"></td>
                <td>
                    <router-link :to="{path:'viewC/'+curso.id}" class="btn btn-primary">
                        <i class="fa-solid fa-eye"></i>
                    </router-link>
                    &nbsp;
                    <router-link :to="{path:'editC/'+curso.id}" class="btn btn-warning">
                        <i class="fa-solid fa-edit"></i>
                    </router-link>
                    &nbsp;
                    <button class="btn btn-danger" v-on:click="$event=>eliminar(curso.id,curso.curso)">
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
  import {confirmar} from '../../funciones';


  export default{
    data() {
      return {
        cursos:null,
        cargando:false
      }
    },
    mounted() {
      this.getCursos();
    },
    methods: {
      getCursos(){
        this.cargando = true;
        axios.get('http://academicobackend.test/api/v1/cursos').then(
          res =>{
            this.cursos = res.data;
            this.cargando = false;
          }
        );
      },
      eliminar(id,curso){
        confirmar('http://academicobackend.test/api/v1/cursos/',id,'Eliminar curso','Si eliminas el curso '+curso+' Se borraran todos los estudiantes pertenecientes a este curso');
        this.cargando = false
      }
    }
  }
</script>


