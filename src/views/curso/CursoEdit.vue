<template>
    <div class="row mt-3">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Editar Curso
                </div>
                <div class="card-body">
                    <form v-on:submit="actualizar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="text" v-model="curso" id="curso" placeholder="Ingrese Nombre del curso" class="form-control" required maxlength="50">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="number" v-model="horas" id="horas" placeholder="Ingrese Horas del curso" class="form-control" required maxlength="50">
                        </div>
                        <div class="d-grid col-4 mx-auto mb-3">
                            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {mostrarAlert, enviarSolicitud} from '../../funciones';



  export default{
    data() {
      return {
        id: 0,
        curso:'',
        horas:'',
        url:'http://academicobackend.test/api/v1/cursos',
        cargando:false
      }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.url += '/'+this.id;
        this.getCurso();
    },
    methods: {  
      getCurso(){
            axios.get(this.url).then(
                res=>{
                    this.curso = res.data.datos.curso;
                    this.horas = res.data.datos.horas;
                }
            );
      },  
      actualizar(){
        event.preventDefault();;

        if (this.curso.trim()==='') {
            mostrarAlert('Ingrese un curso', 'warning', 'curso');
        }else if (this.horas==='') {
            mostrarAlert('Ingrese horas del curso', 'warning', 'horas');
        }else{
            var parametros = {curso:this.curso.trim(), horas:this.horas}
            enviarSolicitud('PUT', parametros, this.url, 'El Curso fue Actualizado!!!');   
        }

      },
    }
  }
</script>

  