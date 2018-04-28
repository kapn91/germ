const pl = document.getElementById('pl');
const season = document.getElementById('season')
const content = document.getElementById('content');
const data = document.getElementById('data');
const calendar = document.getElementById('calendar');

germination.view = {

  loadSeason(season){
    germination.view.clearSideBar();
    var latest = season? season:germination.data.latest;
    var season = document.createElement('h1');
    season.id = 'season';
    season.innerHTML = latest;
    pl.appendChild(season);
    germination.view.loadPlants(latest);
  },

  loadPlants(key){
    let storage = JSON.parse(localStorage.getItem(key));
    var first_iteration = true;
    for(let prop in storage){
      if(prop === 'season'){ continue; }
      let li = document.createElement('li');
      li.className = 'plant';
      li.innerHTML = prop;
      pl.appendChild(li)
      if(first_iteration){
        li.classList.add('active')
      }
      first_iteration = false;
    }
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

  clearSideBar(){
    while(pl.firstChild) {
      pl.removeChild(pl.firstChild);
    }
  }

}
