let currentQuestion = "";
let currentRole = "";

async function startInterview(){

const apiKey =
document.getElementById("apiKey").value.trim();

if(!apiKey){
alert("Please enter Gemini API Key");
return;
}

currentRole =
document.getElementById("role").value;

document
.getElementById("interviewSection")
.classList.remove("hidden");

await generateQuestion();
}

async function generateQuestion(){

const apiKey =
document.getElementById("apiKey").value.trim();

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:
`Act as an interviewer for a ${currentRole} position.
Ask exactly one interview question.`
}
]
}
]
})
}
);

const data = await response.json();

currentQuestion =
data.candidates[0].content.parts[0].text;

document.getElementById("questionBox")
.innerText = currentQuestion;

}
catch(error){

document.getElementById("questionBox")
.innerText =
"Error generating question.";

console.error(error);

}
}

async function submitAnswer(){

const answer =
document.getElementById("answer").value.trim();

if(!answer){
alert("Please enter an answer");
return;
}

const apiKey =
document.getElementById("apiKey").value.trim();

document.getElementById("feedback")
.innerText = "Evaluating...";

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:
`
Question:
${currentQuestion}

Candidate Answer:
${answer}

Evaluate the answer.

Give:
1. Score out of 10
2. Strengths
3. Improvements
4. One follow-up question
`
}
]
}
]
})
}
);

const data = await response.json();

const feedback =
data.candidates[0].content.parts[0].text;

document.getElementById("feedback")
.innerText = feedback;

document.getElementById("answer").value = "";

setTimeout(()=>{
generateQuestion();
},3000);

}
catch(error){

document.getElementById("feedback")
.innerText =
"Error evaluating answer.";

console.error(error);

}
}
