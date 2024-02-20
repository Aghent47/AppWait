
export class TicketControl {

    constructor(){

        this.ultimo     = 0;
        this.hoy        = new Date().getDate();
        this.tickets    = [];
        this.ultimos4   = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimo,   
        }
    }

    init(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.guardarDB();
    }

    guardarDB(){

    }

}