require('dotenv').config();
require('skyapm-nodejs').start({
    serviceName: process.env.SERVICE_NAME,
    directServers: '10.153.100.81:11800'
});

const express = require('express');
const cors = require('cors');

const connectDB = require('./data/connect');
const configPassport = require('./authentication/passport');
const configRoute = require('./routes');

const app = express();

// Connect Database
connectDB();

// request body parser
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// cross origin resource sharing
var whitelist = [ process.env.REACT_APP_CLIENT_HOST, 'http://localhost:3000', 'https://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));


configPassport(app);
configRoute(app);

app.use('/testapi', (req, res) => res.status(200).json({ msg: 'api working' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
