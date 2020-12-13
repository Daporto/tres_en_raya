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
                
                if(i==0 && j==0){
                    columna.className = "up-left";
                }else if(i==0 && j>0 && j<this.nfilas-1){
                    columna.className = "up-middle";
                }else if(i==0 && j==this.nfilas-1){
                    columna.className = "up-right";
                }else if(i>0 && i<this.nfilas-1 && j==0){
                    columna.className = "middle-left";
                }else if(i>0 && i<this.nfilas-1 && j>0 && j<this.nfilas-1){
                    columna.className = "middle-middle";
                }else if(i>0 && i<this.nfilas-1 && j==this.nfilas-1){
                    columna.className = "middle-right";
                }else if(i==this.nfilas-1 && j==0){
                    columna.className = "down-left";
                }else if(i==this.nfilas-1 && j>0 && j<this.nfilas-1){
                    columna.className = "down-middle";
                }else if(i==this.nfilas-1 && j==this.nfilas-1){
                    columna.className = "down-right";
                }

                fila.appendChild(columna);   
            }
            table.appendChild(fila);
        }
        divtable.appendChild(table);
    }
}