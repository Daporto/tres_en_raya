class Partida {
    constructor(ficha, nfilas){
        this.ficha = ficha;
        this.nfilas = nfilas;
        this.createimage();
    }

    createimage(){
        this.fichaimagen = document.createElement("img");
        console.log("figu seleccionada: "+this.ficha)
        if(this.ficha=='x'){
            this.fichaimagen.src = "imgs/x.svg";
            this.fichaimagen.className = "x";
        }else{
            this.fichaimagen.src = "imgs/circle.svg";
            this.fichaimagen.className = "circle";
        }
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
               const image = this.fichaimagen;
                columna.onpointerenter = function(){this.appendChild(image)};
                columna.onpointerleave= function(){
                    this.innerHTML = "";
                };
                fila.appendChild(columna);   
            }
            table.appendChild(fila);
        }
        divtable.appendChild(table);
    }
}