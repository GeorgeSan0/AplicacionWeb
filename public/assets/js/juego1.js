let iconos = []
let selecciones = []
generarTablero()
function cargarIconos() {
    iconos = [
        '<i class="icon ion-md-bookmarks"></i>',
        '<i class="icon ion-md-boat"></i>',
        '<i class="icon ion-md-train"></i>',
        '<i class="icon ion-md-bicycle"></i>',
        '<i class="icon ion-md-moon"></i>',
        '<i class="icon ion-logo-playstation"></i>',
        '<i class="icon ion-md-sunny"></i>',
        '<i class="icon ion-md-trophy"></i>',
        '<i class="icon ion-md-snow"></i>',
        '<i class="icon ion-md-rose"></i>',
        '<i class="icon ion-md-rocket"></i>',
        '<i class="icon ion-md-planet"></i>',
    ]
}

function generarTablero() {
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="icon ion-md-heart-half"></i>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        }else{
            trasera1.style.background = "#55a630"
            trasera2.style.background = "#55a630"
        }
    }, 1000);
}
