import Swal from "sweetalert2";
import axios from "axios";

// esta funcion va a mostrar la alerta de la peticion o resultado
export function mostrarAlert(titulo,icono,foco=''){
    if (foco!='') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary',popup:'animeted zoonIn'},  
        buttonsStyling:false
    });
}

// en esta funcion aparecera una venta que confirma si borra o cancela 
export function confirmar(urlConslash,id,titulo,mensaje){
    var url = urlConslash+id;
    const swalWithBootstrapButton = Swal.mixin({
        customClass:{confirmButton:'btn btn-success me-3',cancelButton:'btn btn-danger'},
    });

    swalWithBootstrapButton.fire({
        title:titulo,
        text:mensaje,
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res)=>{
        if (res.isConfirmed) {
            enviarSolicitud('DELETE', {id:id},url,'Eliminado con exito');
        }else{
            mostrarAlert('Operación Cancelada', 'info')
        }
    });
}

// en esta funcion vamos al metodo delete de la api y borra el registro
export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({method:metodo,url:url,data:parametros}).then(function(res){
        var estado = res.status;
        if (estado == 200) {
            mostrarAlert(mensaje,'success');
            window.setTimeout(function(){
                window.location.href='/'
            },1000);
        }else{
            mostrarAlert('Servidor no pudo eliminar estudiante', 'error');
        }
    }).catch(function(error) {
        mostrarAlert('Servidor no disponible', 'error');
    });  
};