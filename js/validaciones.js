const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(\d{0}|\d{2})\s?\d{4}\-?\d{4,4}$/ // 8 a 12 numeros.
}

const campos = {
	usuario: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "user":
			
			if(expresiones.usuario.test(e.target.value)){
				document.getElementById('grupo__usuario').classList.remove('formulario__grupo-incorrecto');
				document.querySelector('#grupo__usuario .formulario__input-error').classList.remove('formulario__input-error-activo');
				campos['usuario']=true;
			}else {
				document.getElementById('grupo__usuario').classList.add('formulario__grupo-incorrecto');
				document.querySelector('#grupo__usuario .formulario__input-error').classList.add('formulario__input-error-activo');
				campos['usuario']=false;
			}
		break;

		case "email":
			
			if(expresiones.correo.test(e.target.value)){
				document.getElementById('grupo__correo').classList.remove('formulario__grupo-incorrecto');
				document.querySelector('#grupo__correo .formulario__input-error').classList.remove('formulario__input-error-activo');
				campos['correo']=true;
			}else {
				document.getElementById('grupo__correo').classList.add('formulario__grupo-incorrecto');
				document.querySelector('#grupo__correo .formulario__input-error').classList.add('formulario__input-error-activo');
				campos['correo']=false;
			}
		break;

		case "telefono":
			
			if(expresiones.telefono.test(e.target.value)){
				document.getElementById('grupo__telefono').classList.remove('formulario__grupo-incorrecto');
				document.querySelector('#grupo__telefono .formulario__input-error').classList.remove('formulario__input-error-activo');
				campos['telefono']=true;
			}else {
				document.getElementById('grupo__telefono').classList.add('formulario__grupo-incorrecto');
				document.querySelector('#grupo__telefono .formulario__input-error').classList.add('formulario__input-error-activo');
				campos['telefono']=false;
			}
		break;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keydown', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

// Si el formulario esta validado se envia sino muestra un mensaje de error
formulario.addEventListener('submit', function(e) {
	e.preventDefault();

	if(campos.usuario && campos.correo && campos.telefono){
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

	}  else {
		formulario.reset();
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}

});

//----contador de caracteres-----
function getID(id){
	return document.getElementById(id).value;
}

function innerHTML(id,result){
	return document.getElementById(id).innerHTML=result;
}

function contadorCaracteres(){
	setInterval(function(){
		document.getElementById('coment').maxLength = 1000;
		var c = getID("coment");
		innerHTML("txtVista", (1000 - c.length) + " Caracteres restantes");
		campos['comentario'] = true;
		
	},0000);
}