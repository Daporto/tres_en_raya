class Partida {
    constructor(ficha, nfilas){
        this.ficha = ficha;
        this.nfilas = nfilas;
    }

    createboard() {
        const divtable = document.querySelector("#div-table");
        const tableold = document.querySelector("#div-table table");
        if(tableold != null){
            tableold.remove();
        }
        const table = document.createElement("table");
        table.id = "tabla";
        for(var i=0; i<this.nfilas; i++){
            const fila = document.createElement("tr");
            for(var j=0; j<this.nfilas; j++){
                const columna = document.createElement("th");
                columna.textContent = "hola que tal";
                fila.appendChild(columna);   
            }
            table.appendChild(fila);
        }
        divtable.appendChild(table);
    }
}