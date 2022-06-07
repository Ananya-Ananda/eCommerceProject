var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

api_key = process.env.apiKey

router.get('/', async (req, res, next) => {
  const url = "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=" + api_key;
  console.log(url);
  await fetch(url)
  .catch((err) => console.log(err))
  .then((res) => res.json())
  .then(data => res.status(200).json(data))

})

module.exports = router;