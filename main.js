//Log so I know things are happening
console.log();
console.log(Game.time);

//Clean memory
var memoryCleaner = require('worker.memoryCleaner');
memoryCleaner.clean(); 

//Spawn needed creeps
console.log(Game.time + ", spawning");
var spawner = require('worker.spawner');
spawner.spawnNeeded();   

//try to stay in save mode
if (Game.spawns['Spawn1'].room.safeMode == undefined && Game.spawns['Spawn1'].room.safeModeAvailable) {
    Game.spawns['Spawn1'].room.controller.activateSafeMode
}

//run roles from modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
