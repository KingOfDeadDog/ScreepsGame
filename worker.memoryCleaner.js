/*
 * Cleans the memory of dead creeps
 *
 * You can import it from another modules like this:
 * var mod = require('worker.memoryCleaner');
 * mod.thing == 'a thing'; // true
 */

var memoryCleaner = {
    clean: function() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    } 
};

module.exports = memoryCleaner;