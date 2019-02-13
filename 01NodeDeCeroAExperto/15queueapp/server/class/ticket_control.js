const fs = require('fs');

class Ticket {
    constructor(number, desk){
        this.number = number,
        this.desk = desk
    }
}

class TicketControl{
    constructor(){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if( data.today === this.today){
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.RestartCount();
        }

        console.log(data);
    }

    next() {
        this.last += 1;
        
        let ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        this.SaveFile();
        console.log('se actualizo el último');

        return `Ticket ${this.last}`;
    }

    GetLastTicket(){
        return `Ticket ${this.last}`;
    }

    GetLast4(){
        console.log('last4 ---', this.last4)
        return this.last4;
    }

    RespondTicket(desk){
        if(this.tickets.length > 0){
            let numberTicket = this.tickets[0].number;
            this.tickets.shift();

            let respondTicket = new Ticket(numberTicket, desk);

            this.last4.unshift(respondTicket);

            if(this.last4.length > 4){
                this.last4.splice(-1, 1);
            }

            this.SaveFile();

            return respondTicket;
        }
        else{
            return 'no hay tickets';
        }
    }

    SaveFile() {
        let data = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }

        let strData = JSON.stringify(data);

        fs.writeFileSync('./server/data/data.json', strData);
    }

    RestartCount() {
        this.last = 0;
        this.SaveFile();
        this.tickets = [];
        this.last4 = [];
        console.log('cola reiniciada')
    }
}

module.exports = {
    TicketControl
}