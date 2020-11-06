/* Mostrar y ocultar Lista de paises y el campo direccion */
function ocultarMostrar(nombreRadio, idDelElemento) {
    var opciones = document.getElementsByName(nombreRadio);

    for (i in opciones) {
        if (opciones[i].value == "Y" && opciones[i].checked) {
            document.getElementById(idDelElemento).style.display = "block";
        }
        if (opciones[i].value == "N" && opciones[i].checked) {
            document.getElementById(idDelElemento).style.display = "none";
        }
    }
}
/* Validacion de los campos como obligatorios */
function validar() {
    var mensajesError = '';
    var error = false;

    var nombreApellido = document.getElementById("nma").value;     // Nombre y Apellido:valor  
    var dni = document.getElementById("dni").value;                // DNI:valor 
    var telefono = document.getElementById("tel").value;           // Telefóno:valor  

    if (nombreApellido.length == 0) {
        error = true;
        mensajesError += "<p>El campo Nombre y apellido es obligatorio.</p>";
    }
    if (dni.length == 0) {
        error = true;
        mensajesError += "<p>El campo DNI es obligatorio.</p>";

    }
    if (telefono.length == 0) {
        error = true;
        mensajesError += "<p>El campo Teléfono es obligatorio.</p>";
    }

    if (array.length < 6) {
        error = true;
        mensajesError += "<p>Ingrese los sintomas que presenta, por favor.</p>";
    }

    /* Muestra los mensajes de error */
    if (error == false) {
        registrarSintomas();
        return true;
    } else {
        document.getElementById("mensajes").innerHTML = mensajesError;
        return false;
    }
}

/* Verificacion para el campo: preguntas sobre sintomas */
var array = [""];
function validarSintomas(nombreRadio) {
    var opciones = document.getElementsByName(nombreRadio);

    for (var i = 0; i < array.length; i++) {
        if (opciones[0].isEqualNode(array[i][0]) && opciones[1].isEqualNode(array[i][1])) return;
    }
    array.push(opciones);
}




