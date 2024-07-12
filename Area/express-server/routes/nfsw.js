const express = require('express');
const router = express.Router();

const http = require("https");
const res = NaN;

//find porn actor

const options = {
	"method": "GET",
	"hostname": "findpornface-find-porn-face-v1.p.rapidapi.com",
	"port": null,
	"path": "/search?q=lanarhoades&searchInNickNames=true&fields=photos",
	"headers": {
		"x-rapidapi-host": "findpornface-find-porn-face-v1.p.rapidapi.com",
		"x-rapidapi-key": "de267f6e9amshc2a705e491230ebp1de5d6jsnf73a10dee2bc",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
        const json = JSON.parse(body);
        // console.log(json.data[0].photos[0].full);
	});
});

req.end();

//GIFF
var random;
var max = 20
function findRandom() {
  random = Math.floor(Math.random() * max)
  return random;
}

const miakhalifa = {
	"method": "GET",
	"hostname": "porn-gifs.p.rapidapi.com",
	"port": null,
	"path": "/miakhalifa",
	"headers": {
		"x-rapidapi-host": "porn-gifs.p.rapidapi.com",
		"x-rapidapi-key": "de267f6e9amshc2a705e491230ebp1de5d6jsnf73a10dee2bc",
		"useQueryString": true
	}
};

router.get('/test', (req, res) => {
	const miakhalifa_req = http.request(miakhalifa, function (result) {
		const chunks = [];
		result.on("data", function (chunk) {
			chunks.push(chunk);
		});
		result.on("end", function () {
			const body = Buffer.concat(chunks);
			random = findRandom();
			const json = JSON.parse(body);
			res.status(200).send({url: json[random].url});
		});
	});
	miakhalifa_req.end();
});

router.get('/gif'), (req, res) => {
	const miakhalifa_req = http.request(miakhalifa, function (res) {
		const chunks = [];
		res.on("data", function (chunk) {
			chunks.push(chunk);
		});
		res.on("end", function () {
			const body = Buffer.concat(chunks);
			random = findRandom();
			const json = JSON.parse(body);
			console.log(json[random].url);
			res = json[random].url;
			res.send(res);
		});
	});
	
	miakhalifa_req.end();
}

// nfsw add image https://rapidapi.com/inferdo/api/nsfw-image-classification1/
// const option = {
// 	"method": "POST",
// 	"hostname": "nsfw-image-classification1.p.rapidapi.com",
// 	"port": null,
// 	"path": "/img/nsfw",
// 	"headers": {
// 		"content-type": "application/json",
// 		"x-rapidapi-host": "nsfw-image-classification1.p.rapidapi.com",
// 		"x-rapidapi-key": "de267f6e9amshc2a705e491230ebp1de5d6jsnf73a10dee2bc",
// 		"useQueryString": true
// 	}
// };

// const req = http.request(option, function (res) {
// 	const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		const body = Buffer.concat(chunks);
// 		// console.log(body.toString());
// 	});
// });

// req.write(JSON.stringify({url: 'https://www.inferdo.com/img/nsfw-1-raw.jpg'}));
// req.end();

module.exports = router;