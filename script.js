let currentQuestions = [];
let currentIndex = 0;
let answers = [];

function startInterview(){

    const role =
    document.getElementById("role").value;

    currentQuestions =
    questionBank[role];

    currentIndex = 0;
    answers = [];

    document.getElementById("interview")
    .style.display = "block";

    showQuestion();
}

function showQuestion(){

    document.getElementById("question")
    .innerText =
    currentQuestions[currentIndex];

    document.getElementById("progress")
    .innerText =
    `Question ${currentIndex + 1} of ${currentQuestions.length}`;

    document.getElementById("answer").value = "";
}

function nextQuestion(){

    let answer =
    document.getElementById("answer").value;

    answers.push(answer);

    currentIndex++;

    if(currentIndex < currentQuestions.length){

        showQuestion();

    }else{

        finishInterview();

    }
}

function finishInterview(){

    let score = 0;

    answers.forEach(answer=>{

        if(answer.trim().length > 20){
            score++;
        }

    });

    document.getElementById("interview")
    .style.display="none";

    document.getElementById("result")
    .innerHTML = `

        <h2>Interview Complete</h2>

        <p>
        Score:
        ${score}/${currentQuestions.length}
        </p>

        <p>
        Answers submitted:
        ${answers.length}
        </p>

    `;

}
