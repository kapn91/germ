require(path.resolve('JS/view.js'));

germination.plant = {

  createNewPlant(){
    if(data.style.display === 'none'){ return; }
    var dataHeight = data.offsetHeight;
    var div = document.createElement('div');
    var plantNameInput = document.createElement('input');
    var plantGerminationTimeInput = document.createElement('input');
    var plantHarvestTimeInput = document.createElement('input');
    var plantSowDateInput = document.createElement('input');
    var submitButton = document.createElement('button');
    var cancelButton = document.createElement('button');
    div.id = 'template';
    div.style.height = dataHeight+'px';
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
    submitButton.id = 'submitPlant';
    submitButton.innerHTML = 'Submit';
    submitButton.onclick = germination.plant.submitNewPlant;
    cancelButton.id = 'cancelButton';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.onclick = germination.view.removeTemplate;
    data.style.display = 'none';
    div.appendChild(plantNameInput);
    div.appendChild(plantGerminationTimeInput);
    div.appendChild(plantHarvestTimeInput);
    div.appendChild(plantSowDateInput);
    div.appendChild(cancelButton);
    div.appendChild(submitButton);
    content.insertBefore(div,content.firstChild);
    plantNameInput.focus();
  },

  editPlant(){
    if(data.style.display === 'none'){ return; }
    let active = document.getElementsByClassName('active')[0].childNodes[0].nodeValue.toLowerCase();
    console.log(seasonName.innerHTML);
    let object = germination.data.getPlantData(seasonName.innerHTML, active);
    console.log(object);
    let date = new Date(object.plantDate);
    let dateMonth = date.getMonth()>9?date.getMonth()+1:'0'+(date.getMonth()+1);
    let dateDay = date.getDate()>9?date.getDate():'0'+date.getDate();
    var dataHeight = data.offsetHeight;
    var div = document.createElement('div');
    var plantNameInput = document.createElement('input');
    var plantGerminationTimeInput = document.createElement('input');
    var plantHarvestTimeInput = document.createElement('input');
    var plantSowDateInput = document.createElement('input');
    var submitButton = document.createElement('button');
    var cancelButton = document.createElement('button');
    div.id = 'template';
    div.style.height = dataHeight+'px';
    plantNameInput.id = 'plantNameInput';
    plantNameInput.value = object.name;
    plantNameInput.placeholder = object.name;
    plantNameInput.onfocus = germination.events.removeListener;
    plantNameInput.onblur = germination.events.addListener;
    plantGerminationTimeInput.id = 'plantGerminationTimeInput';
    plantGerminationTimeInput.value = object.germinationTime;
    plantGerminationTimeInput.placeholder = object.germinationTime;
    plantGerminationTimeInput.type = 'number';
    plantGerminationTimeInput.onfocus = germination.events.removeListener;
    plantGerminationTimeInput.onblur = germination.events.addListener;
    plantHarvestTimeInput.id = 'plantHarvestTimeInput';
    plantHarvestTimeInput.value = object.harvestTime;
    plantHarvestTimeInput.placeholder = object.harvestTime;
    plantHarvestTimeInput.type = 'number';
    plantHarvestTimeInput.onfocus = germination.events.removeListener;
    plantHarvestTimeInput.onblur = germination.events.addListener;
    plantSowDateInput.id = 'plantSowDateInput';
    plantSowDateInput.value = dateMonth+'/'+dateDay+'/'+date.getFullYear();
    plantSowDateInput.placeholder = dateMonth+'/'+dateDay+'/'+date.getFullYear();
    plantSowDateInput.onkeyup = function(event){ console.log(event.keyCode); if(plantSowDateInput.value.length === 2 || plantSowDateInput.value.length === 5 ){ if(event.keyCode == 8) { return; } plantSowDateInput.value += '/'; } };
    plantSowDateInput.onfocus = germination.events.removeListener;
    plantSowDateInput.onblur = germination.events.addListener;
    submitButton.id = 'submitPlant';
    submitButton.innerHTML = 'Submit';
    submitButton.onclick = function(){ germination.data.removeData(seasonName.innerHTML, object.name); germination.plant.submitNewPlant(); }
    cancelButton.id = 'cancelButton';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.onclick = germination.view.removeTemplate;
    data.style.display = 'none';
    div.appendChild(plantNameInput);
    div.appendChild(plantGerminationTimeInput);
    div.appendChild(plantHarvestTimeInput);
    div.appendChild(plantSowDateInput);
    div.appendChild(cancelButton);
    div.appendChild(submitButton);
    content.insertBefore(div,content.firstChild);
    plantNameInput.focus();
  },

  createExistingPlantTemplate(){
    console.log('newExistingPlantTemplate');
  },

  submitNewPlant(){
    var template = document.getElementById('template');
    var season = document.getElementById('season').innerHTML;
    var plantNameInput = document.getElementById('plantNameInput').value;
    console.log(plantNameInput);
    var plantGerminationTimeInput = document.getElementById('plantGerminationTimeInput').value;
    var plantHarvestTimeInput = document.getElementById('plantHarvestTimeInput').value;
    var plantSowDateInput = document.getElementById('plantSowDateInput').value;
    console.log(plantSowDateInput);
    console.log(season);
    germination.data.createPlantObjectTemplate(season, plantNameInput, plantGerminationTimeInput, plantHarvestTimeInput, plantSowDateInput );
    if(template) {
      template.remove();
      data.style.display = 'block';
    }
  }
}
