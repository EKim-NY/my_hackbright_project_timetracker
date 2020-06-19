"use strict"; 

alert('timer.js has loaded'); 

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

let startTime; 
let stopTime; 
let today; 
let tiff; 
let totalSeconds; 
let totalMinutes; 
let totalHours; 

let timeForResumingSession;
let timeAsList; 



// Event Listeners 
play.addEventListener('click', () => {
    console.log('Click Play'); 
    // Check if new session 
    if (startSession == false && pauseSession == false && stopSession == false) { 
        console.log('start new session'); 
        // Select DOM node containing all dropdown options 
        // Dropdown option indices start with 0 (just like for an array)
        startSession = true; 
        dropdown = document.getElementById("session_type");
        session = dropdown.options[dropdown.selectedIndex].value; 
        getSelectedSession(session); 

    // Resume current session
    } else if (startSession == true && pauseSession == true && stopSession == false) {
        console.log('resume session');
        pauseSession = false; 
    } else {
        alert('Please close prior session first starting or resuming a session.'); 
    }
}); 


pause.addEventListener('click', (session) => {
    if (startSession == true && pauseSession == false && stopSession == false) {
        console.log('pause session');
        pauseSession = true; 
    } else {
        alert('A session must be playing before it can be paused.'); 
    }
}); 


stop.addEventListener('click', (session) => {
    if (startSession == true && pauseSession == false && stopSession == false) {
        console.log('stop session');
        stopSession = true; 
    } else if (startSession == true && pauseSession == true && stopSession == false){
        console.log('cancel paused session'); 
        alert('Current session will not be saved.'); 
        stopSession = true; 
    }
}); 



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
}; 

function showTimer(sessionDuration) {  
    console.log('showTimer started'); 
    // setInterval(f(x), time-interval) executes f(x) every time-interval 
    // EX: setInterval(myTimer, 1000) executes myTimer every 1000 milliseconds

    // this snippet works in Repl.it but not sure about timer.innerText 
    timeLeftInSession = sessionDuration; 

    if (timeLeftInSession == 0) { 
        // If END OF SESSION
        // Show end of timer countdown. 
        // Save session details in SQL. 
        stopSession = true; 
        clearInterval(show); 
        console.log('Session has ended'); 

    } else if (startSession == true && pauseSession == true && stopSession == false) {
        // If SESSION PAUSED
        // Show paused timer in browser. 

        timeForResumingSession = timeLeftInSession; 
        clearInterval(show);
        console.log('Session has paused'); 

    } else if (startSession == true && pauseSession == false && stopSession == false) {
        // If SESSION STARTED
        // Show start of timer countdown. 


    } else if (startSession == true && pauseSession == true && stopSession == false) {
        // If RESUME SESSION
        // Continue timer countdown. 


    } else if (startSession == true && pauseSession == false && stopSession == true) {
        // TOP SESSION FOR GOOD
        // Don't send session details to SQL. 
        // Future work: Ask user if user wants to save/cancel session. 
        // End timer countdown. 
        // Set timer to 0:00:00. 
        stopTime = new Date(); 
    }; // end of if 

}; // end of f(x) 








function showClock(sessionDuration) {
// showClock starts when user starts session. 
// showClock ends when: 
//   timer countdown ends naturally
//   user pauses session
//   user stops session

// code to display clock when user hits PLAY 
    timeLeftInSession = sessionDuration;
    // Replaced startTime = Date.now() with startTime = new Date()
    startTime = new Date(); 
    console.log('Start clock'); 
    // Clock will continue showing until countdown ends. 
    let show = setInterval(() => {
        if (timeLeftInSession == 0) {
                clearInterval(show); 
        } else {
            let today = new Date(); 
            clock.innerText = today.toLocaleTimeString(); 
            timeLeftInSession--; 
        } // end of if-else 
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

