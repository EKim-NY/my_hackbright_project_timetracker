"use strict"; 

// alert('timer.js has loaded'); 


// Note: 
// 
// Issue 1- 
// When user tries to start a new session after stopping a previous session, 
// the timer doesn't work as expected. User must click SUBMIT for a page reload 
// then choose the session interval, then click PLAY button. 
// 
// Issue 2- 
// Trying to get the timer to display "0 hrs 0 min 0 sec" when user clicks STOP 
// causes the timer to go wonky. 

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

let startSession = false; 
let pauseSession = false; 
let stopSession = false; 

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
// In JS: 
// timeLeftInSession was changed to a local var to be passed in as an arg for f(x)'s 
// b/c having it as both a global and as an arg caused conflict
let timeAsList = []; 
let total_time; 
let total_time_left; 
let hr; 
let min; 
let sec;  
let result; 





// Event Listeners 
play.addEventListener('click', () => {

    if (startSession == false && pauseSession == false && stopSession == false){
        // START NEW SESSION 
        startSession = true; 
        getSelectedSession(); 
        showTimerCountdown(sessionDuration); 
        // alert('New Session has started'); 


    } else if (startSession == true && pauseSession == true && stopSession == false){
        // RESUME CURRENT SESSION
        pauseSession = false; 
        const timeRemaining = (1000*((hr*3600) + (min * 60) + sec)); 
        showTimerCountdown(timeRemaining); 
        // alert('Resume current session'); 
    } else {
        // When user pauses session but doesn't stop it before selecting a new session,
        // the timer for the previous session continues displaying. 
        // Notify user that the previous session must be stopped first before a new one can start. 
        showTimerCountdown(timeLeftInSession); 
        // alert('Keep session going'); 

    }
});


pause.addEventListener('click', (session) => {
    if (startSession == true && pauseSession == false && stopSession == false){
            pauseSession = true; 
            displayTimerTxt(); 
            clearInterval(result); 
            // alert('Paused session'); 
    }
});



stop.addEventListener('click', (session) => {
 
    if (startSession == true && stopSession == false){
    timeAsList=[0,0,0];  
    displayTimerTxt(); 
    clearInterval(result); 
    // Reset boolean values for the next session
    startSession = false; 
    pauseSession = false; 
    stopSession = false; 
    }
}); 



function getSelectedSession () {

    dropdown = document.getElementById("session_type");
    // dropdown.options[0].disabled = true; // Disable 'Select' dropdown option. 
    session = dropdown.options[dropdown.selectedIndex].value; 
    // console.log('session', session); 

    // if (session != "select"){
        if (session == 'work') {
            // console.log('dropdown: Work');
            sessionDuration = 0.30 * 60 * 1000 ; 

        } else if (session == "short_break"){
            // console.log('dropdown: Short break');
            sessionDuration = 0.10 * 60 * 1000; 

        } else if (session == "long_break"){
            // console.log('dropdown: Long Break');
            sessionDuration = 0.25 * 60 * 1000; 
        } 

        // TO-DO: Add "Select" option to dropdown box.
        // Curent bug: sessionDuration keeps displaying for "Select" option. 
        //             Timer displays NaaN error in HTML.  
        // } else if (session == "select"){
        //     timeLeftInSession = 0; 
        //     startSession = false; 
        //     pauseSession = false; 
        //     stopSession = false; 
        // }
    // } //end of outer IF-ELSE

} //end of f(x) 



function showTimer(timeLeftInSession) {  
    // show timer countdown when user selects event 
    // timeLeftInSession [milliseconds]
    convert_timeLeftInSession(timeLeftInSession); 
    displayTimerTxt(); 
} // end of f(x)



function showTimerCountdown(timeLeftInSession) {
    // Show timer every 1000 ms.
    // console.log('Time left in session', timeLeftInSession); 
    result = setInterval(() => {

        if (timeLeftInSession != 0){
            showTimer(timeLeftInSession); 
            timeLeftInSession = timeLeftInSession - 1000; 

        } else if (timeLeftInSession == 0){
            startSession = false; 
            pauseSession = false; 
            stopSession = false; 
            clearInterval(result); 
            showTimer(timeLeftInSession);
            let timestamp = new Date(); 

            // Display session log in browser

            // For testing: 
            // $.post('/save_session', {'date':'DATE'}, (res) => {
            //     console.log(res); 
            // }); 


            let hiddenProjectID = document.getElementById("hidden-project-id").innerText; 
            
            // Create a JS object to send to server to be saved in SQL. 
            let session_to_send = {
                'project_id': hiddenProjectID, 
                'session_type': session, 
                'session_length': sessionDuration, 
                'session_date_for_parsing': new Date(), 
                'session_timestamp': timestamp
            }

            // res (response) comes from the server ; not input param! 
            $.post('/save_session', session_to_send, (response) => {
                let sessionObject = JSON.parse(response); 
                let sessionLog = document.getElementById('session_log'); 
                // $('#session_log').append(`<p>Completed session: ${sessionObject['session_type']} ${sessionObject['session_timestamp']}</p>`)
                $('#session_log').prepend(`<li>${sessionObject['session_type']} ${sessionObject['session_length']} ${sessionObject['session_timestamp']}</li>`)
                
                // displayCompletedSessionDetails(sessionObject)


                // To-Do: 
                // Parse sessionObject for time (make it human-readable). 

                // For debugging: 
                // console.log(sessionObject); 
                // console.log(sessionObject[0]); 
                // console.log(sessionObject[1]); 
                // console.log(sessionObject["session_type"]);
                // console.log(sessionObject["session_timestamp"]);     

            }); 
        } 
    }, 1000); // end of setInterval() 
} // end of f(x)


// function displayCompletedSessionDetails(sessionObject) {
//     // body...


//                 displayCompletedSessionType 
//                 displayCompletedSessionDate
//                 displayCompletedSessionDuration

//                     session_python_dict = {"session_type": s_type, 
//                            "session_length": s_len, 
//                            "session_date_for_parsing": s_date, 
//                            "session_timestamp": s_time}

// }


// function displayCompletedSessionType(sessionObject){
//     // Display session type in browser. 
//     if (sessionObject.session_type == 

// }

function convert_timeLeftInSession(timeLeftInSession) {
    // console.log('convert_timeLeftInSession', timeLeftInSession); 
    // timeLeftInSession [milliseconds]
    // Return timeLeftInSession [s] as hours, minutes, seconds in list form.

    if (timeLeftInSession != 0){
        // timeLeftInSession is given in milliseconds 
        total_time = timeLeftInSession/1000; // convert to seconds
        hr = Math.floor(total_time/3600); // extract HOURS
        total_time_left = total_time % 3600; // get remaining time [s]
        min = Math.floor(total_time_left/60); // extract MINUTES
        sec = total_time % 60; // remaining time [s] gives us SECONDS 
        timeAsList = [hr, min, sec]; 

    } else if (timeLeftInSession == 0) {
        timeAsList = [0, 0, 0]; 
    } 



    // console.log('timeAsList', timeAsList); 
    // console.log('time:', hr, min, sec); 
    // console.log(timeAsList[0], 'hrs', timeAsList[1] , 'min', timeAsList[2], 'sec'); 

    return timeAsList 
} // end of f(x) 



function displayTimerTxt () {
    // Display timer info in browser. 
    timer.innerText = `Timer: ${timeAsList[0]} hrs ${timeAsList[1]} min ${timeAsList[2]} sec`;
    // console.log('In displayTimerTxt():', timer.innerText) 
} // end of f(x) 





function showClock() {
// showClock starts when page is loaded

    // Replaced startTime = Date.now() with startTime = new Date()
    let showClockTime = setInterval(() => {
        let today = new Date(); 
        clock.innerText = today.toLocaleTimeString(); 
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
}



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


// Call functions here
showClock(); 
showDate(); 