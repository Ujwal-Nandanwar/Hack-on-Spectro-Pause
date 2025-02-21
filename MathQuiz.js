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

function generateQuestion()
{
    const questionData = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion = questionData;
    document.getElementById('question').innerText = questionData.question;
    generateOptions(questionData.answer);
}

function generateOptions(correctAnswer)
{
    let options = new Set();
    options.add(correctAnswer);

    while (options.size < 4)
    {
        let randomOffset = Math.floor(Math.random() * 10) - 5;
        let incorrectAnswer = correctAnswer + randomOffset;
        if (incorrectAnswer !== correctAnswer && incorrectAnswer >= 0)
        {
            options.add(incorrectAnswer);
        }
    }

    let optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    optionsArray.forEach(option =>
    {
        let button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(button, option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer)
{
    if (selectedAnswer === currentQuestion.answer) 
    {
        xp += 10;
        button.classList.add('correct');
        document.getElementById('feedback').innerText = "Correct! Well done.";
        setTimeout(() =>
        {
            document.getElementById('feedback').innerText = "";
        }, 1000);
        document.getElementById('reward-section').innerText = "You've earned 10 XP!";
        setTimeout(() =>
        {
            document.getElementById('reward-section').innerText = "";
        }, 1000);
        document.getElementById('xp').innerText = xp;
        checkLevelUp();
    }
    else
    {
        button.classList.add('incorrect');
        document.getElementById('feedback').innerText = "Oops! Try again.";
        setTimeout(() =>
        {
            document.getElementById('feedback').innerText = "";
        }, 1000);

        if (chances === 1)
        {
            xp = 0;
            level = 1;
            chances = 3;
            document.getElementById('xp').innerText = xp;
            document.getElementById('level').innerText = level;
            document.getElementById('chances').innerText = chances;
            document.getElementById('restart').innerText = "RESTART";
            setTimeout(() =>
            {
                document.getElementById('restart').innerText = "";
            }, 1000);
            
        }
        else
        {
            chances--;
            document.getElementById('reward-section').innerText = chances + " chances left";
            document.getElementById('chances').innerText = chances;
            setTimeout(() =>
            {
                document.getElementById('reward-section').innerText = "";
            }, 1000);
        }
    }

    // Disable all buttons after selection
    document.querySelectorAll('#options button').forEach(btn => btn.disabled = true);

    setTimeout(generateQuestion, 1000);
}

function checkLevelUp()
{
    if (xp >= level * 30)
    {
        level++;
        xp = 0;
        document.getElementById('level').innerText = level;
        document.getElementById('xp').innerText = xp;
        document.getElementById('reward-section').innerText = `Congratulations! You've leveled up to Level ${level}!`;
    }
}

generateQuestion();
