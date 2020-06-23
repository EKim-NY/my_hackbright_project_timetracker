
let timeAsList; // [hours, minutes, seconds]





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