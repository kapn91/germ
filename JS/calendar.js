const month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var count;

germination.calendar = {

  gatherDate(){
    this.current = new Date();
    this.month = this.current.getMonth();
    this.current_month_name = month_name[this.month];
    this.current_day = this.current.getDate();
    this.current_year = this.current.getFullYear();
    this.current_date = this.current_month_name + ' ' + this.current_day + ' ' + this.current_year;
    this.first_of_month = new Date(this.current_month_name + ' ' + 1 + ' ' + this.current_year).toDateString();
    this.current_day_name = new Date(this.current_date).toDateString().substring(0,3);
    this.start_day = this.first_of_month.substring(0,3);
    this.month_start_day = days_of_week.indexOf(this.start_day);
    this.days_in_month = new Date(this.current_year, this.month+1, 0).getDate();
  },

  gatherOtherDate(offset_month){
    var offset_year = 0;
    germination.calendar.month += offset_month;
    console.log(this.month);
    while(germination.calendar.month > 11){
      germination.calendar.month -= 12;
      offset_year += 1;
    }
    while(germination.calendar.month < 0){
      germination.calendar.month += 12;
      offset_year -= 1;
    }
    germination.calendar.current_month_name = month_name[this.month];
    germination.calendar.current_year += offset_year;
    germination.calendar.first_of_month = new Date(this.current_month_name + ' ' + 1 + ' ' + this.current_year).toDateString();
    germination.calendar.start_day = this.first_of_month.substring(0,3);
    germination.calendar.month_start_day = days_of_week.indexOf(this.start_day);
    germination.calendar.days_in_month = new Date(this.current_year, this.month+1, 0).getDate();
    if(document.getElementById('table')){
      console.log('hi');
      console.log(germination.calendar);
      germination.calendar.createCalendar();
    }
  },

  createCalendar(){
    var table = document.createElement('table');
    if(document.getElementById('table')){
      document.getElementById('table').remove();
      console.log('hi')
    }
    table.id = "table";
    var standard_row = 6;
    if( germination.calendar.days_in_month == 28 && germination.calendar.month_start_day == 0){
      standard_row = 5;
      console.log(standard_row);
    } else if ((germination.calendar.days_in_month == 30 && germination.calendar.month_start_day == 6) || (germination.calendar.days_in_month == 31 && germination.calendar.month_start_day > 4)){
      standard_row = 7;
    }

    for(let i = 0; i< standard_row; i++){
      var tr = document.createElement('tr');
      tr.style.height = 'calc('+100+'%/'+standard_row+')';
      germination.calendar.fillRows(i, table, tr, standard_row);
      table.appendChild(tr);
    }
    calendar.appendChild(table);
  },

  fillRows(row, table, tr, standard_row){
    var left_button = document.createElement('button');
    var right_button = document.createElement('button');
    left_button.innerHTML = '<';
    left_button.id = 'left';
    right_button.innerHTML = '>';
    right_button.id = 'right';
    left_button.onclick = function(){germination.calendar.gatherOtherDate(-1);};
    right_button.onclick = function(){germination.calendar.gatherOtherDate(1);};
    var th = document.createElement('th');
    th.innerHTML = germination.calendar.current_month_name;
    if(this.current_year != this.current.getFullYear()){
      th.innerHTML += ', '+this.current_year;
    }
    th.id = 'ch'
    switch(row){
      case 0:
        // fill header
        tr.appendChild(th);
        tr.appendChild(left_button);
        tr.appendChild(right_button);
        tr.style.height = 'calc('+100+'%/'+standard_row+')';
        tr.classList.add('heading');
        return tr;
        break;

      case 1:
        //fill week 1
        count = 1;
        var d;
        for(d=0; d<=6; d++){
          if(d == germination.calendar.month_start_day){
            break;
          }
          var td = document.createElement('td');
          tr.appendChild(td);
        }
          for(; d<=6; d++){
            var td = document.createElement('td');
            var span = document.createElement('div');
            td.id = count;
            td.className = 'day';
            span.innerHTML = count;
            td.appendChild(span);
            tr.appendChild(td);
            tr.style.height = 'calc('+100+'%'/+standard_row+')';
            count++
          }
          return tr;
        break;
      default:
        //fill rest of days
        for(let d=0; d<=6; d++){
          var td = document.createElement('td');
          var span = document.createElement('div');
          if(count>germination.calendar.days_in_month){
            //tr.appendChild(td);
            break;
          }
          td.id = count;
          td.className = 'day';
          span.innerHTML = count;
          td.appendChild(span);
          tr.appendChild(td);
          tr.style.height = 'calc('+100+'%/'+standard_row+')';
          count++;
        }
        return tr;
        break;
    }
  }


}
