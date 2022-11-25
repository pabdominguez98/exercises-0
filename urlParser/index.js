'use strict'
const urlParser = require('./src/urlParser.service');

const urlModel = "/:version/api/:collection/:id";

const urlString = "/6/api/listings/3?sort=desc&limit=10";

console.log(urlParser(urlModel, urlString));