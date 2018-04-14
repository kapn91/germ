localStorage.clear();


germination.data = {

  //check for data session
  checkData(){
    if(localStorage.length == 0){
      this.dataExists = false;
      var obj = {
        name: germination.calendar.current_year,
      }
      var a = 'tomato';
      obj[a] = {
        name: a,
        harvest_days: 45,
        germination: 7,
        plant_day: new Date(germination.calendar.current_month_name + ' ' + germination.calendar.current_day + ' ' + germination.calendar.current_year).toDateString()
      };
      localStorage.setItem(obj.name, JSON.stringify(obj));
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
      console.log(this.key);
    }
  },
  // set new data
  setData(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeData(master, key){
    /*let k = JSON.parse(localStorage.getItem(master))[key];
    localStorage.setItem(master[key], JSON.stringify('beau'));
    console.log(JSON.parse(localStorage.getItem(master[key])));
    localStorage.removeItem(master[key]);
    console.log(JSON.parse(localStorage.getItem(master[key])));
    console.log(JSON.parse(localStorage.getItem(master)));*/

  }
}

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
*/
