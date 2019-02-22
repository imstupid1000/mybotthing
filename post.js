const url='https://discordbots.org/api';
const Http = new XMLHttpRequest();
Http.open("POST", url);
Http.send('Authorization:	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2NDgxMTYxMzcwODc0Njc1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNDgzMDk5MjAwfQ.8tpNASxdSsfkVF7YparhyV1Ouy5ORQ3AM2jitd_Y-PI');
Http.onreadystatechange=(4)=>{
console.log(Http.responseText)
}
