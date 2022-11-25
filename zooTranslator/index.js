'use strict'

const GenericTranslator = require('./src/generic.translator.service');

const lion = new GenericTranslator('roar');
const tiger = new GenericTranslator('grrr');

console.log(lion.speak("I'm a lion"));

console.log(tiger.speak("Lions suck"));