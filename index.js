const express = require('express')
const app = express()
app.use(express.json())

const userAuth = require('./router/user.route')


app.get('/',(req,res)=>{
    return res.status(200).json({
        "success": true,
        "message": "WELLCOME TO PTB CUSTOMER SUPPORT"
    })
})

app.use('/auth',userAuth)


const PORT = 4001
app.listen(PORT, ()=>{
    console.log(`Server running on PORT:${PORT}`);
    
})