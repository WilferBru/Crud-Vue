<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Registrar Estudiantes
                </div>
                <div class="card-body">
                    <form v-on:submit="guardar">
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
                                <option selected>Selecciona...</option>
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
        cursos:null,
        nombre:'',
        apellido:'',
        foto:'',
        curso_id:'',
        url:'http://academicobackend.test/api/v1/estudiantes',
        cargando:false
      }
    },
    mounted() {
      this.getCurso();
    },
    methods: {
        getCurso(){
            this.cargando = true;
            axios.get('http://academicobackend.test/api/v1/cursos').then(
            res =>{
                this.cursos = res.data;
                this.cargando = false;
            }
            );
        },  
      guardar(){
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
            enviarSolicitud('POST', parametros, this.url, 'El estudiante fue registrado!!!');   
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

  