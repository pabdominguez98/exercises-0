'use strict'
const fs = require('fs');
const path = require('path');

const __logFolderName = 'log';  //We could extract the name of the folder and set it externally.

const __timerDelay = 10;        // Timer delay in minutes;

let __tmpErrorCount = 0;
let __timerStatus = false;

let logFullError = process.env.LOG_HARD_ERR || true;  // Decides if the log is the whole error object or just the error message
let logErrorInConsole = process.env.LOG_ERR_CONSOLE || false; // Decides if the log is the whole error object or just the error message

/**
 * Log Error
 * @param {Error} err Error Object.
 * @returns {VoidFunction} The functions does not return data.
 */
const logError = (errorData) => {
    
    startInspector();

    const errorMessage = errorMessageConstructor(errorData);

    if(!fs.existsSync(path.resolve(__dirname, `../${__logFolderName}`))){
        try{
            fs.mkdirSync(path.resolve(__dirname, `../${__logFolderName}`));
        }catch(err){
            throw new Error(err); // We can't use logError function here :(
        }     
    }

    fs.appendFile(path.resolve(__dirname, `../${__logFolderName}/error.log.txt`), new Date().toUTCString() + ': ' + errorMessage + '\n', (err) =>{
        if(err){
            console.error(new Error(err))
        }
    });

    logErrorInConsole && console.error(err);

    if(__tmpErrorCount >= 10){
        __tmpErrorCount = 0;
        console.log("SENDING MAIL REPORT");  // Here we can set functions or external modules to send our Alert Email!
    }

}

/**
 * Starts the Auditor Timer
 */
const startInspector = () => {
    if(!__timerStatus){
        setTimeout(() => {
            __timerStatus = false;
            __tmpErrorCount = 0;
        }, parseInt(__timerDelay * 60000));
    }
    __timerStatus = true;
    __tmpErrorCount++;
}

/**
 * Error message Formatter
 * @param {Error} err Error Object
 * @returns {String | Object} Returns the error object parsed to String or the error message;
 */
const errorMessageConstructor = (err) => {
    if(logFullError){
        return JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
    }
    return err.message.toString();
}


module.exports = logError;