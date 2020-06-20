alert ('demo.js has loaded'); 



let startTime; 
let stopTime; 
let today; 
let tiff; 
let totalSeconds; 
let totalMinutes; 
let totalHours; 

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

let timeForResumingSession;
let timeLeftInSession; 





function showTimer(sessionDuration) {  
    console.log('showTimer started'); 

    timeLeftInSession = sessionDuration; 

    if (timeLeftInSession == 0) { 
        // If END OF SESSION
        // Show end of timer countdown.
        console.log('END OF SESSION'); 

        displayTimerTxt(totalHours, totalMinutes, totalSeconds); 
        stopSession = true; 
        clearInterval(show); 

        // Save session details in SQL. 

    } else if (startSession == true && pauseSession == true && stopSession == false) {
        // If SESSION PAUSED
        // Show paused timer in browser. 

        timeForResumingSession = timeLeftInSession; 
        clearInterval(show);
        displayTimerTxt(totalHours, totalMinutes, totalSeconds);         
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



function getHrMinSec () {
    // Convert current time into totalHours, totalMinutes, totalSeconds.

    timeAsList = []; 
    // Find time now. Fetch value for timeNow [ms].      
    tiff = timeNow - startTime; 
    console.log('Time difference: ', tiff); 

    // Convert milliseconds given to hr, min, sec. 
    let sec = tiff/1000; 
    console.log(sec); 
    console.log(typeof sec); 
    let min = tiff/60; 
    let hr = tiff/60;

    // Snippet below leads to errors for totalHours:  
    // > totalMinutes=Math.round(totalSeconds/60); 
    // 93  
    // > totalHours=Math.round(totalMinutes/60); 
    // 1547

            totalSeconds = Math.round(sec);
            console.log(totalSeconds); 
            console.log(typeof totalSeconds); 
            totalMinutes = Math.round(min);
            totalHours= Number.parseFloat(hr).toFixed(2);
            displayTimerTxt(totalHours, totalMinutes, totalSeconds); 





    return timeAsList; 

} // end of f(x) 

let timeNow = function () {
    // Fetch current time in milliseconds. 
    let currentTimeInMillis = new Date()

    return currentTimeInMillis; 
}


function displayTimerTxt (totalHours, totalMinutes, totalSeconds) {
    // Display timer info in browser. 
    timer.innerText = `Timer: ${totalHours} hrs ${totalMinutes} min ${totalSeconds} sec`;
} // end of f(x) 




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