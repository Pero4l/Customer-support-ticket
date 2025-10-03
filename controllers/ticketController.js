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

    const id = data['complains'].length + 1;
    const currentUser = user.currentUser
    const date = new Date().toLocaleDateString('en-CA');
    const email = user.userEmail
    const status = "Pending"


    const newTicket = {id, currentUser, email, title, complain, status, date}

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

module.exports={createTickt, seeAllTicket}