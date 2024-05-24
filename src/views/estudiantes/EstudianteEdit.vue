<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-hearder bg-dark text-white text-center">
                    Editar Estudiantes
                </div>
                <div class="card-body">
                    <form v-on:submit="actualizar"> 
                        <div class="d-grid col-4 mx-auto mb-3">
                            <img v-if="this.foto" height="100" :src="this.foto" id="fotoimg" class="img-thumbnail" alt="">
                            <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png" id="fotoimg" class="img-thumbnail" alt="">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese Nombre" class="form-control" required maxlength="50">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese Apellido" class="form-control" required maxlength="50">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text">Curso</label>
                            <select v-model="curso_id" class="form-select" id="curso_id">
                                <option :value="curso_id"></option>
                                <option v-for="curso in this.cursos" :key="curso.id" :value="curso.id">
                                    {{ curso.curso }}
                                </option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-image"></i></span>
                            <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpg, image/gif" class="form-control">
                        </div>
                        <div class="d-grid col-4 mx-auto mb-3">
                            <button class="btn btn-warning"><i class="fa-solid fa-refresh"></i> Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//   import axios from 'axios';
import {mostrarAlert, enviarSolicitud} from '../../funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';

  export default{
    data() {
      return {
        id: 0,
        nombre:'',
        apellido:'',
        foto:'',
        curso_id:'',
        curso:'',
        cursos:[],
        url:'http://academicobackend.test/api/v1/estudiantes',
        cargando:false
      }
    },
    async mounted(){
        const route = useRoute();
        this.id = route.params.id;
        this.url += '/'+this.id;
        await this.getEstudiante();
        await this.getCurso();
    },
    methods: {
        async getCurso(){
            this.cargando = true;
            axios.get('http://academicobackend.test/api/v1/cursos').then(
            ressult =>{
                this.cursos = ressult.data;
                this.cargando = false;
            }
            );
        },  
        async getEstudiante(){
            axios.get(this.url).then(
                res=>{
                    this.nombre   = res.data.datos.nombre;
                    this.apellido = res.data.datos.apellido;
                    this.curso_id = res.data.datos.curso_id;
                    this.curso    = res.data.datos;
                    this.foto     = res.data.datos.foto;
                }
            );
        },
        actualizar(){
        event.preventDefault();
        var miFoto = document.getElementById('fotoimg');
        this.foto = miFoto.src;

        if (this.nombre.trim()==='') {
            mostrarAlert('Ingrese un nombre', 'warning', 'nombre');
        }else if (this.apellido.trim()==='') {
            mostrarAlert('Ingrese un apellido', 'warning', 'apellido');
        }else if (this.curso_id===''){
            mostrarAlert('Ingresa un curso', 'warning', 'curso_id');           
        }else{
            var parametros = {nombre:this.nombre.trim(), apellido:this.apellido.trim(), foto:this.foto.trim(), curso_id:this.curso_id}
            enviarSolicitud('PUT', parametros, this.url, 'El estudiante fue actualizado!!!');            
        }

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

  