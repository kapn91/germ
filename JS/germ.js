const {app, remote, dialog} = require('electron').remote
const path = require('path');
const url = require('url');

var germination = {

  //initialize germ application
  init(){
    germination.calendar.gatherDate();
    germination.data.checkData();
    germination.data.getData();
    germination.data.getKey(germination.data.latest);
    germination.view.loadSeason();
    germination.view.loadContent();
    germination.view.startUp();
    germination.events.addListener();
  }

}
