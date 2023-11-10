import express from 'express';
const app = express();
const PORT = 5000;

app.get('/',function(req,res){
    res.send("your server is ready!");
});
app.listen(5000,function(){
    console.log(`Server listening on port ${PORT}...`);
})