var currentDayEl = $('#currentDay');
var containerEl = $('.container');

var currentDay = moment().format("dddd, MMMM, Do");
var currentHour = moment({H:moment().format("H")});

currentDayEl.text(currentDay);

loadFromLocalStorage();
renderTimeBlockText();

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
    strippedID = elemId.replace("hour", "");
    return moment({H:strippedID});
}

// handle clicks on main container. checks if save button is pressed
containerEl.on("click", function(event){
    var target = $(event.target);
    if (target.hasClass("saveBtn") || target.hasClass("fa-save")){
        var timeBlock = target.closest("div");
        saveToLocalStorage(timeBlock);
    }
});

// saves text to local storage
function saveToLocalStorage(timeBlock){
    loadFromLocalStorage();

    var timeBlockID = $(timeBlock).attr("id");
    var timeBlockText = $(timeBlock).find("textarea")[0].value;

    textDataStorage[timeBlockID] = timeBlockText;

    localStorage.setItem("textDataStorage", JSON.stringify(textDataStorage));
}

// loads from local storage into storage object
function loadFromLocalStorage(){
    var tempLoad = JSON.parse(localStorage.getItem("textDataStorage"));

    if (tempLoad === null) return;

    textDataStorage = tempLoad;

}

// runs through each property of storage object assigning appropriate time block text
function renderTimeBlockText(){
    for (var prop in textDataStorage) {
        if (Object.prototype.hasOwnProperty.call(textDataStorage, prop)) {
            $(".time-block").each(function(){
                if ($(this).attr("id") === prop){
                    $(this).find("textarea")[0].value = textDataStorage[prop];
                }
            });
        }
    }
}

// object to hold time block text
var textDataStorage = {
    hour9: "",
    hour10: "",
    hour11: "",
    hour12: "",
    hour13: "",
    hour14: "",
    hour15: "",
    hour16: "",
    hour17: "",
}