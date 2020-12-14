class Partida {
    constructor(ficha, nfilas) {
        this.ficha = ficha;
        this.nfilas = nfilas;
        this.board = new Array(this.nfilas);
        this.createimage();
    }

    createimage() {
        this.fichaimagen = document.createElement("img");
        this.fichaimagen2 = document.createElement("img");
        if (this.ficha == 'x') {
            this.fichaimagen.src = "imgs/x.svg";
            this.fichaimagen.className = "xopaco";
        } else {
            this.fichaimagen.src = "imgs/circle.svg";
            this.fichaimagen.className = "circleopaco";
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
                const image = this.fichaimagen;
                columna.onpointerenter = function () { this.appendChild(image) };
                columna.onpointerleave = function () { this.innerHTML = ""; };
                columna.par = this;
                if (this.ficha == 'x') {
                    columna.onclick = function () {
                        const fixedimage = document.createElement("img");
                        fixedimage.src = "imgs/x.svg";
                        fixedimage.className = "x";

                        this.onpointerenter = NaN;
                        this.onpointerleave = NaN;
                        this.innerHTML = "";
                        this.onclick = NaN;
                        const f = this.closest('tr').rowIndex;
                        const c = this.cellIndex;
                        this.par.board[f][c]=1;
                        this.appendChild(fixedimage);
                    }
                } else {
                    columna.onclick = function () {
                        const fixedimage = document.createElement("img");
                        fixedimage.src = "imgs/circle.svg";
                        fixedimage.className = "circle";

                        this.onpointerenter = NaN;
                        this.onpointerleave = NaN;
                        this.innerHTML = "";
                        this.onclick = NaN;
                        console.log("indexc: " + this.cellIndex);
                        this.appendChild(fixedimage);
                    }
                }

                fila.appendChild(columna);
            }
            table.appendChild(fila);
        }
        divtable.appendChild(table);
    }

}