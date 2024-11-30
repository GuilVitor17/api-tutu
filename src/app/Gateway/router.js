const express = require('express');

const router = express.Router();


const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.ID_CLIENT_PAYPAL,
    'client_secret': process.env.ID_SECRETE_PAYPAL
  });


  

  router.get('/', (req, res) =>{

   return res.sendFile(__dirname + "/index.html")

  })


  router.post('/pay', (req, res) =>{

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/perfil/curso/aulas/check/success",
            "cancel_url": "http://localhost:3000/perfil/curso/aulas/check/cancel"
        },

        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Redhock Bar Soap",
                    "sku": "001",
                    "price": "0.01",
                    "currency": "BRL",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "BRL",
                "total": 0.01
            },
            "description": "Washing Bar soap"
        }]
    };

    

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.json({forwardLink: payment.links[i].href});
            }
          }
      }
    });

    
    

  });


  router.get('/success', async (req, res) => {



    try {

      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const cart = req.cart
  
      

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "BRL",
              "total": 0.01
          }
      }]

    };
  
  // Obtains the transaction details from paypal
   await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
      if (error){
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.sendFile(__dirname + "/routerCurso/index.html");
          console.log(payment)
          // return res.status.json(payment)

      }



  });


      
    } catch (error) {

      console.log(error)
      
    }

    


  });



  router.get('/cancel', (req, res) => res.send('Cancelled'));


  module.exports = app => app.use('/pagamento', router)
