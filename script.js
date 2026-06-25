let currentQuestion = "";
let currentRole = "";

async function startInterview() {

    const apiKey =
    document.getElementById("apiKey").value.trim();

    if (!apiKey) {
        alert("Please enter Gemini API Key");
        return;
    }

    currentRole =
    document.getElementById("role").value;

    document
    .getElementById("interviewSection")
    .classList.remove("hidden");

    document.getElementById("feedback").innerHTML = "";

    await generateQuestion();
}

async function generateQuestion() {

    const apiKey =
    document.getElementById("apiKey").value.trim();

    document.getElementById("questionBox")
    .innerText = "Generating question...";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
                                    `Act as an interviewer for a ${currentRole} position.
Ask exactly one technical interview question.
Do not provide the answer.`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (!data.candidates) {
            document.getElementById("questionBox").innerText =
            "API Error. Check console (F12).";
            return;
        }

        currentQuestion =
        data.candidates[0].content.parts[0].text;

        document.getElementById("questionBox")
        .innerText = currentQuestion;

    }
    catch (error) {

        console.error(error);

        document.getElementById("questionBox")
        .innerText =
        "Failed to connect to Gemini API.";
    }
}

async function submitAnswer() {

    const answer =
    document.getElementById("answer").value.trim();

    if (!answer) {
        alert("Please enter an answer");
        return;
    }

    const apiKey =
    document.getElementById("apiKey").value.trim();

    document.getElementById("feedback")
    .innerText = "Evaluating answer...";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
`
Question:
${currentQuestion}

Candidate Answer:
${answer}

Evaluate this answer.

Give:

Score out of 10

Strengths

Weaknesses

Improvement suggestions

One follow-up interview question
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (!data.candidates) {

            document.getElementById("feedback")
            .innerText =
            "Evaluation failed. Check console (F12).";

            return;
        }

        document.getElementById("feedback")
        .innerText =
        data.candidates[0].content.parts[0].text;

        document.getElementById("answer").value = "";

        setTimeout(() => {
            generateQuestion();
        }, 3000);

    }
    catch (error) {

        console.error(error);

        document.getElementById("feedback")
        .innerText =
        "Failed to evaluate answer.";
    }
}
