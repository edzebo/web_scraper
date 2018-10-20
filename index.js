const rp = require('request-promise');
const cheerio = require('cheerio');
//load main page and get links
/*
const options = {
    uri: `https://www.exrx.net/Lists/ExList/NeckWt#Sternocleidomastoid`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  let links = [];
  rp(options)
  .then(($) => {
    $('a').each(function(i, elem) {
        links[i] = $(this).attr('href');
      });
      console.log(links);  
  })
  .catch((err) => {
    console.log(err);
  });

*/
const options = {
    //uri: `https://www.exrx.net/WeightExercises/Sternocleidomastoid/CBNeckFlx`,
    uri: `https://exrx.net/WeightExercises/LatissimusDorsi/CBCloseGripPulldown`,
    transform: function (body) {
        return cheerio.load(body);
    }
};
let links = [];
rp(options)
    .then(($) => {
        let name = $('.page-title').text();
        let utility = $(' div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
        let mechanics = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();
        let force = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
        let instructionPreparation = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(6)').text();
        let instructionExecution = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(8)').text();
        let commentsRaw = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(10)').text();
        let commentsRich = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(1) > p:nth-child(10)').html();
        let muscleTarget = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(4) > li').text().split(/(?<!\s)(?=[A-Z])/).join('&&');
        let muscleSynergists = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(6) > li').text().split(/(?<!\s)(?=[A-Z])/).join('&&');
        let muscleAntagonistStabilizers = 'N/A';
        let muscleStabilizers = 'N/A'
        let muscleDynamicStabilizers = 'N/A';
        let unknownData = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > p:nth-child(7)').text().trim();
        console.log('control: .' + unknownData + '.');
        /*
        if (unknownData == 'Dynamic Stabilizers') {
            muscleDynamicStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
        } else if (unknownData == 'Stabilizers') {
            muscleStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
        } else if (unknownData == 'Antagonist Stabilizers') {
            muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
        }
        */
        switch (unknownData) {
            case 'Dynamic Stabilizers':
                muscleDynamicStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text().trim();
                break;
            case 'Stabilizers':
                muscleStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
                break;
            case 'Antagonist Stabilizers':
                muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
                break;
            case 'Antagonist Stabilizers (see comment)':
                muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
                break;
        }
        let unknownData2 = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > p:nth-child(9)').text().trim();
        switch (unknownData2) {
            case 'Dynamic Stabilizers':
                muscleDynamicStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(10)').text().trim();
                break;
            case 'Stabilizers':
                muscleStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(10)').text();
                break;
            case 'Antagonist Stabilizers (see comment)':
                muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(10)').text();
                break;
        }
        let unknownData3 = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > p:nth-child(11)').text().trim();
        switch (unknownData3) {
            case 'Dynamic Stabilizers':
                muscleDynamicStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(12)').text().trim();
                break;
            case 'Stabilizers':
                muscleStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(12)').text();
                break;
            case 'Antagonist Stabilizers':
                muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(12)').text();
                break;
        }

        //NOT WORKING NEEDS ADITIONAL LOGIC  
        //  let muscleDynamicStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(8)').text();
        //  let muscleStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > p:nth-child(9) > a').text();
        //  let muscleAntagonistStabilizers = $('div.row > main > article:nth-child(2) > div > div > div:nth-child(2) > ul:nth-child(10) > li > a').text();

        console.log(name);
        console.log(utility);
        console.log(mechanics);
        console.log(force);
        console.log(instructionPreparation);
        console.log(instructionExecution);
        console.log(commentsRaw);
        console.log(commentsRich);
        console.log('taget:   ' + muscleTarget);
        console.log('synergist:  ' + muscleSynergists);
        console.log('dynamic stabilizers:  ' + muscleDynamicStabilizers);
        console.log('stabilizers:  ' + muscleStabilizers);
        console.log('antagnoist stabilizers:  ' + muscleAntagonistStabilizers);
    })
    .catch((err) => {
        console.log(err);
    });
