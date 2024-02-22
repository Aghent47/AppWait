import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

import data from '../db/data.json' assert { type: "json" };

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;  
    }

}

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
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { ultimo, hoy, tickets, ultimos4 } = data;

        console.log('Se ha inicializado el sistema');

        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // es otro día!!
            this.guardarDB();
        }   
    }

    guardarDB() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const dbPath = path.join(__dirname, '../db/data.json');

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(4);
        }

        // console.log(this.ultimos4);
        this.guardarDB();
        return ticket;
    }

}
