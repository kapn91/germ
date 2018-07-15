const pl = document.getElementById('pl');
const seasonName = document.getElementById('seasonName');
const content = document.getElementById('content');
const data = document.getElementById('data');
const calendar = document.getElementById('calendar');
const plantData = document.getElementById('plantData');
const plantImg = document.getElementById('plantImg');
const author = document.getElementById('author');

germination.view = {

  startUp(){
    author.style.opacity = 1;
    author.style.transitionDelay = '4s';
    author.style.opacity = 0;
    setTimeout(function(){
      author.style.transitionDelay = '0s';
    }, 4);
  },

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
      var div = document.createElement('div');
      var li = document.createElement('li');
      var button = document.createElement('button');
      var span = document.createElement('span');
      div.className = 'plant';
      button.innerHTML = 'X';
      button.className = 'remove';
      button.onclick = function(event){ germination.view.showMessage( 'plant', event.target.parentElement.childNodes[0].nodeValue.toLowerCase()), seasonName.innerHTML };
      //li.className = 'plant';
      li.innerHTML = prop;
      li.onclick = function(event){ if(event.target.tagName != 'BUTTON') {germination.events.changeActive()}};
      console.log(storage[prop].plantDate);
      console.log(new Date(storage[prop].plantDate).getTime());
      span.className = 'creation';
      span.innerHTML = 'created: ' +storage[prop].plantDate;
      if(pl.getElementsByTagName('li').length >= 1){
        for(let i=0; i<pl.getElementsByTagName('li').length; i++){
          console.log(i);
          if(new Date(storage[prop].plantDate).getTime() < new Date(storage[pl.getElementsByTagName('li')[i].childNodes[0].nodeValue.toLowerCase()].plantDate).getTime()){
            console.log(new Date(storage[prop].plantDate).getTime());
            console.log(new Date(storage[pl.getElementsByTagName('li')[i].childNodes[0].nodeValue.toLowerCase()].plantDate).getTime());
            console.log(pl.getElementsByTagName('div')[i]);
            console.log(pl.childNodes[i+1]);
            pl.insertBefore(div, pl.childNodes[i+1]);
            div.appendChild(li);
            li.appendChild(button);
            div.appendChild(span);
            console.log(pl);
            //germination.view.selectActive();
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
      console.log('hi');
      pl.appendChild(div);
      div.appendChild(li);
      li.appendChild(button);
      div.appendChild(span);
      }
    }
    germination.view.selectActive();
  },

  selectActive(){
    let lastList = pl.getElementsByTagName('li')
    if(lastList.length != 0){
      lastList[lastList.length - 1].classList.add('active');
      germination.view.loadPlantData();
    } else {
      germination.view.clearSection(plantData);
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
    var progressBar = germination.view.progressBar(object.plantDate, object.harvestDate);
    console.log(progressBar);
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
    ul.appendChild(progressBar);
    ul.appendChild(plantStatus);
    ul.appendChild(plantDate);
    ul.appendChild(harvestDate);
    plantData.appendChild(ul);
    germination.journal.createJournal(object);
    germination.view.progressMove();
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
    germination.journal.init()
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
      case 'edit':
        console.log(localStorage);
        germination.plant.editPlant();
      default:
        germination.plant.createNewPlant();
      break;
    }
  },

  removeTemplate(object){
    console.log(object.target);
    var parentObject = document.getElementById(object.target.parentElement.id);
    if(parentObject == null){parentObject = document.getElementById(object.target.parentElement.parentElement.id)};
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

  progressBar(plantDate, harvestDate){
    console.log(plantDate);
    console.log(harvestDate);
    let plantDateTime = new Date(plantDate).getTime();
    let harvestDateTime = new Date(harvestDate).getTime();
    let currentDateTime = new Date(germination.calendar.current_date).getTime();
    let offsetHarvest = harvestDateTime - plantDateTime;
    let offsetCurrent = currentDateTime - plantDateTime;
    this.percent = Math.floor(offsetCurrent/offsetHarvest * 100);
    console.log(this.percent+'%');
    console.log('this is plantDate: '+plantDateTime+' this is harvestDate: '+harvestDateTime+ ' this is currentDate: '+currentDateTime);

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
