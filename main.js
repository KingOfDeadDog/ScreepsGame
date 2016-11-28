//Theese are only run on global update and then cached
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var spawner = require('worker.spawner');

//This function is run every tick.
module.exports.loop = function () {
    //need this to measure how much my script cost
    var startCpu = Game.getUsedCpu();

    //Log so I know things are happening
    console.log();
    console.log(Game.time);

    //let all creeps do their thing. This is the first thing in main, because I thing it's high priarity and if anything else fails, all work is already done
    runRoles

    //Clean memory of dead creeps
    var memoryCleaner = require('worker.memoryCleaner');
    memoryCleaner.clean();

    //Spawn needed creeps        
    spawner.spawnNeeded();

    //try to stay in save mode
    if (Game.spawns['Spawn1'].room.safeMode == undefined && Game.spawns['Spawn1'].room.safeModeAvailable) {
        Game.spawns['Spawn1'].room.controller.activateSafeMode
    }

    console.log('CPU spent on Memory parsing:', Game.getUsedCpu() - startCpu);
}

console.log("Test");

//run roles from modules
function runRoles() {
    for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
        }
    }
}


var usedOnStart = 0;
usedOnStart = getUsedCpu();

function getUsedCpu() {
    return Game.rooms.sim ? performance.now() - usedOnStart : Game.getUsedCpu();
}