var selectedfigure;

function showboard(fig, nfilas, filasganar) {
    var x = document.getElementById("div-table");
    var y = document.getElementById("menu");
    //x.style.display = "flex";
    y.style.display = "none";

    var partida = new Partida(fig, nfilas, filasganar);
    partida.createboard();
    x.style.display = "flex";
}

function hideboard_showmenu() {
    var x = document.getElementById("div-table");
    x.style.display = "none";
    var y = document.getElementById("menu");
    y.style.display = "block";
}

function selectfigure(f) {
    if (f == 'x') {
        const x = document.getElementById('botonx');
        x.style.border = "5px solid";
        x.style.borderColor = "#F26C03"
        if (selectedfigure == 'c') {
            const c = document.getElementById('botonc');
            c.style.border = "0px";
        }
    }else{
        const c = document.getElementById('botonc');
        c.style.border = "5px solid";
        c.style.borderColor = "#F26C03"
        if (selectedfigure == 'x') {
            const x = document.getElementById('botonx');
            x.style.border = "0px";
        }
    }
    selectedfigure = f;
}

function validardatos(){
    if(selectedfigure == null){
        alert("no ha seleccionado ninguna figura");
    }else{
        const n = document.getElementById("ingrese-n").value;
        const n2 = document.getElementById("ingrese-n2").value;
        console.log("n: "+n);
        if(n == ""){
            alert("no se ha ingresado ningún valor en el númeor de filas");
        }else if(n % 1 != 0){
            alert("El número de filas debe ser un número entero");
        } else if(n < 3){
            alert("El número de filas debe ser mayor a dos");
        }else if(n2 < 3){
            alert("El largo de la fila para ganar debe ser mayor a dos");
        }else if(n2>n){
            alert("El número de filas para ganar debe ser menor al número de filas del tablero");
        }else{
            showboard(selectedfigure, n, n2);
        }
    }
}

function jugarotravez(){
    const divganar = document.getElementById("div-ganar");
    const divmenu = document.getElementById("menu");
    divganar.style.display = "none";
    divmenu.style.display = "block";
}