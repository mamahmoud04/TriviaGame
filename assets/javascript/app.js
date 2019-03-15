

var page = $("#play_place");
var countStart = 25;

//setting the on click Events

$(document).on("click", "#game-restart", function (y) {
    player.reset();
})
$(document).on("click", "#start", function (y) {
    $("#subwrapper").prepend('<h2>Time Remaining:<span id= "number-counter">25</span> Seconds</h2>');
    player.loadQuestion();
})
$(document).on("click", ".answer-button", function (y) {
    console.log('WE GOT CLICKED!!!');
    player.clicked(y)
});

var questions = [{
    question: "What is the name of the basketball team in Chicago?",
    answers: ["Knicks", "Trailblazers", "Bulls", "Lakers"],
    correctAnswer: "Bulls",

}, {
    question: "What is the name of the football team in Chicago?",
    answers: ["Bears", "Steelers", "Raiders", "Browns"],
    correctAnswer: "Bears",

}, {
    question: "Which one is the name of the baseball team in Chicago?",
    answers: ["White Sox", "Yankees", "Angels", "Padres"],
    correctAnswer: "White Sox",

}, {
    question: 'What is the name of the hockey team in Chicago?',
    answers: ["Blackhawks", "Jets", "Predators", "Blues"],
    correctAnswer: "Blackhawks",

}, {
    question: 'where is Chicago located?',
    answers: ["East coast", "West coast", "Midwest", "South"],
    correctAnswer: "Midwest",

}];

var player = {
    questions: questions,
    currentQuestion: 0,
    counter: countStart,
    correct: 0,
    incorrect: 0,

    countdown: function () {

        player.counter--;
        console.log('WE R TICKING!!!', player.counter);
        console.log('DID WE FIND ???', $(document).find('#number-counter'));
        $(document).find('#number-counter').html(player.counter);
        // $('document').html(game.counter);

        if (player.counter === 0) {
            console.log('TIMES UP');
            player.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(player.countdown, 1000);
        page.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            page.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        player.counter = countStart;
        $('#number-counter').html(player.counter);
        player.currentQuestion++;
        player.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#number-counter').html(player.counter);

        page.html('<h2>Ran Out of Time!</h2>');
        page.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        page.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (player.currentQuestion === questions.length - 1) {
            setTimeout(player.results, 3 * 1000);
        } else {
            setTimeout(player.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);

        page.html('<h2>All done, heres how you did!</h2>');
        $('#number-counter').html(player.counter);
        page.append('<h3>Correct Answers: ' + player.correct + '</h3>');
        page.append('<h3>Incorrect Answers: ' + player.incorrect + '</h3>');
        page.append('<h3>Unanswered: ' + (questions.length - (player.incorrect + player.correct)) + '</h3>');
        page.append('<br><button id="game-restart">Start Over?</button>');
    },
    clicked: function (y) {
        clearInterval(timer);

        if ($(y.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        player.incorrect++;
        clearInterval(timer);
        page.html('<h2>Not Correct!</h2>');
        page.append('<h3>The Correct Answer was: ' + questions[player.currentQuestion].correctAnswer + '</h3>');


        if (player.currentQuestion === questions.length - 1) {
            setTimeout(player.results, 3 * 1000);
        } else {
            setTimeout(player.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        player.correct++;
        page.html('<h2>Correct!</h2>');


        if (player.currentQuestion === questions.length - 1) {
            setTimeout(player.results, 3 * 1000);
        } else {
            setTimeout(player.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStart;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    },
}



