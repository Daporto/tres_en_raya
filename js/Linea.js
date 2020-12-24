class Linea {
    constructor(direccion, lista, partida) {
        this.direccion = direccion;
        this.lista = lista;
        this.partida = partida;
        switch (this.direccion) {
            case 0:
                this.incx = [0, 0];
                this.incy = [-1, 1];
                break;
            case 1:
                this.incx = [-1, 1];
                this.incy = [0, 0];
                break;
            case 2:
                this.incx = [-1, 1];
                this.incy = [-1, 1];
                break;
            case 3:
                this.incx = [1, -1];
                this.incy = [-1, 1];
                break;
        }
    }

    ingresarposicion(pos) {
        this.lista[this.lista.length] = pos;
    }

    añadirposicion() {
        if (this.puedecompletarse()) {
            const pos1 = this.lista[this.lista.length-1];
            const pos2 = this.lista[0];
            if(this.partida.board[pos1[0]+this.incy[0]][pos1[1]+this.incx[0]]){
                
            }
        } else {
            return false;
        }
    }

    puedecompletarse() {
        const f = this.lista[this.lista.length - 1][0];
        const c = this.lista[this.lista.length - 1][1];
        const cantdisp1 = this.disponibles(f - this.incy[0], c+this.incx[0], this.incx[0], this.incy[0], 0) + this.disponibles(f + this.incy[1], c + this.incx[1], this.incx[1], this.incy[1], 0) + 1;
        if (cantdisp1 >= this.partida.filasganar) {
            return true;
        }
    }

    disponibles(f, c, incx, incy, sum) {
        const pos = this.partida.board[f][c];
        if (pos.state = 1 || f < 0 || c < 0 || f == this.partida.nfilas || c == this.partida.nfilas) {
            return sum;
        } else {
            return this.disponibles(f + incy, c + incx, incx, incy, sum + 1);
        }
    }
}