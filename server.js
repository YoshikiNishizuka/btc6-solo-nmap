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

const list = [
    'test',
    'nishizuka',
    'yoshiki'
]

// const TOILETTES_TABLE = 'toilettes';

app.use('/', express.static(__dirname + '/frontend/dist'))

// app.get('/api/list', (req,res) => {
//     res.json(list);
// });

app.post('/api/list',(req,res)=> {
  const body = req.body;
  console.log(body)
  
  // list.push(req.body)
  // res.send(list)
  res.end()
});
app.get('/api/list', async (req,res) => {
    const lists = await db('toilettes')
    .select('id','name','latitude as lat','longitude as lng','address')
    .catch((err)=> {
        console.log(err);
    });
    // const result = lists.map((ele)=> ele.name)
    // console.log(lists)
    res.send(lists)
});

app.listen(PORT, ()=> {
    console.log(`server is working now. Port:${PORT}`)
});
