//https://developers.amadeus.com/self-service/category/air/api-doc/airport-and-city-search/api-reference
// const express = require('express');
import express from 'express';
// const cors = require('cors');
import cors from 'cors';
const app = express();
// const axios = require('axios');
import axios from 'axios'

// let duffel = require('../index.mjs')
import {offers,requests} from '../index.mjs';

const access_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODgyNzJkNzE1MGI3N2UwYTZhMDVjZTEzNWRmZTA3NjQwNzU3NDBhMzg5MzU0ZjljMGY1NmY1NDgxODBlMmMyYzAzZDY0ZWU2NDA3YzRlMTAiLCJpYXQiOjE2NDgzNjIwMzIsIm5iZiI6MTY0ODM2MjAzMiwiZXhwIjoxNjc5ODk4MDMxLCJzdWIiOiIxNzg0Iiwic2NvcGVzIjpbXX0.PR9tELdbalmwn8CA0z8f1maprUc-2AUfn-BS6ZN5JREcxgPUZ3WIg21lwQJuxg-e9JqUVQM6X5iqQifobZYsdQ"


const corsOptions = {
    origin : "http://localhost:3000"
}
app.use(cors(corsOptions))

app.get('/offerRequest', async function(req,res){
    console.log(req.query)
    let request = req.query
    let slice = await requests(request.from,request.to,request.depart,request.Return);
    const offer = await offers(slice.data.id);
    res.send(offer)
    res.end();

    }
)

app.get('/iata', function(req,res){
    console.log(req.query.iata);
    let city_iata = req.query.iata
    if(city_iata.length === 3){
        console.log("request received!!")
        axios({
          url : "https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword="+city_iata+"&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL",
          headers : {Authorization : "Bearer 3AgDmTkz4TK0m9K1IjQ308FRP281"}
    })
    .then((response) => {res.send(response.data)})
    }

})

var server = app.listen(4001,() => console.log('Life on port 4001'))