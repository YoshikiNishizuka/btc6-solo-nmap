const express = require('express');
const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());

const list = [
    'test',
    'nishizuka',
    'yoshiki'
]

app.use('/', express.static(__dirname + '/frontend/dist'))

app.get('/api/list', (req,res) => {
    res.json(list);
})

app.listen(PORT, ()=> {
    console.log(`server is working now. Port:${PORT}`)
})
