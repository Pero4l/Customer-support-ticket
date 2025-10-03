const express = require('express')
const router = express.Router()

const{createTickt} = require('../controllers/ticketController')
const{authMiddleware} = require('../middleware/authUserMiddleware')



router.post('/complain', authMiddleware, createTickt)



module.exports = router