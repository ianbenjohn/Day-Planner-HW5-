const currentHour = moment().hours();

$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i <= 17; i++) {
                                            // Rows for the Day
        const row = $(`<div data-time=${i} id='${i}'>`);
        row.addClass("row")
        //Hour Column
        const hourCol = $('<div> <p class="hour">' + AmPm(i) + '</p>');
        hourCol.addClass("col-2")
                                            //Text Area Column Where You Put Schedule
        const textCol = $(`<div><textarea id=text${i} class="description" placeholder="Add Upcoming Event"></textarea>`);
        textCol.addClass("col-8 past")
                                            //Save Button Column
        const saveBtn = $(`<div><button class="saveBtn"id=${i}><i class="fas fa-save"></i></button>`)
        saveBtn.addClass("col-1")
                                            // Appending Created Columns to the Row
        row.append(hourCol);
        row.append(textCol);
        row.append(saveBtn);
                                            //Now adding Rows into HTML container
        $(".container").append(row);

        getLocalStorage(i);
    }

    function AmPm(hours) {
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
AmPm();

function colorHour(){
        for (var i = 9; i < 18; i++) { 
        console.log(currentHour, $(`#${i}`).data("time"));
         if ($(`#${i}`).data("time") == currentHour){
            $(`#text${i}`).addClass( "present");
        } else if (currentHour < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
        }
    }
};

setInterval(function() {
    colorHour();
}, 1000);

const saveBtn = $('.saveBtn');
    saveBtn.on('click', function(){
        let saveID = $(this).attr('id');
        let saveText = $(this).parent().siblings().children('.description').val();
        localStorage.setItem(saveID, saveText);
    });
});

function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
};