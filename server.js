require('skyapm-nodejs').start({
    serviceName: 'api-server',
    directServers: '10.153.100.81:11800'
});

require('dotenv').config();
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
app.use(cors());

configPassport(app);
configRoute(app);

app.use('/testapi', (req, res) => res.status(200).json({ msg: 'api working' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
