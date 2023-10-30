$(document).ready(function () {
    let currentQuestion = 0;
    let currentTime = 0
    let score = 0;
    let theTimer = null;
    const STARTING_TIMER = '2:00';
    const questions = [
        {
            question: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: 1,
        },
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 2,
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Venus", "Jupiter"],
            correctAnswer: 1,
        },
        {
            question: "What is the largest mammal?",
            answers: ["Elephant", "Giraffe", "Whale Shark", "Blue Whale"],
            correctAnswer: 3,
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: ["Ag", "Ge", "Au", "Hg"],
            correctAnswer: 2,
        },
    ];

    $("#start-button").on("click", function () {
        $(this).hide();
        $(".options").show();
        theTimer = setInterval(() => {
            setTimer();
        }, 1000);
        loadQuestion(currentQuestion);
    });

    $(".option").on("click", function () {
        const selectedAnswer = $(this).data("answer");
        const correctAnswer = $(this).data('correctanswer');
        console.log({selectedAnswer})
        console.log({correctAnswer})
        console.log({isCorrect: selectedAnswer === correctAnswer})
            if (parseInt(selectedAnswer) === parseInt(correctAnswer)) {
                alert('Uppercut')
                score += 20;
                currentQuestion++;
                var addedTime = moment.utc(currentTime,'mm:ss').add(20,'seconds').format('mm:ss');
                setTimer(addedTime);
            } else {
                alert('Low Blow')
                score -= 20;
                currentQuestion++;
                var subtractedTime = moment.utc(currentTime,'mm:ss').subtract(20,'seconds').format('mm:ss');
                setTimer(subtractedTime);
            }
            if (currentQuestion < questions.length) {
                loadQuestion(currentQuestion);
            } else {
                endQuiz();
            }
    });
    $("#save-score").on("click", function () {
        console.log($('#store-info').val())
        var players = []; // will be array of objects; each object has initial SG and score 100

        // Were there old players Im adding the score to?
        if(localStorage.getItem("players")) {
            players = localStorage.getItem("players") // string
            players = JSON.parse(players); // array. Hint: parse returns array or object
        }

        // Checkpoint: players now have an array of old players or, it's an empty array (if you're the first player on the leaderboard)
        // push is adding something new to an array
        var playerStats = {initials:$('#store-info').val(), score:score}
        players.push(playerStats);

        localStorage.setItem("players", JSON.stringify(players))
    })
        
       
    $("#restart-button").on("click", function () {
        currentQuestion = 0;
        score = 0;
        $("#time-left").text(STARTING_TIMER);
        loadQuestion(currentQuestion);
        $(".score-container").hide();
        $(".options").show();
        $("#start-button").show();
    });

    function loadQuestion(index) {
        $("#question").text(`Question ${index + 1}: ${questions[index].question}`);
        $(".option").each(function (i) {
            $(this).attr('data-answer', i);
            $(this).attr('data-correctanswer', questions[index].correctAnswer);
            $(this).text(`${String.fromCharCode(65 + i)}. ${questions[index].answers[i]}`);
        });
    }

    function setTimer(givenTime) {
        if (!givenTime) {
            currentTime = $("#time-left").text();
            var newTime = moment.utc(currentTime,'mm:ss').subtract(1,'second').format('mm:ss');
            $("#time-left").text(newTime);
        } else {
            currentTime = givenTime;
            $("#time-left").text(currentTime);
        }
    }

    function endQuiz() {
        $(".options").hide();
        if (score <= 0) {
            score = 0;
        }
        $("#score").text(score);
        $(".score-container").show();
        clearInterval(theTimer);
        // if (score === 100) {
        //     alert("Uppercut!");
        // } else {
        //     alert("Low Blow.");
        // }
    }
});

