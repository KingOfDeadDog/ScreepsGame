/*
 * contains logic for spawning new creeps
 *
 * You can import it from another modules like this:
 * var mod = require('worker.spawner');
 * mod.thing == 'a thing'; // true
 */
var myRoom = Game.spawns['Spawn1'].room

var spawner = {
    spawnNeeded: function() {
        //Try to always have enough harvesters
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //I want 2 harvesters per energy source, so find available sources
        var sources = myRoom.find(FIND_SOURCES_ACTIVE);
        console.log("myRoom.memory.lastSource: " +  myRoom.memory.lastSource)
        console.log("Harvesters " + harvesters.length)
        console.log("sources.length:" + sources.length)
        console.log("energy count:" + Game.spawns['Spawn1'].energy)
        console.log("Should create harvester?:" + harvesters.length < (sources.length * 2) && Game.spawns['Spawn1'].energy >= 200)
        if (harvesters.length < (sources.length * 2) && Game.spawns['Spawn1'].energy >= 200) {
            /*if (myRoom.memory.lastSource == null) {
                myRoom.memory.lastSource = 0;
            }
            else {
                myRoom.memory.lastSource = myRoom.memory.lastSource + 1;
                if (myRoom.memory.lastSource > sources.length - 1) {
                    myRoom.memory.lastSource = 0;
                }
            }
            //var currentSourceId = sources[myRoom.memory.lastSource].id;
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], null , {role:"harvester", source: sources[myRoom.memory.lastSource].id});
            */
        }
        
        //only try to spawn other creeps when I have enough harvesters
        if (harvesters.length = (sources.length * 2)) {
            //Try to always have enough upgraders
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            //I want 2 upgraders per controller. I thing there can be only one controller per room, so 2 as constant?
            //Only for now as I am keeping to one room
            if (upgraders.length < 2 && Game.spawns['Spawn1'].energy >= 200) {
                Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], null , {role:"upgrader"});
            }
        }
    }
    
    
};

module.exports = spawner;