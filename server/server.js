const express= require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const app= express();
const dotenv= require('dotenv');
const cors= require('cors');

dotenv.config();
const port = 3000 || process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecommerce'

});

db.connect((err)=>{
    if(err){
        console.error('Error connectingg to the database:', err);
        return;
    }
    console.log('connected to the database');
});

//login functionality

app.post('/api/admin/login', (req, res) => {

    const {username, password}= req.body;
    if(!username || !password){
        return res.status(400).json({
            message:"username and password are required"
        });
    }

    const query ="select * from admin where username=?";
    db.query(query,[username],async(err, result)=>{
        if(err){
            return res.status(500).json({
                message:'internal server error',
                error:err.message
            })
        }
        if (result.length==0){
            return res.status(401).json({
                message:'invalid credentials'
            })
        }
        const admin= result[0];
        if(admin.password !== password){
            return res.status(401).json({
                message:'invalid credentials'
            })
        }
        //generate token and send response
        const token = jwt.sign({id:admin.id,username:admin.username},JWT_SECRET,{
            expiresIn:'1h'
});
        res.json({
            message:'login sucessfull',
            token,
            user:{
                id:admin.id,
                username:admin.username,
                
            }
        })
    })


});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
