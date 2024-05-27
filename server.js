const express = require('express');
const app = express()
const db = require('./db');
const PORT = process.env.PORT || 3000;
app.use(express.json());

const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, access_token"
    );
  
    // intercept OPTIONS method
    if ("OPTIONS" === req.method) {
      res.send(200);
    } else {
      next();
    }
  };
  app.use(allowCrossDomain);

// app.use('/', express.static(__dirname + '/frontend/dist'))
app.use('/', express.static('https://github.com/YoshikiNishizuka/btc6-solo-nmap/tree/main/frontend/dist'))

app.post('/api/list',async (req,res)=> {
  const body = req.body;
  console.log(body)
  const lists = await db('toilettes')
  .insert({
    name:body.name,
    address:body.address,
    latitude:body.latitude,
    longitude:body.longitude
  })
  res.end
});

app.get('/api/list', async (req,res) => {
    const lists = await db('toilettes')
    .select('id','name','latitude as lat','longitude as lng','address')
    .catch((err)=> {
        console.log(err);
    });
    res.send(lists)
});


app.listen(PORT, ()=> {
    console.log(`server is working now. Port:${PORT}`)
});
