var currentDayEl = $('#currentDay');

var currentDay = moment().format("dddd, MMMM, Do");
var currentHour = moment({H:moment().format("H")});

currentDayEl.text(currentDay);

$(".time-block").each(function(){
    timeBlockMomentHour = convertIdToMomentHour(this.id)
    
    // time block is before
    if (timeBlockMomentHour.isBefore(currentHour)){
        $(this).addClass("past");
    }
    // time block is after
    else if (timeBlockMomentHour.isAfter(currentHour)){
        $(this).addClass("future");
    }
    // time block is same
    else{
        $(this).addClass("present");
    }
});

// element ID must be of the form "hour-##"
function convertIdToMomentHour(elemId){
    strippedID = elemId.replace("hour-", "");
    return moment({H:strippedID});
}
