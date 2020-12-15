class Partida {
    constructor(ficha, nfilas) {
        this.ficha = ficha;
        this.nfilas = nfilas;
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
                this.board[i][j] = 0;
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
                    this.par.board[f][c] = 1;
                    console.log("(0,0): " + this.par.board[0][0]);
                    this.appendChild(imagen);
                }

            fila.appendChild(columna);
        }
        table.appendChild(fila);
    }
    divtable.appendChild(table);
}

}