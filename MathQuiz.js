// Initialize Game State
let level = 1;
let xp = 0, chances = 3;
let currentQuestion = {};
const questions = [
    { question: "Two poles of equal heights are standing opposite to each other on either side of the road which is 40 meters wide. From a point between them on the road, the angles of elevation of the top of the poles are 45∘ and 45∘ respectively. The height of both the poles is __ meters.", answer: 20 },
    { question: "The areas of two similar triangles are 25cm2 and 64cm2 respectively. If the median of first triangle is 6.5cm, the corresponding median of the other triangle is __ cm.?", answer: 10.4},
    { question: "Two isosceles triangles have equal vertical angles. If their areas are in the ratio 36:64, then what is h1 / h2 ?", answer: 0.75 },
    { question: "What is 16 / 4?", answer: 4 },
    { question: "What is 9 + 10?", answer: 19 }
];

function generateQuestion() {
    const questionData = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion = questionData;
    document.getElementById('question').innerText = questionData.question;
    generateOptions(questionData.answer);
}

function generateOptions(correctAnswer) {
    let options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        let randomOffset = Math.floor(Math.random() * 10) - 5;
        let incorrectAnswer = correctAnswer + randomOffset;
        if (incorrectAnswer !== correctAnswer && incorrectAnswer >= 0) {
            options.add(incorrectAnswer);
        }
    }

    let optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    optionsArray.forEach(option => {
        let button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentQuestion.answer)
    {
        xp += 10;
        document.getElementById('feedback').innerText = "Correct! Well done.";
        document.getElementById('reward-section').innerText = "You've earned 10 XP!";
        document.getElementById('xp').innerText = xp;
        checkLevelUp();
    }
    else 
    {
        document.getElementById('feedback').innerText = "Oops! Try again.";

        if(chances === 0)
        {
            xp=0;
            level=1;
            document.getElementById('xp').innerText=xp;
            document.getElementById('level').innertext=level;
        }
        else
        {
            chances = chances - 1;
            document.getElementById('reward-section').innerText = chances+" chances left";
            document.getElementById('chances').innerText = chances;
        }
    }
    generateQuestion();
}

function checkLevelUp() {
    if (xp >= level * 30) {
        level++;
        xp=0;
        document.getElementById('xp').innerText= xp;
        document.getElementById('level').innerText = level;
        document.getElementById('reward-section').innerText = `Congratulations! You've leveled up to Level ${level}!`;
    }
}

generateQuestion();
