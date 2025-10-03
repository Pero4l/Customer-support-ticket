const express = require('express')
const router = express.Router()

const{createTickt, seeAllTicket, responds} = require('../controllers/ticketController')
const{authMiddleware} = require('../middleware/authUserMiddleware')
const{isAdmin} = require('../middleware/authAdmin')



router.post('/complain', authMiddleware, createTickt)
router.get('/allticket', authMiddleware, isAdmin, seeAllTicket)
router.post('/resolve', authMiddleware, isAdmin, responds)



module.exports = router