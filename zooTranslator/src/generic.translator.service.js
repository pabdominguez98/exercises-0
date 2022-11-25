'use strict'

/**
 * Class To translate generic animals languages
 */
class GenericZooTranslator {

    /**
     * 
     * @param {String} animalSound Constructor receives the language spec of each animal Instance
     */
    constructor(animalSound){
        this.animalSound = animalSound;
    }

    /**
     * This method generates the phrase with the Animal instance language.
     * @param {String} phrase Phrase to translate in the instance-
     * @returns {String} Returns the translated phrase
     */
    speak = (phrase) => {
        const phraseSliced = phrase.split(' ');
        let translatedPhrase = '';
        phraseSliced.forEach(i => {
            translatedPhrase = translatedPhrase + `${i} ${this.animalSound} `;
        });
        return translatedPhrase;
    }   
}

module.exports = GenericZooTranslator;