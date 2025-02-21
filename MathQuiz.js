// Initialize Game State
let level = 1;
let xp = 0, chances = 3;
let currentQuestion = {};
const questions = [
    { question: "Two poles of equal heights are standing opposite to each other on either side of the road which is 40 meters wide. From a point between them on the road, the angles of elevation of the top of the poles are 45∘ and 45∘ respectively. The height of both the poles is __ meters.", answer: 20 },
    { question: "The areas of two similar triangles are 25cm2 and 64cm2 respectively. If the median of first triangle is 6.5cm, the corresponding median of the other triangle is __ cm.?", answer: 10.4},
    { question: "Two isosceles triangles have equal vertical angles. If their areas are in the ratio 36:64, then what is h1 / h2 ?", answer: 0.75 },
    { question: "A recipe requires 2 cups of flour for every 3 cups of sugar. If a baker wants to make 40 cups of the mixture, how much flour does he need?", answer: 16 },
    { question: "A deck contains 52 cards. Two cards are drawn at random without replacement. What is the probability that both cards drawn are red?", answer: 0.24 },
    { question: "A ladder is leaning against a wall. The angle of elevation between the ladder and the ground is 30°, and the length of the ladder is 12 meters. How high up the wall does the ladder reach?", answer: 6},
    { question: "In a class, the ratio of the number of boys to girls is 5:4. If the total number of students in the class is 405, how many more boys are there than girls?", answer: 45},
    { question: "A factory produces gadgets in batches. In the first batch, 50% of the gadgets are defective. In the second batch, 40% are defective. The total number of gadgets produced in both batches is 800. If the total number of defective gadgets from both batches is 380, how many gadgets were produced in the first batch?", answer : 600},
    { question: "A tree is leaning against a building, forming an angle of 60° with the ground. The distance from the base of the tree to the wall of the building is 10 meters. What is the height of the building?", answer: 17.32},
    { question: "A bag contains 5 red balls, 7 green balls, and 3 blue balls. Two balls are drawn at random without replacement. What is the probability that both balls drawn are of the same color?", answer: 0.32},
    { question: "In a group of students, the ratio of boys to girls is 5:3. If 20 more boys join the group, the ratio becomes 7:3. How many students are there in the group initially?", answer: 80},
    { question: "A deck of 52 playing cards is shuffled. What is the probability of drawing a red card or a king?", answer: 0.53},
    { question: "A box contains 6 red marbles, 8 green marbles, and 10 blue marbles. Two marbles are drawn randomly without replacement. What is the probability that one marble is red and the other is green?", answer: 0.34}
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
            document.getElementById('restart').innerText = "Restarting the Game.. Wait a Moment";
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
