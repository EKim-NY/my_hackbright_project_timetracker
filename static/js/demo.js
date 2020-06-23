
let timeVarList; // [hours, minutes, seconds]


function showTimer(sessionDuration) {  
    // show timer countdown when user selects event 
    console.log('showTimer started session', sessionDuration); 
    timeLeftInSession = sessionDuration/1000; // total milliseconds of session

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
        let convert_Millis_to_Total_Seconds = timeLeftInSession/1000; 
        hours = timeLeftInSession % 3600


    } else {
        timeVarList = [0, 0, 0]; 
    }




    return timeVarList = [hours, minutes, seconds]; 
}



function getHrMinSec () {
    // Convert current time into totalHours, totalMinutes, totalSeconds.

    timeAsList = []; 
    let timeNow = Date.now(); 
    // Find time now [ms].       
    // Convert milliseconds given to hr, min, sec. 
    let sec = timeNow/1000; 
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