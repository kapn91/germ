const {app, remote} = require('electron').remote
const path = require('path');
const url = require('url');

var germination = {
  //check for data
  //get data
  //load data
  init(){
    germination.calendar.gatherDate();
    germination.data.checkData();
    germination.data.getData();
    germination.data.getKey(germination.data.latest);
    germination.view.loadSeason();
    germination.view.loadContent();
  },

  createNewSeason(){
    console.log('createNewSeason');
  },

  loadExistingSeason(){
    console.log('loadExistingSeason');
  },

  createNewPlant(){
    console.log('createNewPlant');
  }

}
