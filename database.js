const sql=require('mysql')

const con=sql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    port:'3307',
    database:'Sample1'
})

con.connect((err)=>{
    if(err){
        console.log('Connection failed',err)
    }
    else{
        console.log('Connection Successfull')
    }
})

module.exports=con;