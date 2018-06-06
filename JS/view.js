const pl = document.getElementById('pl');
const seasonName = document.getElementById('seasonName');
const content = document.getElementById('content');
const data = document.getElementById('data');
const calendar = document.getElementById('calendar');
const plantData = document.getElementById('plantData');
const plantImg = document.getElementById('plantImg');

germination.view = {

  loadSeason(season){
    console.log(seasonName);
    germination.view.clearSection(pl);
    var latest = season? season:germination.data.latest;
    console.log(latest);
    var season = document.createElement('h1');
    seasonName.id = 'season';
    seasonName.innerHTML = latest;
    pl.appendChild(seasonName);
    console.log(seasonName);
    germination.view.loadPlants(latest);
  },

  loadPlants(key){
    let storage = JSON.parse(localStorage.getItem(key));
    console.log(storage);
    for(let prop in storage){
      if(prop === 'season'){ continue; }
      let div = document.createElement('div');
      let li = document.createElement('li');
      let button = document.createElement('button');
      let span = document.createElement('span');
      div.className = 'plant';
      button.innerHTML = 'X';
      button.className = 'remove';
      button.onclick = function(event){ germination.view.showMessage(seasonName.innerHTML, event.target.parentElement.childNodes[0].nodeValue.toLowerCase())};
      //li.className = 'plant';
      li.innerHTML = prop;
      li.onclick = function(event){ if(event.target.tagName != 'BUTTON') {germination.events.changeActive()}};
      console.log(storage[prop].plantDate);
      span.className = 'creation';
      span.innerHTML = 'created: ' +storage[prop].plantDate;
      pl.appendChild(div);
      div.appendChild(li);
      li.appendChild(button);
      div.appendChild(span);
    }
    lastList = pl.getElementsByTagName('li')
    if(lastList.length != 0){
      lastList[lastList.length - 1].classList.add('active');
      germination.view.loadPlantData();
    }
  },

  loadPlantData(){
    germination.view.clearSection(plantData);
    var active = document.getElementsByClassName('active')[0].childNodes[0].nodeValue.toLowerCase();
    console.log(season.innerHTML);
    console.log(active);
    var object = germination.data.getPlantData(seasonName.innerHTML, active);
    console.log(object);
    var ul = document.createElement('ul');
    var plantName = document.createElement('h2');
    var plantStatus = document.createElement('li');
    var plantDate = document.createElement('li');
    var harvestDate = document.createElement('li');
    var status = germination.view.loadPlantGrowthStage(object);
    console.log(status);
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
    ul.appendChild(plantStatus);
    ul.appendChild(plantDate);
    ul.appendChild(harvestDate);
    plantData.appendChild(ul);
  },

  loadPlantGrowthStage(plant){
    var plantDate = new Date(plant.plantDate).getTime();
    var date = germination.calendar.current.getTime();
    var germinationDate = ( plantDate + (86400000 * plant.germinationTime));
    var germinationWeek = germinationDate + (86400000 * 7);
    var harvestTime = (plantDate + (86400000 * (plant.harvestTime - 3)));
    var postHarvest = harvestTime + (86400000 * 10);
    var status;
    console.log(plantImg.offsetWidth);
    //width: 168
    console.log(plantImg.offsetHeight);
    //height: 288
    console.log(new Date(date).toDateString());
    console.log('date: ' +date);
    console.log(new Date(germinationDate).toDateString());
    console.log('germinationDate: ' +germinationDate);
    console.log(new Date(germinationWeek).toDateString());
    console.log('germinationWeek: ' +germinationWeek);
    console.log(new Date(harvestTime).toDateString());
    console.log('harvestTime: ' +harvestTime);
    console.log(new Date(postHarvest).toDateString());
    console.log('postHarvest: ' +postHarvest);
    if(date > postHarvest){ plantImg.style.backgroundImage = 'url("media/Img/dead.png")'; status = 'dead'; return status; } else
    if(date > harvestTime){ plantImg.style.backgroundImage = 'url("media/Img/harvest.png")';status = 'harvest'; return status; } else
    if(date > germinationWeek){ plantImg.style.backgroundImage = 'url("media/Img/growing.png")'; status = 'growing'; return status; } else
    if(date > germinationDate){ plantImg.style.backgroundImage = 'url("media/Img/sprout.png")'; status = 'sprout'; return status; }
    else { plantImg.style.backgroundImage = 'url("media/Img/seed.png")'; status = 'seed'; return status; }
  },

  loadContent(){
    console.log('dataLoaded');
    console.log('graphLoaded');
    germination.calendar.createCalendar();

  },

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
      default:
        germination.plant.createNewPlant();
      break;
    }
  },

  removeTemplate(object){
    console.log(object.target);
    var parentObject = document.getElementById(object.target.parentElement.id);
    console.log(parentObject);
    if(data.style.display === 'none'){}
    data.style.display = 'block';
    parentObject.remove();
  },

  clearSection(section){
    while(section.firstChild) {
      section.removeChild(section.firstChild);
    }
  },

  showMessage(season, plant){
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to delete this plant?'
    }, function(response){
      if(response === 0) { // if 'Yes'
        germination.data.removeData(season, plant);
      }
    })
  },

}
