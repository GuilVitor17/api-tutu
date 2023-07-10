require('dotenv').config();
const bodyParser = require('body-parser')
const express = require("express");
const cors = require('cors');
const morgan = require('morgan')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) =>{
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "'GET', 'PUT', 'POST','DELETE'" );
   res.header("Access-Control-Allow-Headers", "'X-PINGOTHER','Content-Type', 'Authorization'")
   next();

})


require('./src/app/controllers')(app);
require('./src/app/uploads/routes')(app);
require('./src/app/Dados/routes')(app);
require('./src/app/BlogPessoal/Blogrouter')(app);
require('./src/app/Quiz/quiz')(app);
require('./src/app/Tarefas/tarefas')(app);
require('./src/app/Sonhos/sonhos')(app);
require('./src/app/Sonhos/sonhosLongo')(app);
require('./src/app/Sonhos/sonhosMedio')(app);
require('./src/app/Gateway/router')(app);
require('./src/app/Gateway/curso/router')(app);


const port = process.env.PORT || 3005;

 
 app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
 })

