const pl = document.getElementById('pl');
const season = document.getElementById('season')
const data = document.getElementById('data');
const calendar = document.getElementById('calendar');

germination.view = {

  loadSeason(){
    var latest = germination.data.latest;
    season.innerHTML = latest;
    germination.view.loadPlants(latest);
  },

  loadPlants(key){
    let storage = JSON.parse(localStorage.getItem(key));
    for(let prop in storage){
      if(prop === 'name'){ continue; }
      let li = document.createElement('li');
      li.className = 'plant';
      li.innerHTML = prop;
      console.log(prop)
      pl.appendChild(li)
    }
  },

  loadContent(){
    console.log('dataLoaded');
    console.log('graphLoaded');
    germination.calendar.createCalendar();

  }
}
