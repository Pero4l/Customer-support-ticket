const {readDb, writeDb} = require('../utils/dbOperation')

async function createTickt(req, res) {
    const{title,complain} = req.body

    const data = readDb()

    if(!complain || ! title){
        return res.status(400).json({
            "success": false,
            "message": "All fields are required"
        })
    }

    const ticketExist = data['complains'].find((c)=> c.title === title || c.complain === complain)

    if(ticketExist){
        return res.status(400).json({
            "success": false,
            "message": "Ticket already exist"
        })
    }


    const user = req.user

    const ticketId = data['complains'].length + 1;
    const currentUser = user.currentUser
    const date = new Date().toLocaleDateString('en-CA');
    const email = user.userEmail
    const status = "Pending"
    const userId = user.userId


    const newTicket = {ticketId, userId, currentUser, email, title, complain, status, date}

     const theUser = data['users'].find((u)=> u.id === user.userId)

    theUser['notifications'].push({notification:`Complain submitted successfully at ${date}`})
    data['users'][0].notifications.push({notification:`A new complain form user:${currentUser} was submitted at ${date}`})

    data['complains'].push(newTicket)
    writeDb(data)

    res.status(201).json({ 
        "success" : true,
        "message": "Complain submitted successfully",
        "data": newTicket
    });

}


async function seeAllTicket(req, res) {
     const data = readDb()
    const allTicket = data['complains']

    res.status(200).json({
        "success": true,
        "message": "Gotten all tickets successfully",
        "data": allTicket
    })
    
}


async function responds(req, res) {
    const {id, check} = req.body;
    const data = readDb();

    const ticketExist = data['complains'].find((c) => c.ticketId === id);

    if (!ticketExist) {
        return res.status(404).json({
            "success": false,
            "message": "Ticket not found",
        });
    }

    if(check === true){
        ticketExist.status = "Processed";
    }else{
         ticketExist.status = "Pending";
    }
    
    const theUser = data['users'].find((u) => u.id === ticketExist.userId);

    res.status(200).json({
        "success": true,
        "message": "Complain processed successfully",
        "data": ticketExist
    });

    const date = new Date().toLocaleDateString('en-CA');
    const name = ticketExist.title;

    data['users'][0].notifications.push({notification: `Complain ${name} with id:${ticketExist.ticketId} by ${ticketExist.userId} has been processed successfully on the ${date}`});

    if (theUser) {
        theUser.notifications.push({notification: `Your complain of ${name} has been processed successfully on the ${date}`});
    }

    writeDb(data);
}

module.exports={createTickt, seeAllTicket, responds}