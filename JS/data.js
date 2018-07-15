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
    germination.data.getKey(key);
    if(this.dataExists && this.key){
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
      return
    }
    var stored = JSON.parse(localStorage.getItem(key));
    stored[value.name] = value;
    localStorage.setItem(key, JSON.stringify(stored));
  },

  // creates a new plant to store in season
  createPlantObjectTemplate(seasonName, plantName, plantGerminationTime, plantHarvestTime, plantSowDate ){
    var obj = JSON.parse(localStorage.getItem(seasonName));
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
      germination.data.setData(obj.season, obj[plantName]);
      germination.view.loadSeason(obj.season);
    }
  },

  // removes plant from season
  removeData(key, subkey){
    if(subkey != null){
      let k = JSON.parse(localStorage.getItem(key));
      delete k[subkey];
      localStorage.setItem(key, JSON.stringify(k));
      germination.view.loadSeason(key);
    } else if(subkey == null){
      localStorage.removeItem(key);
      germination.view.loadSeason();

    } else {
      return;
    }

  }
};
