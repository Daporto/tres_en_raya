class Partida {
    constructor(ficha, nfilas, filasganar) {
        this.ficha = ficha;
        this.nfilas = nfilas;
        this.filasganar = filasganar;
        this.board = new Array(this.nfilas);
        this.createimage();
    }

    createimage() {
        this.fichaimagenc = document.createElement("img");
        this.fichaimagenf = document.createElement("img");
        if (this.ficha == 'x') {
            this.fichaimagenc.src = "imgs/x.svg";
            this.fichaimagenc.className = "xopaco";

            this.fichaimagenf.src = "imgs/x.svg";
            this.fichaimagenf.className = "x";
        } else {
            this.fichaimagenc.src = "imgs/circle.svg";
            this.fichaimagenc.className = "circleopaco";

            this.fichaimagenf.src = "imgs/circle.svg";
            this.fichaimagenf.className = "circle";
        }
    }

    fijarposicion(state, f, c){
        const posactual = this.board[f][c];
        const cactual = posactual.counter;
        posactual.state = state;
        if(f!=0 && state == this.board[f-1][c].state){
            cactual[0]=this.board[f-1][c].counter[0]+1;
            if(cactual[0]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de arriba
        else{
            cactual[0]=1;
        }
        if(f!=0 && c!=this.nfilas-1 && state == this.board[f-1][c+1].state){
            cactual[1]=this.board[f-1][c+1].counter[1]+1;
            if(cactual[1]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de arriba-derecha
        else{
            cactual[1]=1;
        }
        if(c!=this.nfilas-1 && state == this.board[f][c+1].state){
            cactual[2]=this.board[f][c+1].counter[2]+1;
            if(cactual[2]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de la derecha
        else{
            cactual[2]=1;
        }
        if(c!=this.nfilas-1 && f!=this.nfilas-1  && state == this.board[f+1][c+1].state){
            cactual[3]=this.board[f+1][c+1].counter[3]+1;
            if(cactual[3]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de abajo-derecha
        else{
            cactual[3]=1;
        }
        if(f!=this.nfilas-1 && state == this.board[f+1][c].state){
            cactual[4]=this.board[f+1][c].counter[4]+1;
            if(cactual[4]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de abajo
        else{
            cactual[4]=1;
        }
        if(f!=this.nfilas-1 && c!=0 && state == this.board[f+1][c-1].state){
            cactual[5]=this.board[f+1][c-1].counter[5]+1;
            if(cactual[5]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de abajo-izquierda
        else{
            cactual[5]=1;
        }
        if(c!=0 && state == this.board[f][c-1].state){
            cactual[6]=this.board[f][c-1].counter[6]+1;
            if(cactual[6]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de la izquierda
        else{
            cactual[6]=1;
        }
        if(c!=0 && f!=0 && state == this.board[f-1][c-1].state){
            cactual[7]=this.board[f-1][c-1].counter[7]+1;
            if(cactual[7]==this.filasganar){
                return true;
            }
        }//Se suma 1 al contador de la arriba-izquierda
        else{
            cactual[7]=1;
        }
        return false;
    }

    createboard() {
        const divtable = document.querySelector("#div-table");
        const tableold = document.querySelector("#div-table table");
        if (tableold != null) {
            tableold.remove();
        }
        const table = document.createElement("table");
        table.id = "tabla";
        for (var i = 0; i < this.nfilas; i++) {
            this.board[i] = new Array(this.nfilas);
            const fila = document.createElement("tr");

            for (var j = 0; j < this.nfilas; j++) {
                const vector = [0,0,0,0,0,0,0,0];
                const ficha = new PosicionTablero(i,j,0,vector);
                this.board[i][j] = ficha;
                const columna = document.createElement("th");

                if (i == 0 && j == 0) {
                    columna.className = "up-left";
                } else if (i == 0 && j > 0 && j < this.nfilas - 1) {
                    columna.className = "up-middle";
                } else if (i == 0 && j == this.nfilas - 1) {
                    columna.className = "up-right";
                } else if (i > 0 && i < this.nfilas - 1 && j == 0) {
                    columna.className = "middle-left";
                } else if (i > 0 && i < this.nfilas - 1 && j > 0 && j < this.nfilas - 1) {
                    columna.className = "middle-middle";
                } else if (i > 0 && i < this.nfilas - 1 && j == this.nfilas - 1) {
                    columna.className = "middle-right";
                } else if (i == this.nfilas - 1 && j == 0) {
                    columna.className = "down-left";
                } else if (i == this.nfilas - 1 && j > 0 && j < this.nfilas - 1) {
                    columna.className = "down-middle";
                } else if (i == this.nfilas - 1 && j == this.nfilas - 1) {
                    columna.className = "down-right";
                }
                columna.par = this;
                columna.onpointerenter = function () { this.appendChild(this.par.fichaimagenc) };
                columna.onpointerleave = function () { this.innerHTML = ""; };
                columna.onclick = function () {
                    const imagen = this.par.fichaimagenf.cloneNode(true);
                    console.log("clase de la ficha: "+imagen.className);
                    this.onpointerenter = NaN;
                    this.onpointerleave = NaN;
                    this.innerHTML = "";
                    this.onclick = NaN;
                    const f = this.closest('tr').rowIndex;
                    const c = this.cellIndex;
                    const gano = this.par.fijarposicion(1,f,c);
                    console.log("("+f+","+c+") = " + this.par.board[f][c].counter[5]);
                    this.appendChild(imagen);
                    if(gano){
                        const divganar = document.getElementById("div-ganar");
                        const divtable = document.getElementById("div-table");
                        divtable.style.display = "none";
                        divganar.style.display = "block";
                    }
                }

            fila.appendChild(columna);
        }
        table.appendChild(fila);
    }
    divtable.appendChild(table);
}

}