document.addEventListener("DOMContentLoaded", function (event) {
    if (localStorage.getItem('mensaje') == 1) {
        crearCasillaMensaje();
    }
    localStorage.removeItem('mensaje');

    var submit = document.getElementById("enviarForm");

    submit.onsubmit = function () { registrarSintomas(); };
});

function registrarSintomas() {
    var datos = new Array();
    datos.push(document.getElementById('38?Y').checked)
    datos.push(document.getElementById('dc?Y').checked)
    datos.push(document.getElementById('tp?Y').checked)
    datos.push(document.getElementById('dg?Y').checked)
    datos.push(document.getElementById('dr?Y').checked)

    localStorage.setItem('mensaje', 1);
    localStorage.setItem('datos', datos);
}

function crearCasillaMensaje() {
    var mainContainer = document.createElement("div");
    var textContainer = document.createElement("div");
    var mensaje = document.createElement("p");
    var listadesordenada = document.createElement("ul");
    var botonCerrar = document.createElement("button");
    var temp = localStorage.getItem('datos');

    botonCerrar.innerHTML = "X";
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
    
    textContainer.appendChild(botonCerrar);
    textContainer.appendChild(mensaje);
    textContainer.appendChild(listadesordenada);
    document.body.appendChild(textContainer);
    document.body.appendChild(mainContainer);


    localStorage.removeItem('datos');
}

function cerrarVentana(a, b) {
    a.remove();
    console.log(a);
    b.remove();
    document.body.removeAttribute("style");
}