'use strict'
const _ = require('lodash');

/**
 * This function will return an object with the url request variables
 * @param {String} urlFormat URL format string to extract the route model
 * @param {*} urlString Request url
 * @returns {Object} Variables in the URL
 */

const urlParser = (urlFormat, urlString) => {

    if(_.isNil(urlFormat) || _.isNil(urlString)){
        throw new Error('Parameters Url format or url String missing')
    }

    if(urlString.split('?').length > 2){
        throw new Error('Url bad format, check the characters');
    }

    const checkQuery = extractQueryParams(urlString);

    const urlParams = checkForUrlParams(urlFormat, urlString);

    return {...urlParams, ...checkQuery}
    
}   

/**
 * Returns all the params values from the string url
 * @param {String} urlFormat URL format string to extract the route model
 * @param {String} urlString Request uri
 * @returns {Object} Object with key / values
 */
const checkForUrlParams = (urlFormat, urlString) => {
    
    const urlParts = urlFormat.split('/');

    const varsData = urlParts.map((i, index) => {
        if(i.slice(0, 1) === ':'){
            return {
                variable: i,
                position: index
            }
        }
    }).filter(i => i !== undefined);

    if(_.isEmpty(varsData)) return {};

    const urlStringParams = urlString.split('?').length > 1 ? urlString.split('?')[0].split('/') : urlString.split('/');

    const finalVariables = {};

    varsData.forEach(i => {
        finalVariables[i['variable'].split(':').join('')] = urlStringParams[i['position']];
    })

    return finalVariables;
}

/**
 * Function returns all the values in the query side of the url
 * @param {String} urlString Url string
 * @returns {Object} Object with key / values
 */
const extractQueryParams = (urlString) => {
    const querySliced = urlString.split('?');

    if(querySliced.length === 0) return {};

    if(_.isEmpty(querySliced[1])) return {};

    let finalVariables = {}

    querySliced[1].split('&').forEach(i => {
        let keyValue = i.split('=');
        if(_.isNil(keyValue[1])) return;
        finalVariables[keyValue[0]] = keyValue[1]; 
    });

    return finalVariables;
}

module.exports = urlParser;