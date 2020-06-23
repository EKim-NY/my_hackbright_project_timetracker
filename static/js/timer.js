"use strict"; 

alert('timer.js has loaded'); 

let workSession = 25 * 60; // 25 min in seconds
let shortBreakSession = 5 * 60; // 5 min in seconds 
let longBreakSession = 15 * 60; // 15 min in seconds 

let timeInSession; // assign it a value later
let sessionDuration; // session length [s]

// add timezone 

let startHour; // int; get hour in military time 
let startMinute; // int
let day; // int; 0 is Sunday  
let month; // 'June'
let month_index; // int; 0 is January 
let hour; // int; 12-hr clock 
let timeOfDay; // str
let militaryHour // int; 24-hr clock 

let dateVars; 
let timeVars; 
let dateToday; 
let time; 


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

let startTime; 
let stopTime; 
let today; 
let tiff; 
let seconds; 
let minutes; 
let hours; 

let timeForResumingSession;
let timeAsList; 



showClock(); 
showDate(); 

// Event Listeners 
play.addEventListener('click', () => {
    console.log('Click Play or Resume'); 

    startSession = true; 
    dropdown = document.getElementById("session_type");
    session = dropdown.options[dropdown.selectedIndex].value; 
    getSelectedSession(session); 
    showTimer(sessionDuration); // start timer countdown

pause.addEventListener('click', (session) => {
    console.log('Click Pause'); 

    pauseSession = true; 
    showTimer(sessionDuration); 

stop.addEventListener('click', (session) => {
    console.log('Click Stop'); 

    stopSession = true; 
    showTimer(sessionDuration); 




function getSelectedSession (session) {
    console.log('getSelectedSession');
    console.log(session);
    if (session == 'work') {
        console.log('if: Work');
        callTimer(workSession); 
    } else if (session == "short_break"){
        console.log('if: Short break');
        callTimer(shortBreakSession);
    } else if (session == "long_break"){
        console.log('if: Long Break');
        callTimer(longBreakSession); 
    } 
} 



function showClock() {
// showClock starts when page is loaded

    // Replaced startTime = Date.now() with startTime = new Date()
    startTime = new Date(); 
    let showClockTime = setInterval(() => {
        let today = new Date(); 
        clock.innerText = today.toLocaleTimeString(); 
        timeLeftInSession--; 
    }, 1000); // end of show = setInterval()

} // end of f(X)



// Unit Test: It works! 
function convertTimeToMillis(timeAsList) {
    // return total millis 
    let millis = 0;
    if (timeAsList[0]!=0) {
        // if hrs, convert to millis
        millis = millis + (timeAsList[0] * 3600 * 1000); 
    } else if (timeAsList[1]!=0) {
        // if min, convert to millis
        millis = millis + (timeAsList[1] * 60 * 1000); 
    } else if (timeAsList[2]!=0) {
        // if sec, convert to millis 
        millis = millis + (timeAsList[2] * 1000); 
    } // end of if 

    return millis; 
} // end of f(x) 



function showDate() {
    // Display current date in browser. 

    today = new Date(); // UNIX time since epoch [ms]         
    dateToday = today.toLocaleDateString(); // Ex. '6/18/2020'
    todayDate.innerText = dateToday; 
};



function getDateInfo() {
    // Get date info as separate vars for data manipulation.

    dayOfMonth = today.getDate(); // day of month from 0-31 
    weekday = today.getDay(); // 0 is Sunday  
    month_index = today.getMonth(); // 0 is January
    month = convertMonth_returnDate(month_index); // return month's name 
    year = today.getUTCFullYear(); 
    dateVars = [month, dayOfMonth, year, weekday]; 

    return dateVars; 
}


// Test: It works! 
// > timeVars = [6, 1, 2020, 20, 0]; 
// > convertDate(timeVars); 
// (3) ["June", 1, 2020]
function convertMonth_returnDate(month_index) {
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

    month = months[month_index]; // Tested! Returns correct month 
    // return month as a string
    return month;   
 }




// Test: it works! 
// > let timeVars = [6, 1, 2020, 18, 30];
// > convertMilitaryTime (timeVars)
// (3) [6, 30, "PM"]
function convertMilitaryTime (timeVars) {
    // convert hours from 24-hr to 12-hr clock 
    // timeVars = [hours, minutes, seconds]
    let militaryHour = timeVars[0]; 

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
    // return [hour, minutes, seconds, AM/PM]
    return timeList = [hour, timeVars[1], timeVars[2], timeOfDay]; 
}; // end of convertMilitaryTime() 

