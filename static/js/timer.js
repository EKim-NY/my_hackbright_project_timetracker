const pauseButton = document.querySelector('#pomodoro-pause'); 
const playButton = document.querySelector('#pomodoro-play'); 
const stopButton = document.querySelector('#pomodoro-stop'); 

let workSession = 25 * 3600 * 1000; // 25 min in milliseconds
let shortBreakSession = 5 * 3600 * 1000; // 5 min in ms 
let longBreakSession = 15 * 3600 * 1000; // 15 min in ms 

let timeInSession; // assign it a value later

// Initial values for timer stuff
let playBool = false; 
let startBool = false;  
let pauseBool = false; 
let stopBool = false; 

let getTime; //  int; total millisec since epoch time aka 1/1/1970
// use timestamp to calculate how much time passed 
// -> convert to human-readable form later before displaying it to user
// add timezone 
let startHour; // int; get hour in military time 
let startMinute; // int
let day; // int; 0 is Sunday  
let month; // int; 0 is January 

let hour; // int; 12-hr clock 
let timeOfDay; // str
let militaryHour // int; 24-hr clock 

let timer = document.querySelector('.timerTxt'); // display timer 

// DOM dropdown value 
const sessionTypeOption = document.querySelector('.session_type'); 

playButton.addEventListener('click', () => {
    playBool = true; 

    // PSEUDOCODE
    // If session is 'Work': 
    //  Set timer to prefixed value 
    //  (eg, 25 min, 15 min, 5 min. or custom)
    //  Start timer 
    //    Log date and time of start session in SQL 
    //    Set startBool = false 
    //    Display timer in DOM 
    //    Decrement actual timer 
    //    When it hits zero, stop function
    //      Log date and time of end session in SQL 
})

    // For selected session, set timer to prefixed value and start timer
    // Save session details in SQL => do this in Flask? 
    if (sessionTypeOption.value == "work") {
        callTimer(workSession); 
    } else if (sessionTypeOption.value == "short_break"){
        callTimer(shortBreakSession);
    } else if (sessionTypeOption.value == "long_break"){
        callTimer(longBreakSession); 
    }

function callTimer(sessionDuration) {
    startBool = true; // Timer on  
    DateAndTime(); 
    timeInSession = sessionDuration; 
    // setInterval(f(x), y [millisec]) 
    // executes f(x) per sec during total duration y  
    setInterval(() => {
        timeInSession--; // decrements per 1 s
        // display time in DOM 
        if (timeInSession == 0 && startBool == true) {
            alert('Session ended!'); 
            startBool = false; // turn timer off 
        } // end of if 
    }, sessionDuration); // end of setInterval() 
}; // end of callTimer() 

    
function DateAndTime() {
    // get current time 
    // convert JS format to SQL format 
    // export info to pSQL

    // if Play button has been clicked 
    if (playBool == true && pauseBool == false) {
        let today = new Date(); // changes w/each call
        // save the following in SQL: 
        epochTime = today.getTime(); // [ms]
        startHour = today.getHours(); // military time 
        startMinute = today.getMinutes(); 
        dayOfMonth = today.getDate(); // day of month from 0-31 
        // weekday = today.getDay(); // 0 is Sunday  
        month = today.getMonth(); // 0 is January
        year = today.getUTCFullYear(); 
        let timeVars = [month, dayOfMonth, year, startHour, startMinute]; 
        displayTimer(timeVars); 
    } // end of if 

} // end of DateAndTime() 


function displayTimer(timeVars) {
    Date(epochTime); // convert epochTime to a human-friendly datetime str
    //'Wed Jun 17 2020 00:00:51 GMT+0000 (Coordinated Universal Time)'
    convertDate(timeVars); 
    // return dateList = [month, day, year]
    let convertedTime = convertMilitaryTime(timeVars); 
    // return timeList = [hour, minutes, AM/PM]

    // display time in browser 
    timer.textContent = 
        `${convertedTime[0]}':' ${convertedTime[1] ${convertedTime[2]}`;
        
}; 


const convertDate = ((timeVars) => {
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

    month = months[timeVars[0]]; 
    // return [month, day, year]
    return dateList = [month, timeVars[1], timeVars[2]]; 
 }); // end of convertDate() 


function convertMilitaryTime (timeVars) {
    // convert hours from 24-hr to 12-hr clock 
    // timeVars = [month, dayOfMonth, year, startHour, startMinute]
    militaryHour = timeVars[3]; 
    if (militaryHour == 0 || militaryHour == 24) {
        hour = 12; 
        timeOfDay = 'AM'; 
    } else if militaryHour == 12 {
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