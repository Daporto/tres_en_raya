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

    fijarposicion(state, f, c) {
        const posactual = this.board[f][c];
        posactual.state = state;
        const carround = [0, 0, 0, 0, 0, 0, 0, 0];
        if (f != 0 && state == this.board[f - 1][c].state) {
            carround[0] = this.board[f - 1][c].counter[0];
        }//Se suma 1 al contador de arriba
        if (f != 0 && c != this.nfilas - 1 && state == this.board[f - 1][c + 1].state) {
            carround[1] = this.board[f - 1][c + 1].counter[3];
        }//Se suma 1 al contador de arriba-derecha
        if (c != this.nfilas - 1 && state == this.board[f][c + 1].state) {
            carround[2] = this.board[f][c + 1].counter[1];
        }//Se suma 1 al contador de la derecha
        if (c != this.nfilas - 1 && f != this.nfilas - 1 && state == this.board[f + 1][c + 1].state) {
            carround[3] = this.board[f + 1][c + 1].counter[2];
        }//Se suma 1 al contador de abajo-derecha
        if (f != this.nfilas - 1 && state == this.board[f + 1][c].state) {
            carround[4] = this.board[f + 1][c].counter[0];
        }//Se suma 1 al contador de abajo
        if (f != this.nfilas - 1 && c != 0 && state == this.board[f + 1][c - 1].state) {
            carround[5] = this.board[f + 1][c - 1].counter[3];
        }//Se suma 1 al contador de abajo-izquierda
        if (c != 0 && state == this.board[f][c - 1].state) {
            carround[6] = this.board[f][c - 1].counter[1];
        }//Se suma 1 al contador de la izquierda
        if (c != 0 && f != 0 && state == this.board[f - 1][c - 1].state) {
            carround[7] = this.board[f - 1][c - 1].counter[2];
        }//Se suma 1 al contador de la arriba-izquierda
        const newcounter = new Array(4);
        newcounter[0] = carround[0] + carround[4] + 1;
        newcounter[1] = carround[2] + carround[6] + 1;
        newcounter[2] = carround[7] + carround[3] + 1;
        newcounter[3] = carround[1] + carround[5] + 1;
        //console.log(newcounter);
        posactual.counter = newcounter.slice();
        if (newcounter[0] >= this.filasganar || newcounter[1] >= this.filasganar || newcounter[2] >= this.filasganar || newcounter[3] >= this.filasganar) {
            return true;
        } else {
            this.transmitir(0, -1, 0, f-1, c, newcounter[0], state);
            this.transmitir(1, -1, 3, f-1, c+1, newcounter[3], state);
            this.transmitir(1, 0, 1, f, c+1, newcounter[1], state);
            this.transmitir(1, 1, 2, f+1, c+1, newcounter[2], state);
            this.transmitir(0, 1, 1, f+1, c, newcounter[1], state);
            this.transmitir(-1, 1, 3, f+1, c-1, newcounter[3], state);
            this.transmitir(-1, 0, 1, f, c-1, newcounter[1], state);
            this.transmitir(-1, -1, 2, f-1, c-1, newcounter[2], state);
        }
        return false;
    }

    transmitir(incx, incy, index, f, c, valor, state) {
        if (f < this.nfilas && c < this.nfilas && f >= 0 && c >= 0) {
            const pos = this.board[f][c];
            if (pos.state == state) {
                console.log("("+f+","+c+")");
                pos.counter[index] = valor;
                //console.log(pos.counter);
                this.transmitir(incx, incy, index, f + incy, c + incx, valor, state);
            }
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
                const vector = [0, 0, 0, 0];
                const ficha = new PosicionTablero(i, j, 0, vector);
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
                    //console.log("clase de la ficha: " + imagen.className);
                    this.onpointerenter = NaN;
                    this.onpointerleave = NaN;
                    this.innerHTML = "";
                    this.onclick = NaN;
                    const f = this.closest('tr').rowIndex;
                    const c = this.cellIndex;
                    const gano = this.par.fijarposicion(1, f, c);
                    //console.log("(" + f + "," + c + ") = " + this.par.board[f][c].counter[]);
                    //console.log("(1,2): " + this.par.board[1][2].counter[3]);
                    this.appendChild(imagen);
                    if (gano) {
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