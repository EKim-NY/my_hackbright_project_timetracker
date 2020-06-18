let workSession = 25 * 60; // 25 min in seconds
let shortBreakSession = 5 * 60; // 5 min in seconds 
let longBreakSession = 15 * 60; // 15 min in seconds 

let timeInSession; // assign it a value later
let sessionDuration; // chronological length of session 



let getTime; //  int; total millisec since epoch time aka 1/1/1970
// use timestamp to calculate how much time passed 
// -> convert to human-readable form later before displaying it to user
// add timezone 
let epochTime; // int; total milliseconds since epoch (ie, 1/1/1970) 
// Note: difference of epochTimes taken on the same day at different times is zero 
//       BUT converting the epochTime into a date/time show different times
let startHour; // int; get hour in military time 
let startMinute; // int
let day; // int; 0 is Sunday  
let month; // int; 0 is January 
let hour; // int; 12-hr clock 
let timeOfDay; // str
let militaryHour // int; 24-hr clock 

let timer = document.getElementById("timerTime");
let clock = document.getElementById("clockTime"); 
let play = document.getElementById("pomodoro-play"); // select Play button 

play.addEventListener('click', () => {

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

    playBool = true; // user clicked Play button 
    // For selected session, set timer to prefixed value and start timer
    // Save session details in SQL => do this in Flask? 
    
    // DOM dropdown value 
    // const sessionTypeOption = document.querySelector('.session_type'); 

    let dropdown = document.getElementById("session_type"); 
    // Select DOM node containing all dropdown options 
    let session = dropdown.options[dropdown.selectedIndex].value; 
    // From the dropdown options, return the value (ie, displayed text) 
    // of the selected option (identify by index of dropdown option)
    // Note: Dropdown option indices start with 0 (just like for an array)

    if (session == 'Work') {
        callTimer(workSession); 
    } else if (session == "Short Break"){
        callTimer(shortBreakSession);
    } else if (session == "Long Break"){
        callTimer(longBreakSession); 
    }


}); 




// Check if these values can be passed into SQL. 
let startTime; 
let stopTime; 
let today; 
let tiff; 
let totalSeconds; 
let totalMinutes; 
let totalHours; 

// Test: no discernible syntax errors but callTimer() doesn't work properly. 
function callTimer(sessionDuration) {
    startBool = true; // Timer on  

    // setInterval(f(x), time-interval) executes f(x) every time-interval 
    // EX: setInterval(myTimer, 1000) executes myTimer every 1000 milliseconds

    // this snippet works in Repl.it but not sure about timer.innerText 
    let timeInSession = sessionDuration; 
    startTime = Date.now(); 
    let show = setInterval(() => {
        // For every second that passes, show clock and timer countdown. 
        // Display clock time. 
        let today = Date.now(); 
        clock.innerText = today.toLocaleTimeString(); 
        timeInSession--; 
        if (timeInSession == 0) { 
            stopTime = Date.now(); 
            startBool = false; 
            clearInterval(show); 
        } else { 
        // Continue displaying timer if countdown hasn't ended. 
            tiff = stopTime - startTime; 
            totalSeconds = Math.floor(tiff/1000); 
            totalMinutes = Math.floor(tiff/60);
            totalHours = Math.floor(tiff/60); 
            timer.innerText = 'Timer: ${totalHours}hrs ${totalMinutes}min ${totalSeconds}sec'; 
        }; 

    }, 1000);





// setInterval(f(x), 1000) executes function() every 1000 ms or 1 s 
// setInterval will continue executing unless clearInterval stops it
//------------------------------------------------------------


let timeVars; 
let date; 
let time; 
let dateTimeList; 
// Test: It works! (independently of prior f(x)'s)
// > DateAndTime(); 
// 10:10 PM   => browser displays actual current time but only when f(x) is called
function DateAndTime() {
    // get current time 
    // convert JS format to SQL format 
    // export info to pSQL


        let today = new Date(); // changes w/each call
        // save the following in SQL: 
        epochTime = today.getTime(); // [ms]
        startHour = today.getHours(); // military time 
        startMinute = today.getMinutes(); 
        dayOfMonth = today.getDate(); // day of month from 0-31 
        // weekday = today.getDay(); // 0 is Sunday  
        month = today.getMonth(); // 0 is January
        year = today.getUTCFullYear(); 
        timeVars = [month, dayOfMonth, year, startHour, startMinute]; 

        date = today.toLocaleDateString(); // '2:23:26 AM'
        time = today.toLocaleTimeString(); // '6/18/2020'
        dateTimeList = [date, time]; 
        
        shortDisplayTimer(dateTimeList); 
    }; // end of if 
}; // end of DateAndTime() 



// Test: It works! 
// > timeVars = [6, 1, 2020, 20, 0]; 
// > convertDate(timeVars); 
// (3) ["June", 1, 2020]
function convertDate(timeVars) {
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
 }; // end of convertDate() 



// Test: It works! (even for edge case of 00 minutes)
// // > timeVars = [6, 1, 2020, 20, 0]; 
// > displayTimer(timeVars); 
// DOM: 8:00 PM
function shortDisplayTimer(timeVars) {
    // Date(epochTime); // convert epochTime to a human-friendly datetime str
    //'Wed Jun 17 2020 00:00:51 GMT+0000 (Coordinated Universal Time)'

    convertDate(timeVars); 
    return dateList = [month, day, year]
    let convertedTime = convertMilitaryTime(timeVars); 
    return timeList = [hour, minutes, AM/PM]

    // display time in browser 
    // --- NOTES ---------------
    // JS cares about whitespace
    // If `string` is placed on a separate line, 
    // then timer.textContent = Null 

    if (convertedTime[1] >= 0 && convertedTime[1] < 10){
        // EDGE CASE: Display minutes less than 10 as 00 to 09 in browser
        let displayMinutes = '0' + convertedTime[1]; 
        timer.innerText =`${convertedTime[0]}:${displayMinutes} ${convertedTime[2]}`;
    } else {
    timer.innerText =`${convertedTime[0]}:${convertedTime[1]} ${convertedTime[2]}`;
    }
};




function longDisplayTimer(dateTimeList) {
    // Alternate option: Discovered these methods after I'd already coded the above stuff! 

    timer.innerText = dateTimeList[1]; // display local time 
}; 




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

