const express = require('express')
const router = express.Router()

const{createTickt, seeAllTicket} = require('../controllers/ticketController')
const{authMiddleware} = require('../middleware/authUserMiddleware')
const{isAdmin} = require('../middleware/authAdmin')



router.post('/complain', authMiddleware, createTickt)
router.get('/allticket', authMiddleware, isAdmin, seeAllTicket)



module.exports = router