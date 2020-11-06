
// Llama al evento DOMContentLoaded que se ejecuta cuando se termina 
// de armar el arbol del DOM
document.addEventListener("DOMContentLoaded", function (event) {
    if (localStorage.getItem('mensaje')) {      //- Busca la variable mensaje en local
        crearCasillaMensaje();                  //- Si la encuentra crea el pop-up de los sintomas
    }
    localStorage.removeItem('mensaje');         //- Elimina mensaje del almacenamiento local

    var submit = document.getElementById("enviarForm");

    submit.onsubmit = function () { registrarSintomas(); };  // Llama un metodo al enviar el formulario
});

// Guarda las respuestas "Si" de los sintomas y una validación de envio para cuando se recargue la pagina 
function registrarSintomas() {
    var datos = new Array();
    datos.push(document.getElementById('38?Y').checked)
    datos.push(document.getElementById('dc?Y').checked)
    datos.push(document.getElementById('tp?Y').checked)
    datos.push(document.getElementById('dg?Y').checked)
    datos.push(document.getElementById('dr?Y').checked)

    localStorage.setItem('mensaje', true);
    localStorage.setItem('datos', datos);
}

/*
 Crea el pop-up para mostrar el resultado de los sintomas enviado el formulario:
 - Crea un fondo que tapa todos los elementos debajo para evitar su interaccion.
 - Impide el scroll en la pagina actual hasta no cerrar el pop-up o recargar.
 - Muestra el recuadro del pop-up con el total de sintomas y cuales.
 - Asigna un boton para cerrar el pop-up y seguir navegando en el sitio.
*/
function crearCasillaMensaje() {
    var mainContainer = document.createElement("div");
    var textContainer = document.createElement("div");
    var mensaje = document.createElement("p");
    var listadesordenada = document.createElement("ul");
    var botonCerrar = document.createElement("button");
    var vinculo = document.createElement('a');
    var temp = localStorage.getItem('datos');

    botonCerrar.innerHTML = "X";
    vinculo.innerHTML = "Mostrar más";
    listadesordenada.hidden = true;
    textContainer.setAttribute("class", "cartel");
    mainContainer.setAttribute("class", "popup");
    document.body.setAttribute("style", "overflow: hidden");
    mensaje.innerHTML = "El formulario fue completado correctamente. " + (temp.split('true').length - 1)
    + " síntomas de COVID-19 fueron registrados:"
    
    for (var i = 0; i < 5; i++) {
        var pregunta = document.getElementById("P" + i).innerHTML;
        var respuesta = temp.split(',')[i] == "true" ? "Si" : "No";
        var item = document.createElement("li");
        
        item.innerHTML = pregunta + "<span>" + respuesta + "</span>";
        listadesordenada.appendChild(item);
    }
    
    botonCerrar.addEventListener('click', function () { cerrarVentana(textContainer, mainContainer) });
    vinculo.addEventListener('click', function () { mostrar(vinculo, listadesordenada) })

    textContainer.appendChild(botonCerrar);
    textContainer.appendChild(mensaje);
    textContainer.appendChild(vinculo);
    textContainer.appendChild(listadesordenada);
    mainContainer.appendChild(textContainer);
    document.body.appendChild(mainContainer);


    localStorage.removeItem('datos');
}

// Cierra el pop-up.
function cerrarVentana(a, b) {
    a.remove();
    b.remove();
    document.body.removeAttribute("style");
}

// Desplegable con el resultado de las preguntas de sintomas.
function mostrar(a, b){
    if(a.innerHTML == "Mostrar más"){
        a.innerHTML = "Mostrar menos";
        b.hidden = false;
    }else{
        a.innerHTML = "Mostrar más";
        b.hidden = true;
    }
}