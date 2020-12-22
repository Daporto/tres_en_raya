class PosicionTablero{
    constructor(fila,columna,state,counter){
        this.fila = fila;
        this.columna = columna;
        this.state = state;
        this.counter = counter; //counter[0]=up, counter[1] = right, counter[2] = down, counter[3] = left
    }
}