function showboard(){
    var x = document.getElementById("div-table");
    var y = document.getElementById("menu");
    //x.style.display = "flex";
    y.style.display = "none";

    var partida = new Partida('c',5);
    partida.createboard();
    x.style.display = "flex";
}