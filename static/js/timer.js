"use strict"; 

let workSession = 25 * 60; // 25 min in seconds
let shortBreakSession = 5 * 60; // 5 min in seconds 
let longBreakSession = 15 * 60; // 15 min in seconds 

let timeInSession; // assign it a value later
let sessionDuration; // chronological length of session 

// add timezone 

let startHour; // int; get hour in military time 
let startMinute; // int
let day; // int; 0 is Sunday  
let month; // int; 0 is January 
let hour; // int; 12-hr clock 
let timeOfDay; // str
let militaryHour // int; 24-hr clock 

let timer = document.getElementById("timerTime");
let clock = document.getElementById("clockTime"); 
let todayDate = document.getElementById("todayDate");

let startSession = true; 
let pauseSession = false; 
let stopSession = false; 

// Select DOM elements. 
let play = document.getElementById("pomodoro-play"); 
let pause = document.getElementById("pomodoro-pause"); 
let stop = document.getElementById("pomodoro-stop"); 

let session; 
let dropdown; 

// Event Listeners 
play.addEventListener('click', () => {
    console.log('Click Play'); 
    startSession = true; 
    // Check if new session 
    if (pauseSession == false && stopSession == false) { 
        console.log('if-then: pause=false, stop=false'); 
        // Select DOM node containing all dropdown options 
        // Dropdown option indices start with 0 (just like for an array)
        dropdown = document.getElementById("session_type");
        session = dropdown.options[dropdown.selectedIndex].value; 
        getSelectedSession(session); 
    } else if (pauseSession == true && stopSession == false) {
        console.log('else-if')
        // resume timer 
    }
}); 


pause.addEventListener('click', (session) => {
    
    startSession = true; 
    pauseSession = true; 
    stopSession = false; 

    // stop timer
    // don't record session 

}); 

stop.addEventListener('click', (session) => {
    startSession = true; 
    pauseSession = false; 
    stopSession = false; 

    // stop timer
    // send session details to SQL 
}); 


let startTime; 
let stopTime; 
let today; 
let tiff; 
let totalSeconds; 
let totalMinutes; 
let totalHours; 

function getSelectedSession (session) {
    console.log('getSelectedSession');
    console.log(session);
    if (session == 'work') {
        console.log('if: Work');
        callTimer(workSession); 
    } else if (session == "short_break"){
        console.log('if:Short break');
        callTimer(shortBreakSession);
    } else if (session == "long_break"){
         console.log('if:Long Break');
        callTimer(longBreakSession); 
    } 
}; 





// Check if these values can be passed into SQL. 

let timeForResumingSession;

// Test: no discernible syntax errors but callTimer() doesn't work properly. 
function callTimer(sessionDuration) {  
    console.log('callTimer started'); 
    // setInterval(f(x), time-interval) executes f(x) every time-interval 
    // EX: setInterval(myTimer, 1000) executes myTimer every 1000 milliseconds

    // this snippet works in Repl.it but not sure about timer.innerText 
    let timeInSession = sessionDuration; 
    // Replaced startTime = Date.now() with startTime = new Date()
    startTime = new Date(); 
    console.log('start timer'); 
    let show = setInterval(() => {
        // For every second that passes, show clock and timer countdown. 
        // Display clock time. 
        let today = new Date(); 
        clock.innerText = today.toLocaleTimeString(); 
        timeInSession--; 
        if (timeInSession == 0) { 
            stopTime = new Date(); 
            stopSession = true; 
            clearInterval(show); 
        } else if (pauseSession == true && startSession == true) {
            timeForResumingSession = timeInSession; 
            clearInterval(show);
            console.log('Paused'); 
        } else if (pauseSession == false && startSession == true) {
        // Continue displaying timer if countdown hasn't ended. 

            tiff = stopTime - startTime; 
            let sec = tiff/1000; 
            let min = tiff/60; 
            let hr = tiff/60;
            // Snippet below leads to errors for totalHours:  
            // > totalMinutes=Math.round(totalSeconds/60); 
            // 93  
            // > totalHours=Math.round(totalMinutes/60); 
            // 1547
            totalSeconds = Math.round(sec); 
            totalMinutes = Math.round(min);
            totalHours= Number.parseFloat(hr).toFixed(2);
            timer.innerText = `Timer: ${totalHours} hrs ${totalMinutes} min ${totalSeconds} sec`; 
        }; 

    }, 1000); // end of setInterval()
};





// setInterval(f(x), 1000) executes function() every 1000 ms or 1 s 
// setInterval will continue executing unless clearInterval stops it
//------------------------------------------------------------


let timeVars; 
let dateToday; 
let time; 
let dateTimeList; 
// Test: It works! (independently of prior f(x)'s)
// > DateAndTime(); 
// 10:10 PM   => browser displays actual current time but only when f(x) is called
function getDisplayDate() {

        today = new Date(); // UNIX time since epoch [ms]         
        startHour = today.getHours(); // hours in military time 
        startMinute = today.getMinutes(); 
        dayOfMonth = today.getDate(); // day of month from 0-31 
        //weekday = today.getDay(); // 0 is Sunday  
        month = today.getMonth(); // 0 is January
        year = today.getUTCFullYear(); 
        timeVars = [month, dayOfMonth, year, startHour, startMinute]; 
        dateToday = today.toLocaleDateString(); // '6/18/2020'
        todayDate.innerText = dateToday; 
    }; // end of f(x)




// Test: It works! 
// > timeVars = [6, 1, 2020, 20, 0]; 
// > convertDate(timeVars); 
// (3) ["June", 1, 2020]
function convertMonth_returnDate(timeVars) {
    // return human-readable time; make month human-friendly
    // timeVars = [month, dayOfMonth, year, startHour, startMinute]

    let months = ['January', 
                  'February', 
                  'March', 
                  'April', 
                  'May', 
                  'June', 
                  'July', 
                  'August', 
                  'September', 
                  'October', 
                  'November', 
                  'December']; 

    month = months[(timeVars[0] -1)]; // Tested! Returns correct month 
    // return [month, day, year]
    return dateList = [month, timeVars[1], timeVars[2]]; 
 }; // end of f(x) 




// Test: it works! 
// > let timeVars = [6, 1, 2020, 18, 30];
// > convertMilitaryTime (timeVars)
// (3) [6, 30, "PM"]
function convertMilitaryTime (timeVars) {
    // convert hours from 24-hr to 12-hr clock 
    // timeVars = [month, dayOfMonth, year, startHour, startMinute]
    let militaryHour = timeVars[3]; 
    if (militaryHour == 0 || militaryHour == 24) {
        hour = 12; 
        timeOfDay = 'AM'; 
    } else if (militaryHour == 12) {
        hour = 12; 
        timeOfDay = 'PM'; 
    } else if (militaryHour > 0 && militaryHour < 12) {
        hour = militaryHour; 
        timeOfDay = 'AM'; 
    } else if (militaryHour > 12 && militaryHour < 24) {
        hour = militaryHour - 12; 
        timeOfDay = 'PM'; 
    }
    // return [hour, minutes, AM/PM]
    return timeList = [hour, timeVars[4], timeOfDay]; 
}; // end of convertMilitaryTime() 

