const textArea = document.createElement('textarea');
const entries = document.createElement('ul');

germination.journal = {

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

  createJournal(object){
    textArea.innerHTML = '';
    textArea.placeholder = germination.calendar.current_date;
    germination.journal.gatherEntries(object);
  },

  gatherEntries(object){
    entries.innerHTML = '';
    console.log(germination.calendar.current_date);
    if(object.entries){
      for(let entry in object.entries){
        let li = document.createElement('li');
        li.innerHTML = object.entries[entry].date;
        entries.appendChild(li);
      }
    }
  }
}
