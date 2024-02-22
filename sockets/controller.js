import { TicketControl } from "../models/ticket-control.js";


const ticketControl = new TicketControl();

export const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //TODO: Notificar un nuevo Ticket a asignar
    
    });

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets por atender'
            });
        }else{
            callback({
                ok: true,
                ticket,
                msg: ticket
            });
        }
    });
}