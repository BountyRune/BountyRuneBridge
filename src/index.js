const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const Match = require('./model/Match');
const cors = require('cors');
// This class if for testing purposes only
const MockMatch = require('./model/MockMatch');

const app = express();

app
	.use(bodyParser.urlencoded({
  extended: false,
}))
	.use(bodyParser.json())
	.use(cors());

app.get('/result/dota/:id', (req, res) => {
	const {id} = req.params;
	axios.get(`https://api.opendota.com/api/matches/${id}`)
		.then(x => {
			const currentMatch = new Match({...x.data});
			res.send({...currentMatch.info});
		})
})

// for testing purposes only
// this endpoint will always give unfinished match 
app.get('/result/dota/:id/dev', (req, res) => {
	const {id} = req.params;
	axios.get(`https://api.opendota.com/api/matches/${id}`)
		.then(x => {
			const currentMatch = new MockMatch({...x.data});
			res.send({...currentMatch.info});
		})
})

app.listen(process.env.PORT || 3003, () => console.log('listening on 3003'));
