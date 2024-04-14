import express from 'express';
import bodyParser from 'body-parser';
import distance from '@turf/distance';
import {  point } from '@turf/turf';
import destination from "@turf/destination";
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

  
  

app.get('/provide-random-point-within-km', (req,res)=> {

    const inputPoint = point(JSON.parse(Object(req.query.point)));
    const distanceKm = Math.random()
    const bearing = Math.floor(Math.random() * (180 - (-180) ) + (-180));
    var dest = destination(inputPoint, distanceKm, bearing, {"units": 'kilometers'});
    res.send(dest);
});

app.get('/points-within-radius', (req,res)=> {
    console.log(req.query.fromPoint)
    console.log(req.query.toPoint)
    const fromPoint = point(JSON.parse(Object(req.query.fromPoint)));
    const toPoint = point(JSON.parse(Object(req.query.toPoint)));
    const expectedRadius = Number(req.query.radius);
    const result = distance(fromPoint, toPoint,{"units": 'kilometers'}) <= expectedRadius
    res.send(result);

 

});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});