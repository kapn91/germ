require(path.resolve('JS/view.js'));

germination.season = {

  //create a new season
  createNewSeason(){
    if(data.style.display === 'none'){ return; }
    var dataHeight = data.offsetHeight;
    data.style.display = 'none';
    var div = document.createElement('div');
    var seasonNameInput = document.createElement('input');
    var plantNameInput = document.createElement('input');
    var plantGerminationTimeInput = document.createElement('input');
    var plantHarvestTimeInput = document.createElement('input');
    var plantSowDateInput = document.createElement('input');
    var newPlantButton = document.createElement('button');
    var submitButton = document.createElement('button');
    var cancelButton = document.createElement('button');
    div.id = 'template';
    div.style.height = dataHeight+'px';
    content.insertBefore(div,content.firstChild);
    seasonNameInput.id = 'seasonNameInput';
    seasonNameInput.placeholder = 'Season Name';
    seasonNameInput.onfocus = germination.events.removeListener;
    seasonNameInput.onblur = germination.events.addListener;
    plantNameInput.id = 'plantNameInput';
    plantNameInput.placeholder = 'Plant Name';
    plantNameInput.onfocus = germination.events.removeListener;
    plantNameInput.onblur = germination.events.addListener;
    plantGerminationTimeInput.id = 'plantGerminationTimeInput';
    plantGerminationTimeInput.placeholder = 'Days Until Germination';
    plantGerminationTimeInput.type = 'number';
    plantGerminationTimeInput.onfocus = germination.events.removeListener;
    plantGerminationTimeInput.onblur = germination.events.addListener;
    plantHarvestTimeInput.id = 'plantHarvestTimeInput';
    plantHarvestTimeInput.placeholder = 'Days Until Harvest';
    plantHarvestTimeInput.type = 'number';
    plantHarvestTimeInput.onfocus = germination.events.removeListener;
    plantHarvestTimeInput.onblur = germination.events.addListener;
    plantSowDateInput.id = 'plantSowDateInput';
    plantSowDateInput.placeholder = 'Date Planted (mm/dd/yyyy)';
    plantSowDateInput.onkeyup = function(event){ console.log(event.keyCode); if(plantSowDateInput.value.length === 2 || plantSowDateInput.value.length === 5 ){ if(event.keyCode == 8) { return; } plantSowDateInput.value += '/'; } };
    plantSowDateInput.onfocus = germination.events.removeListener;
    plantSowDateInput.onblur = germination.events.addListener;
    newPlantButton.id = 'newPlantObject'
    newPlantButton.innerHTML = 'Add Plant';
    newPlantButton.onclick = function(){germination.season.addAnotherPlant(document.getElementById('template'))};
    submitButton.id = 'submitSeason';
    submitButton.innerHTML = 'Submit';
    submitButton.onclick = germination.season.submitNewSeason;
    cancelButton.id = 'cancelButton';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.onclick = germination.view.removeTemplate;
    div.appendChild(seasonNameInput);
    div.appendChild(plantNameInput);
    div.appendChild(plantGerminationTimeInput);
    div.appendChild(plantHarvestTimeInput);
    div.appendChild(plantSowDateInput);
    div.appendChild(cancelButton);
    div.appendChild(submitButton);
    div.appendChild(newPlantButton);
    seasonNameInput.focus();
  },

  //load and existing season
  loadExistingSeasonTemplate(){
    if(data.style.display === 'none'){ return; }
    var dataHeight = data.offsetHeight;
    data.style.display = 'none';
    var div = document.createElement('div');
    var cancelButton = document.createElement('button');
    div.id = 'template';
    div.style.height = dataHeight+'px';
    cancelButton.id = 'cancelButton';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.onclick = germination.view.removeTemplate;
    for(let prop in localStorage ){
      let wrapper = document.createElement('div');
      let button = document.createElement('button');
      let remove = document.createElement('button');
      button.innerHTML = prop;
      button.id = prop;
      button.className = 'season';
      button.onclick = function(){ germination.view.loadSeason(prop); germination.view.removeTemplate(event); };
      remove.innerHTML = 'X';
      remove.className = 'remove';
      remove.onclick = function(event){ console.log(event.target.parentElement.childNodes[0].innerHTML); germination.view.showMessage('season', event.target.parentElement.childNodes[0].innerHTML);   germination.view.removeTemplate(event); };
      wrapper.appendChild(button);
      wrapper.appendChild(remove);
      div.appendChild(wrapper);
    }
    div.appendChild(cancelButton);
    content.insertBefore(div, content.firstChild);
  },

  //submit new season to data
  submitNewSeason(){
    var template = document.getElementById('template');
    var seasonNameInput = document.getElementById('seasonNameInput').value;
    var plantNameInput = document.getElementById('plantNameInput').value;
    var plantGerminationTimeInput = document.getElementById('plantGerminationTimeInput').value;
    var plantHarvestTimeInput = document.getElementById('plantHarvestTimeInput').value;
    var plantSowDateInput = document.getElementById('plantSowDateInput').value;
    germination.data.createPlantObjectTemplate(seasonNameInput, plantNameInput, plantGerminationTimeInput, plantHarvestTimeInput, plantSowDateInput );
    if(template) {
      template.remove();
      data.style.display = 'block';
    }
  },

  //add another plant when creating a season
  addAnotherPlant(parent){
    var plantNameInput = document.createElement('input');
    var plantGerminationTimeInput = document.createElement('input');
    var plantHarvestTimeInput = document.createElement('input');
    var plantSowDateInput = document.createElement('input');


    plantNameInput.placeholder = 'Plant Name';
    plantNameInput.onfocus = germination.events.removeListener;
    plantNameInput.onblur = germination.events.addListener;
    plantGerminationTimeInput.placeholder = 'Days Until Germination';
    plantGerminationTimeInput.type = 'number';
    plantGerminationTimeInput.onfocus = germination.events.removeListener;
    plantGerminationTimeInput.onblur = germination.events.addListener;
    plantHarvestTimeInput.placeholder = 'Days Until Harvest';
    plantHarvestTimeInput.type = 'number';
    plantHarvestTimeInput.onfocus = germination.events.removeListener;
    plantHarvestTimeInput.onblur = germination.events.addListener;
    plantSowDateInput.placeholder = 'Date Planted (mm/dd/yyyy)';
    plantSowDateInput.onkeyup = function(event){ console.log(event.keyCode); if(plantSowDateInput.value.length === 2 || plantSowDateInput.value.length === 5 ){ if(event.keyCode == 8) { return; } plantSowDateInput.value += '/'; } };
    plantSowDateInput.onfocus = germination.events.removeListener;
    plantSowDateInput.onblur = germination.events.addListener;

    div.appendChild(plantNameInput);
    div.appendChild(plantGerminationTimeInput);
    div.appendChild(plantHarvestTimeInput);
    div.appendChild(plantSowDateInput);
  }
}
