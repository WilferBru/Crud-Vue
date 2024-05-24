<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-hearder bg-dark text-white text-center">
                    Estudiante 
                </div>
                <div class="card-body">
                  <router-link class="btn btn-success" to="/listC"><i class="fa-solid fa-arrow-left"></i> Volver</router-link>
                  <div class="d-grid col-4 mx-auto mb-3">
                    <h3 class="card-title">Curso {{ curso }}</h3>
                    <blockquote class="blockquote mb-0" v-if="num_estudiantes > 1">
                        <p>HORAS: {{ horas }}</p>
                        <footer class="blockquote-footer">Este curso cuenta con {{ num_estudiantes }} estudiantes</footer>
                    </blockquote>
                    <blockquote class="blockquote mb-0" v-else>
                        <p>HORAS: {{ horas }}</p>
                        <footer class="blockquote-footer">Este curso cuenta con {{ num_estudiantes }} estudiante</footer>
                    </blockquote>
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
        curso:'',
        horas:'',
        num_estudiantes:'',
        url:'http://academicobackend.test/api/v1/cursos',
        cargando:false
      }
    },
    mounted(){
        // const route = useRoute();
        this.id = this.$route.params.id;
        this.url += '/'+this.id;
        this.getCurso();
    },
    methods: {
        getCurso(){
            axios.get(this.url).then(
                res=>{
                    this.curso           = res.data.datos.curso;
                    this.horas           = res.data.datos.horas;
                    this.num_estudiantes = res.data.num_estudiantes;
                }
            );
        },
    }
  }
  </script>
  
  