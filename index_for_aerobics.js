const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
var csvWriter = require('csv-write-stream')
var writer = csvWriter({sendHeaders: false})
writer.pipe(fs.createWriteStream('out.csv'))

function scrapeData (url) {
const options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};
rp(options)
    .then(($) => {
        let name = $('.page-title').text().trim();
        let utility = $(' div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
        let mechanics = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
        let force = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim();
        let instructionPreparation = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(6)').text().trim().replace(',','HEPEK');;
        let instructionExecution = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(8)').text().trim().replace(',','HEPEK');;
        let commentsRaw = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(10)').text().trim().replace(',','HEPEK');
        let commentsRich = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(10)').html().replace(',','HEPEK');;
        let forceDynamic = $(' div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(4)').html();

        let muscleTarget = 'N/A';
        let muscleSynergists = 'N/A'
        let muscleAntagonistStabilizers = 'N/A'
        let muscleStabilizers = 'N/A'
        let muscleDynamicStabilizers = 'N/A'
        writer.write({name,url,utility,mechanics,force, instructionPreparation, instructionExecution, commentsRaw, commentsRich,muscleTarget, muscleSynergists,muscleDynamicStabilizers, muscleStabilizers, muscleAntagonistStabilizers, forceDynamic,utility});
        console.log('Writing:' + name);
    
    })
    .catch((err) => {
        console.log(err);
    });
}

const links = [
    'https://www.exrx.net/WeightExercises/Other/BalanceBoardSquat',
    'https://www.exrx.net/WeightExercises/Other/BBTurkishGetUp',
    'https://www.exrx.net/WeightExercises/Power/CBPushPull',
    'https://www.exrx.net/Plyometrics/ClapPushUp',
    'https://www.exrx.net/Plyometrics/DepthPushUp',
    'https://www.exrx.net/WeightExercises/OlympicLifts/HangClean',
    'https://www.exrx.net/Aerobic/Exercises/JumpRopeSingleLegHop',
    'https://www.exrx.net/Aerobic/Exercises/JumpRopeSingleLegCrissCross',
    'https://www.exrx.net/Aerobic/Exercises/JumpRopeToeTap',
    'https://www.exrx.net/WeightExercises/OlympicLifts/JumpShrug',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBAlternatingSwingCatch',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBAlternatingSwingFlipCatch',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBBentKneeWindmill',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBCleanAndJerk',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBDeadlift',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBFarmersWalk',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBFrontSquat',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBOverheadRearLunge',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBOverheadSplitSquat',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBSnatch',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBSwing',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBTwoArmOverheadSwing',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBTwoArmSwing',
    'https://www.exrx.net/WeightExercises/Kettlebell/KBWindmill',
    'https://www.exrx.net/WeightExercises/Power/LVOneArmJam',
    'https://www.exrx.net/Plyometrics/MBSitUp',
    'https://www.exrx.net/Plyometrics/MBStandingTwist',
    'https://www.exrx.net/Aerobic/Exercises/MiniTramp',
    'https://www.exrx.net/WeightExercises/OlympicLifts/PushPress',
    'https://www.exrx.net/WeightExercises/Power/RMSeatedVerticalPull',
    'https://www.exrx.net/Aerobic/Exercises/SkateMachine',
    'https://www.exrx.net/Aerobic/Exercises/SkiMachRails',
    'https://www.exrx.net/Aerobic/Exercises/LVStairClimber',
    'https://www.exrx.net/Aerobic/Exercises/TreadmillWalk',
    'https://www.exrx.net/Aerobic/Exercises/TreadmillWorkStationWalk',
]


links.forEach(element => {
    scrapeData(element);
});