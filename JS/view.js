const pl = document.getElementById('pl');
const seasonName = document.getElementById('seasonName');
const content = document.getElementById('content');
const data = document.getElementById('data');
const calendar = document.getElementById('calendar');
const plantData = document.getElementById('plantData');
const plantImg = document.getElementById('plantImg');
const author = document.getElementById('author');

germination.view = {

  //initializes start up animation
  startUp(){
    author.style.opacity = 1;
    author.style.transitionDelay = '4s';
    author.style.opacity = 0;
    setTimeout(function(){
      author.style.transitionDelay = '0s';
    }, 4);
  },

  //loads selected season
  loadSeason(season){
    germination.view.clearSection(pl);
    var latest = season? season:germination.data.latest;
    var season = document.createElement('h1');
    seasonName.id = 'season';
    seasonName.innerHTML = latest;
    pl.appendChild(seasonName);
    germination.view.loadPlants(latest);
  },

  //loads plants in season
  loadPlants(key){
    let storage = JSON.parse(localStorage.getItem(key));
    for(let prop in storage){
      if(prop === 'season'){ continue; }
      var div = document.createElement('div');
      var li = document.createElement('li');
      var button = document.createElement('button');
      var span = document.createElement('span');
      div.className = 'plant';
      button.innerHTML = 'X';
      button.className = 'remove';
      button.onclick = function(event){ germination.view.showMessage( 'plant', event.target.parentElement.childNodes[0].nodeValue.toLowerCase()), seasonName.innerHTML };
      li.innerHTML = prop;
      li.onclick = function(event){ if(event.target.tagName != 'BUTTON') {germination.events.changeActive()}};
      span.className = 'creation';
      span.innerHTML = 'created: ' +storage[prop].plantDate;
      if(pl.getElementsByTagName('li').length >= 1){
        for(let i=0; i<pl.getElementsByTagName('li').length; i++){
          if(new Date(storage[prop].plantDate).getTime() < new Date(storage[pl.getElementsByTagName('li')[i].childNodes[0].nodeValue.toLowerCase()].plantDate).getTime()){
            pl.insertBefore(div, pl.childNodes[i+1]);
            div.appendChild(li);
            li.appendChild(button);
            div.appendChild(span);
            continue;
          } else {
            pl.appendChild(div);
            div.appendChild(li);
            li.appendChild(button);
            div.appendChild(span);
            continue;
          }
        }
      } else {
      pl.appendChild(div);
      div.appendChild(li);
      li.appendChild(button);
      div.appendChild(span);
      }
    }
    germination.view.selectActive();
  },

  //makes the last plant in the season active by default
  selectActive(){
    let lastList = pl.getElementsByTagName('li')
    if(lastList.length != 0){
      lastList[lastList.length - 1].classList.add('active');
      germination.view.loadPlantData();
    } else {
      germination.view.clearSection(plantData);
    }
  },

  //loads the active plant data
  loadPlantData(){
    germination.view.clearSection(plantData);
    var active = document.getElementsByClassName('active')[0].childNodes[0].nodeValue.toLowerCase();
    var object = germination.data.getPlantData(seasonName.innerHTML, active);
    var ul = document.createElement('ul');
    var plantName = document.createElement('h2');
    var plantStatus = document.createElement('li');
    var plantDate = document.createElement('li');
    var harvestDate = document.createElement('li');
    var status = germination.view.loadPlantGrowthStage(object);
    var progressBar = germination.view.progressBar(object.plantDate, object.harvestDate);
    plantName.id = 'plantName';
    plantName.innerHTML = object.name;
    plantName.className = 'data';
    plantStatus.id = 'plantStatus';
    plantStatus.innerHTML = 'Plant Stage: '+status;
    plantStatus.className = 'data';
    plantDate.id = 'plantDate';
    plantDate.innerHTML = 'Plant Date: '+object.plantDate;
    plantDate.className = 'data';
    harvestDate.id = 'harvestDate';
    harvestDate.innerHTML = 'Harvest Date: '+object.harvestDate;
    harvestDate.className = 'data';
    ul.appendChild(plantName);
    ul.appendChild(progressBar);
    ul.appendChild(plantStatus);
    ul.appendChild(plantDate);
    ul.appendChild(harvestDate);
    plantData.appendChild(ul);
    germination.journal.createJournal(object);
    germination.view.progressMove();
  },

  //determines the growth stage of the plant
  loadPlantGrowthStage(plant){
    var plantDate = new Date(plant.plantDate).getTime();
    var date = germination.calendar.current.getTime();
    var germinationDate = ( plantDate + (86400000 * plant.germinationTime));
    var germinationWeek = germinationDate + (86400000 * 7);
    var harvestTime = (plantDate + (86400000 * (plant.harvestTime - 3)));
    var postHarvest = harvestTime + (86400000 * 10);
    var status;
    if(date > postHarvest){ status = 'dead'; return status; } else
    if(date > harvestTime){ status = 'harvest'; return status; } else
    if(date > germinationWeek){ status = 'growing'; return status; } else
    if(date > germinationDate){ status = 'sprout'; return status; }
    else { status = 'seed'; return status; }
  },

  //loads constant objects
  loadContent(){
    console.log('dataLoaded');
    console.log('graphLoaded');
    germination.journal.init()
    germination.calendar.createCalendar();

  },

  //creates a template for new season, load season, add plant, or edit
  createTemplate(id){
    if(data.style.display === 'none'){ return; }
    let el = id;
    switch(el) {
      case 'season':
        germination.season.createNewSeason();
        console.log('season');
      break;
      case 'load':
        germination.season.loadExistingSeasonTemplate();
        console.log('load');
      break;
      case 'add':
        germination.plant.createNewPlant();
        console.log('add');
      break;
      case 'edit':
        germination.plant.editPlant();
      default:
        germination.plant.createNewPlant();
      break;
    }
  },

  //removes template and displays data again
  removeTemplate(object){
    var parentObject = document.getElementById(object.target.parentElement.id);
    if(parentObject == null){parentObject = document.getElementById(object.target.parentElement.parentElement.id)};
    if(data.style.display === 'none'){}
    data.style.display = 'block';
    parentObject.remove();
  },

  //clears data
  clearSection(section){
    while(section.firstChild) {
      section.removeChild(section.firstChild);
    }
  },

  //creates a progress bar displaying journey til harvest
  progressBar(plantDate, harvestDate){
    let plantDateTime = new Date(plantDate).getTime();
    let harvestDateTime = new Date(harvestDate).getTime();
    let currentDateTime = new Date(germination.calendar.current_date).getTime();
    let offsetHarvest = harvestDateTime - plantDateTime;
    let offsetCurrent = currentDateTime - plantDateTime;
    this.percent = Math.floor(offsetCurrent/offsetHarvest * 100);

    var ul = document.createElement('ul');
    var header = document.createElement('li');
    var outerDiv = document.createElement('div');
    var innerDiv = document.createElement('div');

    header.id = 'progress';
    header.className = 'data';
    header.innerHTML = 'Progress:';
    outerDiv.id = 'outerProgress';
    innerDiv.id = 'innerProgress';
    outerDiv.appendChild(innerDiv);
    ul.appendChild(header);
    ul.appendChild(outerDiv);
    return ul;
  },

  //animates progress
  progressMove(){
    var elem = document.getElementById('innerProgress');
    var width = 0;
    var interval = setInterval(progress, 15);
    function progress(){
      if(width >= germination.view.percent || width >= 100){
        clearInterval(interval);
      } else {
          width++;
          elem.style.width = width+'%';
      }
    }
  },

  //deletion prompt
  showMessage(category, clicked, season ){
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to delete this?'
    }, function(response){
      if(response === 0) { // if 'Yes'
        if(category === 'plant'){
          germination.data.removeData(season, clicked);
        } else if(category === 'season'){
          germination.data.removeData(clicked);
        }
      }
    })
  },

}
