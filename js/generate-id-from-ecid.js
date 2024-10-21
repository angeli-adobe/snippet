// This script allow you to generate an 8 DIGIT string, using the number of the ECID. This way, the output is consistent for the same ECID.

//  Read the ECID from the data element.
var ecid = _satellite.getVar("ECID"); // this is the data element generate by DSN

//  Random char position in the string.
var charPos = [10, 4, 23, 34, 12, 3, 30, 9];

//  Array to contain the final output
var out = []; 

charPos.forEach(i => { 
    out.push(ecid.charAt(i));
});
//  Return the sequence of number as string.
return out.join("");
