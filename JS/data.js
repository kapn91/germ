//localStorage.clear();

germination.data = {

  //check for data session
  checkData(){
    if(localStorage.length == 0){
      this.dataExists = false;
      var obj = {
        season: germination.calendar.current_year
      }
      localStorage.setItem(obj.season, JSON.stringify(obj));
      var a = 'tomato';
      obj[a] = {
        name: a.toLowerCase(),
        nameDate: a.toLowerCase() + ' ' + germination.calendar.current_month_name.toLowerCase() + ' ' + germination.calendar.current_day,
        harvestTime: 45,
        germinationTime: 7,
        plantDate: new Date(germination.calendar.current_month_name + ' ' + germination.calendar.current_day + ' ' + germination.calendar.current_year).toDateString()
      };
      obj[a].harvestDate = new Date(new Date(obj[a].plantDate).getTime() + (86400000 * obj[a].harvestTime) + (86400000 * obj[a].germinationTime)).toDateString();
      germination.data.setData(obj.season, obj[a]);
      this.dataExists = true;
    }
    this.latest = localStorage.key(localStorage.length - 1);
    this.dataExists = true;
    console.log(this.latest);
  },

  // gather all data
  getData(){
    if(this.dataExists){
      this.data = {};
      console.log(localStorage);
      for(var prop in localStorage){
        this.data[prop] = JSON.parse(localStorage.getItem(prop));
      }

    }
  },
  // get specific key
  getKey(key){
    if(this.dataExists){
      let hasValue = key in localStorage;
      if(!hasValue) { alert('Key Not Found'); return; };
      this.key = JSON.parse(localStorage.getItem(key))
      return this.key
    }
  },
  // grabs active plant data
  getPlantData(key, subkey){
    console.log(key);
    console.log(subkey);
    germination.data.getKey(key);
    if(this.dataExists && this.key){
      console.log(this.key);
      let hasValue = subkey in this.key;
      if(!hasValue) { alert('SubKey Not Found'); return; };
      var object = this.key[subkey];
      return object;
    }
  },
  // set new data
  setData(key, value){
    if(!localStorage[key]){
      let obj = {};
      obj[value.name] = value
      localStorage.setItem(key, JSON.stringify(obj));
      console.log(JSON.parse(localStorage[key]));
      return
    }
    var stored = JSON.parse(localStorage.getItem(key));
    console.log(stored);
    console.log(value);
    stored[value.nameDate] = value;
    localStorage.setItem(key, JSON.stringify(stored));
    //germination.view.loadPlants(document.getElementById('season').innerHTML);
    console.log(localStorage);
  },

  // creates a new plant to store in season
  createPlantObjectTemplate(seasonName, plantName, plantGerminationTime, plantHarvestTime, plantSowDate ){
    console.log(seasonName);
    var obj = JSON.parse(localStorage.getItem(seasonName));
    console.log(obj);
    if(obj == undefined){
      obj = {
        season: seasonName,
      }
      localStorage.setItem(obj.season, JSON.stringify(obj));
    }
    obj[plantName] = {
      name: plantName.toLowerCase(),
      nameDate: plantName.toLowerCase() + ' ' + month_name[new Date(plantSowDate).getMonth()].toLowerCase() + ' ' + new Date(plantSowDate).getDate(),
      germinationTime: plantGerminationTime,
      harvestTime: plantHarvestTime,
      plantDate: new Date(plantSowDate).toDateString(),
    }
    obj[plantName].harvestDate = new Date(new Date(obj[plantName].plantDate).getTime() + (86400000 * obj[plantName].harvestTime)).toDateString();
    if(obj.season !== '' || obj[plantName].name !== ''){
      console.log(obj.season);
      console.log(obj);
      germination.data.setData(obj.season, obj[plantName]);
      germination.view.loadSeason(obj.season);
    }
  },

  // removes plant from season
  removeData(key, subkey){
    console.log(key);
    console.log(subkey);
    let k = JSON.parse(localStorage.getItem(key));
    console.log(k);
    delete k[subkey];
    console.log(k);
    localStorage.setItem(key, JSON.stringify(k));
    germination.view.loadSeason(key);
    /*let k = JSON.parse(localStorage.getItem(master))[key];
    localStorage.setItem(master[key], JSON.stringify('beau'));
    console.log(JSON.parse(localStorage.getItem(master[key])));
    localStorage.removeItem(master[key]);
    console.log(JSON.parse(localStorage.getItem(master[key])));
    console.log(JSON.parse(localStorage.getItem(master)));*/

  }
};
/*
/*var season = []
var Beau = {
  name: "Beau",
  gender: "male",
  height: 6+"ft"+" "+2+"in",
  species: "human",
  eyeColor: "blue"
};

var season18 = {

}

var Rachel = {
  name: "Rachel",
  gender: "Female",
  height: 5+"ft"+" "+1+"in",
  species: "human",
  eyeColor: "blueGray"
};

console.log(app.getPath('userData'));
console.log(app.getPath('documents'));
localStorage.setItem('me', JSON.stringify(Beau));
var me = JSON.parse(localStorage.getItem('me'));
console.log(me);
console.log(me.name);
console.log(localStorage.getItem('now'));
console.log(me);

//Beau.weight = 155+"lbs";

//if(localStorage.getItem('me'))
for (let i=0; i<localStorage.length; i++){
  let k = localStorage.key(i);
  console.log(k);
  var v = JSON.parse(localStorage.getItem(k));
  console.log(v);
  plants.push(v)
}

console.log(plants);
console.log(plants[0].name);

console.log(localStorage.key(localStorage.length - 1));
//check for data
//get data
//load data
* /
*/
