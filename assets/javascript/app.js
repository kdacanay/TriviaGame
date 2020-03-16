//pseudocode:
//display screen with maintitle displayed, brief description and start button only
//user clicks start button, timer begins from 20 seconds and decrements
//user must make selection by end of 20 seconds or question is automatically wrong
//if user selects correct answer, popup shows alerting user of correct choice, and funfact, correct answer count goes up
//if user selects incorrectly or does not make selection within 20 seconds, user is alerted to incorrect guess, incorrect answer count goes up
//message screen goes away, a few seconds pass then next randomly chosen question shows 
//process repeats until all 10 questions have been answered
//displays final scoreboard after all questions answered


$(document).ready(function () {
    //questions, questions, questions
    var questionsArray = [

        {
            question: "Who was the 2008 World Series MVP?",
            choicesArray: ["A. Ryan Howard", "B. Brad Lidge", "C. Evan Longoria", "D. Cole Hamels"],
            finalAnswer: 3,
            image: "assets/images/colehamels.jpg",
            funFact: "Cole Hamels is married to reality TV star Heidi Strobel from Survivor since 2006.  I met them once at an Audi dealership.  Nice people.",
        },
        {
            question: "How many seats are in Citizens Bank Park?",
            choicesArray: ["A. 43035", "B. 69176", "C. 19500", "D. 53035"],
            finalAnswer: 0,
            image: "assets/images/citizensbankpark.jpg",
            funFact: "On average, there are 22 seats in each row at Citizens Bank Park.  They also have dollar-dog-night every once in awhile.  I love hot dogs. I could eat like, three.",
        },
        {
            question: "Who holds the record for most touchdowns scored for the Eagles?",
            choicesArray: ["A. Tommy Mcdonald", "B. Lesean McCoy", "C. Brian Westbrook", "D. Wilbert Montgomery"],
            finalAnswer: 2,
            image: "assets/images/brianwestbrook.jpg",
            funFact: "Brian Westbrook spent his final NFL year playing for the 49ers in 2010, totaling only 150 yards. I once liked the 49ers. Now? Not so much.",
        },
        {
            question: "During the 2000-2001 season, the 76ers won 4 awards. Among them: League MVP and Defensive Player of the Year. Name the other two.",
            choicesArray: ["A. Coach of the Year, Executive of the Year", "B. Sixth Man of the Year, Rookie of the Year", "C. Executive of the Year, Sixth Man of the Year", "D. Coach of the Year, Sixth Man of the Year"],
            finalAnswer: 3,
            image: "assets/images/iverson.jpg",
            funFact: "Despite being the first team to ever have won all 4 major awards in the NBA, they still lost in the NBA finals to Kobe and Shaq's Lakers.  I thought they were gonna do it, man.",
        },
        {
            question: "Who is the Philadelphia Flyers All-Time Leading Goal Scorer?",
            choicesArray: ["A. Bobby Clarke", "B. Eric Lindros", "C. Bill Barber", "D. Tim Kerr"],
            finalAnswer: 2,
            image: "assets/images/billbarber.jpg",
            funFact: "With 420 career goals and a total of 883 points, Barber trails Bobby Clarke for All-Time Leading Point Scorer, who has 1210 career points. They also had crazy mullets when they played.",
        },
        {
            question: "What year did the Eagles join the NFL?",
            choicesArray: ["A. 1945", "B. 1933", "C. 1960", "D. 1930"],
            finalAnswer: 1,
            image: "assets/images/1933jerseys.jpg",
            funFact: "The Eagles were an expansion team in 1933, and took the slot of the Frankford Yellow Jackets, a team that folded in 1931. I don't care what you say, those jerseys were awful.",
        },
        {
            question: "Who holds the longest hitting streak in Philadelphia Phillies history with 36 games in a row with a hit?",
            choicesArray: ["A. Richie Ashburn", "B. Mike Schmidt", "C. Jimmy Rollins", "D. Chase Utley"],
            finalAnswer: 2,
            image: "assets/images/jimmyrollins.jpg",
            funFact: "This isn't a fact but more like an opinion. But J-Roll was my favorite player during those great Phillies teams, solely because of (pictured) that hilarious Dick's Sporting Goods commercial he did.",
        },
        {
            question: "Who is the Eagles QB who holds the NFL record for most consecutive games with 1+ TD passes and 1 or less INTs?",
            choicesArray: ["A. Ron Jaworski", "B. Carson Wentz", "C. Donovan Mcnabb", "D. Randall Cunningham"],
            finalAnswer: 1,
            image: "assets/images/wentz.jpg",
            funFact: "Again, not a fact, but I just really really really wanted to get a Carson Wentz question and picture in here.  Because I love him. And I'm not ashamed of saying it. Did you see that throw against the 'Skins?? C'mon that was crazy!",
        },
        {
            question: "Who did Claude Giroux replace as Flyers' Team Captain in 2013?",
            choicesArray: ["A. Chris Pronger", "B. Mike Richards", "C. Mark Recchi", "D. Jeff Carter"],
            finalAnswer: 0,
            image: "assets/images/pronger.jpg",
            funFact: "Fun Pronger Fact: he was awesome. Also a Pronger fact, his older brother Sean played in the NHL, too. And uh...he also wore #20? He was left-handed? I'm just reading Wikipedia here, guys."
        },
        {
            question: "Who was the leading point scorer on the most recent 76ers team that won the NBA finals?",
            choicesArray: ["A. Julius Erving", "B. Charles Barkley", "C. Maurice Cheeks", "D. Moses Malone"],
            finalAnswer: 3,
            image: "assets/images/mosesmalone.jpg",
            funFact: "Moses was a 12-time All-Star and 8-time All-NBA hall-of-fame player.  His nickname was Chairman of the Boards, which just might be the greatest nickname. EVER."
        }
    ];

    //list of variables to use
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var seconds;
    var time;
    var answered;
    var userSelect;
    var questionCount = questionsArray.length;
    // var questionTracker = [];
    
    //messages variable for when question is answered right/wrong/out of time. messages.finished after all questions answered
    var messages = {
        correct: "Nice!",
        incorrect: "Wrong!",
        outOfTime: "Time's up!",
        finished: "Here's how you did:"
    }
    //hides entire game section at game start
    $("#main-game-section").hide();
    //show only start button at log
    $("#start-button").on("click", function () {
        $("#start-button").hide();
        $("#reset-button").hide();
        newGame();
    });
    //reset button to show after all questions answered
    $("#reset-button").on("click", function () {
        $("#reset-button").hide();
        newGame();
    });

    //new game function runs after start button clicked or reset button clicked
    function newGame() {

        $("#main-game-section").show();
        $("#last-message").empty();
        $("#correct-total").empty();
        $("#incorrect-total").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        newQuestion();
    }
    //new game function runs newQuestion function, shows timer
    function newQuestion() {
        $("#message").empty();
        $("#correct-answer").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        $("#timer-counter").show();
        answered = true;

        $("#current-question").html("Question " + (currentQuestion + 1) + " of " + questionsArray.length);
        $(".question").html(questionsArray[currentQuestion].question);

        // tried to set up where questions get set up randomly, failed miserable.  will try again after turning in assignment 
        // for (var j = 0; j < questionCount; j++ ) {
        //     var randomQuestion = questionsArray.splice (
        //     Math.floor(Math.random() * questionsArray.length), 1)[0];
        //     (existingQuestions());
        //       // Add the question to the tracker
        //     questionTracker.push(randomQuestion);
        //     }
            
        //     // If the current random number already exists in the tracker, return true
        //     function existingQuestions() {
        //       for (var j = 0; j < questionTracker.length; j++) {
        //         if (questionTracker[j] === randomQuestion) {
        //           return true;
        //         }
        //       }
        //       return false;
        //     }
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(questionsArray[currentQuestion].choicesArray[i]);
            choices.attr({
                "data-index": i
            });
            choices.addClass("thisChoice");
            $(".answer-choices").append(choices);
        }
        countdown();
        //clicking an answer will pause the time 
        $(".thisChoice").on("click", function () {
            userSelect = $(this).data("index");
            clearInterval(time);
            $("#timer-counter").hide();
            answers();
        });
    }
    //timer countdown
    function countdown() {
        seconds = 15;
        $("#timer-counter").html(":" + seconds);
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        if (seconds < 15) {
            $("#timer-counter").html(":" + seconds);
        } else {
            $("#timer-counter").html(":" + seconds);
        }
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answers();
        }
    }

    function answers() {
        $("#current-question").empty();
        $(".thisChoice").empty();
        $(".question").empty();
        $("#image").show();
        $("#fun-fact").show();


        var rightAnswerText = questionsArray[currentQuestion].choicesArray[questionsArray[currentQuestion].finalAnswer];
        var rightAnswerIndex = questionsArray[currentQuestion].finalAnswer;

        //add image to each question
        var imageLink = questionsArray[currentQuestion].image;
        var newImage = $("<img>");
        newImage.attr("src", imageLink);
        newImage.addClass("factImage");
        $("#image").html(newImage);

        //this links the funFact to each question and image
        var funFactLink = questionsArray[currentQuestion].funFact;
        var factCaption = $("<div>");
        factCaption.html(`${funFactLink}`);
        factCaption.addClass("imageCaption");
        $("#fun-fact").html(factCaption);





        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
        } else {
            incorrectAnswer++;
            $("#message").html(messages.outOfTime);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }

        if ((correctAnswer + incorrectAnswer) == (questionCount)) {
            setTimeout(scoreBoard, 10000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 10000);
        }
    }

    function scoreBoard() {

        $("#timer-counter").empty();
        $("#message").empty();
        $("#correct-answer").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        $("#last-message").html(messages.finished);
        $("#correct-total").html("Right: " + correctAnswer);
        $("#incorrect-total").html("Wrong: " + incorrectAnswer);
        $("#reset-button").addClass("reset");
        $("#reset-button").show();
        $("#reset-button").html("Play Again?");
    }

    scoreBoard();
});