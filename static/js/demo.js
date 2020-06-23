
let timeVarList; // [hours, minutes, seconds]


function showTimer(sessionDuration) {  
    // show timer countdown when user selects event 
    timeLeftInSession = Math.round(sessionDuration/1000); // convert millisec to sec 
    console.log('showTimer started session', timeLeftInSession); 

    timeVarList = convert_timeLeftInSession(timeLeftInSession); 

    // Setinterval(showTimer(timeLeftInSession), 1000) 
    let showTimerCountdown (() => {

        if (timeLeftInSession == 0) { 
            // Session has ended naturally.
            displayTimerTxt(timeVarList); 
            stopSession = true; 
            clearInterval(show); 

            console.log('END SESSION'); 
            // Save session details in SQL. 

        } else if (startSession == true && pauseSession == true && stopSession == false) {
            // If SESSION PAUSED
            // Show paused timer in browser. 
            displayTimerTxt(timeVarList); 
            clearInterval(show); 
            timeForResumingSession = timeLeftInSession; // track how much of the session time is left 
            console.log('Session has paused'); 

        } else if (startSession == true && pauseSession == false && stopSession == false) {
            // If NEW SESSION STARTED
            // Show timer countdown. 
            displayTimerTxt(timeVarList); 
            console.log('New Session'); 

        } else if (startSession == true && pauseSession == true && stopSession == false) {
            // If RESUME SESSION
            // Continue timer countdown. 
            timeLeftInSession = timeForResumingSession; 
            displayTimerTxt(timeVarList); 
            console.log('Resume Session'); 

        } else if (startSession == true && pauseSession == false && stopSession == true) {
            // STOP SESSION before timer reaches 0:00:00.
            // Don't send session details to SQL. 
            // End timer countdown. 
            // Set timer to 0:00:00. 
            displayTimerTxt(timeVarList); 
            stopTime = new Date(); // save to SQL 
            console.log('Stop session'); 
        }; // end of if 

        timeLeftInSession--; // decrement with every passing second
        // return new timeVarList for each passing second -> to display timer 
        timeVarList = convert_timeLeftInSession(timeLeftInSession); 
    }, 1000); // end of showTimerCountdown()
}; // end of f(x) 



function convert_timeLeftInSession(timeLeftInSession) {
    // Return timeLeftInSession [ms] as hours, minutes, seconds in list form.

    if (timeLeftInSession != 0){
        let timeAsList = []; 
        // let today = new Date(); 
        // let timeNow = today.getTime(); 
        let tiff = timeNow - startTime; // total milliseconds

        // Convert milliseconds given to hr, min, sec. 
        let sec = tiff/1000; // convert all milliseconds to seconds 
        let min = sec/60; // convert all to minutes 
        let hr = min/60; // covert all to hours 

        let rsec = Math.round(sec % 60); // remaining sec
        let rmin = Math.round(min % 60); // remaining min 
        let rhour = Math.round(hr % 60); // hours only 

        console.log('Hr remaining', rhour); 
        console.log('Min remaining', rmin); 
        console.log('Sec remaining', rsec); 

    } else if (timeLeftInSession == 0) {
        timeAsList = [0, 0, 0]; 
    }

    return timeAsList = [rhour, rmin, rsec]; 

} // end of f(x) 



function displayTimerTxt (timeAsList) {
    // Display timer info in browser. 
    timer.innerText = `Timer: ${timeAsList[0]} hrs ${timeAsList[1]} min ${timeAsList[2]} sec`;
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