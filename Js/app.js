// Codigo By: Geovas or MartL7

const DivTabla = document.getElementById("Tabla");
DivTabla.style.opacity = "0";

const BotonVerTabla = document.getElementById("VerTabla");

const BotonBuscar = document.getElementById("Buscar");
BotonBuscar.style.opacity = "0.5";
BotonBuscar.disabled = true;

document.getElementById("BotonBuscar").addEventListener('click', function() {
  const cuadrado = document.getElementById("resultado");
  cuadrado.style.display = "block";
  CuadroBuscar.style.display = "none";
})

const BotonCerrar = document.getElementById("BotonCerrar");
BotonCerrar.addEventListener('click', function(){
    const cuadrado = document.getElementById("resultado");
    cuadrado.style.display = "none";
    const Input = document.getElementById("InputElemento");
    Input.value = "";
})

function VerTabla(){
  document.getElementById('BotonSiu').remove();
  const tabla = document.querySelector('.tabla');
  BotonVerTabla.remove();
  DivTabla.style.opacity = "1";
  BotonBuscar.disabled = false;
  BotonBuscar.style.opacity = "1";

  fetch('./elementos.json')
    .then(response => {
      return response.json();
    })

    .then(data => {
      let ElementosArray = Object.keys(data);

      for(let fila = 0; fila < 7; fila++) {
        for(let columna = 0; columna < 18; columna++) {
          const celda = document.createElement('div');
          celda.className = 'celda';
          celda.dataset = ElementosArray[fila * 18 + columna];
          tabla.appendChild(celda);
        }
      }

      for(let i = 0; i < ElementosArray.length; i++) {
        let tecla = document.createElement('div');
        tecla.className = 'tecla';
        tecla.textContent = ElementosArray[i];
        tabla.appendChild(tecla);
      }
    })
    .catch(console.error("Error al cargar el JSON"));
}
const CuadroBuscar = document.querySelector('.Buscar');
function EnviarElemento(){
  CuadroBuscar.style.display = "flex";
  document.getElementById("BotonBuscar").addEventListener('click', function() {
    const Input = document.getElementById("InputElemento").value;
    if(Input.value != "") {
      buscarElemento(Input);
    }
  })
}

function CerrarBuscar() {
  CuadroBuscar.style.display = "none";
}

//Recarga la Pagina
function Regresar(){
  location.reload();
}

function buscarElemento(mensaje){
  fetch('./elementos.json')
    .then(response => {
      return response.json();
    })

    .then(data => {
      let ElementosArray = Object.keys(data);

      for(let i = 0; i < ElementosArray.length; i++) {
          let Buscar = ElementosArray[i].toLowerCase();
          if(Buscar === mensaje.toLowerCase()) {
            const Elemento = data[ElementosArray[i]];
            let info = "Nombre: " + Elemento.nombre + "<br>";
              info += "Símbolo: " + Elemento.simbolo + "<br>";
              info += "Número atómico: " + Elemento.numeroAtomico + "<br>";
              info += "Peso Atomico: " + Elemento.pesoAtomico + "<br>";
              info += "Grupo: " + Elemento.grupo + "<br>";
              info += "Periodo: " + Elemento.periodo + "<br>";
              
              document.getElementById("res").innerHTML = info;
              return;
          }
      }
      document.getElementById("res").innerHTML = "Elemento no encontrado";
    })
}
//Funcion para el bicho SIUUU
function Siu(){
  const contenedor = document.getElementById('siu');

  let imagen = new Image();
  imagen.src = 'https://c.tenor.com/TM0Xkja0docAAAAi/cr7-si.gif';

  // Evento de carga de la imagen
  imagen.onload = function() {
    // Establecer posición inicial fuera de la pantalla
    imagen.style.position = 'absolute';
    imagen.style.left = '-500px';

    contenedor.appendChild(imagen);

    // Animación
    let posicion = -200;
    let animacion = setInterval(function() {
      if (posicion >= 0) {
        clearInterval(animacion);
        // Limpiar la imagen despues de 5 segundos
        setTimeout(function() {
          contenedor.removeChild(imagen);
        }, 900);
      } else {
        posicion += 5;
        imagen.style.left = posicion + 'px';
      }
    }, 10);
  };
}