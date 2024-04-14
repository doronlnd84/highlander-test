"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const distance_1 = __importDefault(require("@turf/distance"));
const turf_1 = require("@turf/turf");
const destination_1 = __importDefault(require("@turf/destination"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.get('/provide-random-point-within-km', (req, res) => {
    const inputPoint = (0, turf_1.point)(JSON.parse(Object(req.query.point)));
    const distanceKm = Math.random();
    const bearing = Math.floor(Math.random() * (180 - (-180)) + (-180));
    var dest = (0, destination_1.default)(inputPoint, distanceKm, bearing, { "units": 'kilometers' });
    res.send(dest);
});
app.get('/points-within-radius', (req, res) => {
    console.log(req.query.fromPoint);
    console.log(req.query.toPoint);
    const fromPoint = (0, turf_1.point)(JSON.parse(Object(req.query.fromPoint)));
    const toPoint = (0, turf_1.point)(JSON.parse(Object(req.query.toPoint)));
    const expectedRadius = Number(req.query.radius);
    const result = (0, distance_1.default)(fromPoint, toPoint, { "units": 'kilometers' }) <= expectedRadius;
    res.send(result);
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map