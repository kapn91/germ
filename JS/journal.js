const textArea = document.createElement('textarea');
const entries = document.createElement('ul');

germination.journal = {

  //initializes journal area
  init(){
    var content = document.getElementById('content');
    var div = document.createElement('div');
    div.id = 'journal';
    textArea.id = 'textArea';
    entries.id = 'entries';
    div.appendChild(textArea);
    div.appendChild(entries);
    content.appendChild(div);
  },

  //creates journal text area
  createJournal(object){
    textArea.innerHTML = '';
    textArea.placeholder = germination.calendar.current_date;
    textArea.onfocus = germination.events.removeListener;
    textArea.onblur = function(){ germination.events.addListener; textArea.value = ''; }
    germination.journal.gatherEntries(object);
  },

  //displays all journal entries
  gatherEntries(object){
    entries.innerHTML = '';
    if(object.entries){
      for(let entry in object.entries){
        let li = document.createElement('li');
        li.innerHTML = object.entries[entry].date;
        entries.appendChild(li);
      }
    }
  }
}
