
germination.events = {
  addListener(){
    document.addEventListener('keypress', germination.events.keyPress, true);
  },

  removeListener(){
    document.removeEventListener('keypress', germination.events.keyPress, true);
  },

  changeActive(){
      currentActive = pl.getElementsByClassName('active')[0];
      currentActive.classList.remove('active');
      event.target.classList.add('active');
      germination.view.loadPlantData();
  },

  keyPress(x){
    console.log(x)
    x.preventDefault();
    switch(x.key){
      case 'l':
        germination.view.createTemplate('load');
        break;
      case 'n':
        germination.view.createTemplate('add');
        break;
      case 's':
        germination.view.createTemplate('season');
        break;
      case 'c':
        if(document.getElementById('cancelButton') != undefined){
          document.getElementById('cancelButton').click();
        }
        break;
    }
  }
}
