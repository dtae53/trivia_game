$(document).ready(function () {
    var options = [
        {
            question: "Who holds the Seattle Mariners franchise record for most Home Runs in a single-game with 4?", 
            choice: ["Bret Boone", "Ken Griffey Jr.", "Mike Cameron", "Ichiro" ],
            answer: 2,
            photo: "assets/images/cameron.gif" 
         },
         {
             question: "Who broke 9 tackles on a 67 yard touchdown play in the Seahawks 2011 Wild Card Game against the New Orleans Saints?", 
            choice: ["Shaun Alexander", "Marshawn Lynch", "Doug Baldwin", "Russell Wilson" ],
            answer: 1,
            photo: "assets/images/marshawn.gif"
         }, 
         {
             question: "What year did the Seattle SuperSonics when its only NBA Championship?", 
            choice: ["1985", "2005", "1995", "1979" ],
            answer: 3,
            photo: "assets/images/sonics.jpg"
        }, 
        {
            question: "Who is the Seattle Storm's All-Time Scoring Leader", 
            choice: ["Sue Bird", "Lauren Jackson", "Breanna Stewart", "Swin Cash" ],
            answer: 0,
            photo: "assets/images/bird.gif"
        }, 
        {
            question: "Which team did the Washington Huskies beat in the 1991 Rose Bowl to claim a share of the National Championship?", 
            choice: ["Michigan", "Ohio State", "Alabama", "Miami" ],
            answer: 0,
            photo: "assets/images/rose.jpg"
        }, 
        {
            question: "Which right handed pitcher did the Mariners pick up in the 1998 Randy Johnson trade?", 
            choice: ["Jamie Moyer", "Gil Meche", "Felix Hernandez", "Freddy Garcia" ],
            answer: 3,
            photo: "assets/images/garcia.jpg"
        }, 
        {
            question: "Which Seahawk holds the team record for most fumbles forced in a single season?", 
            choice: ["Kam Chancellor", "Dwayne Harper", "Earl Thomas", "Lofa Tatupu" ],
            answer: 1,
            photo: "assets/images/harper.jpg"
        }, 
        {
            question: "Who did the Seattle SuperSonics select with the 5th overall pick in the 1987 NBA Draft?", 
            choice: ["Nate McMillan", "Shawn Kemp", "Gary Payton", "Scottie Pippen" ],
            answer: 3,
            photo: "assets/images/pippen.jpg"  
        },
        {
            question: "Which player owns the Seattle Sounders record for most goals in a season with 17?", 
            choice: ["Clint Dempsey", "Fredy Montero", "Obafemi Martins", "Jordan Morris" ],
            answer: 2,
            photo: "assets/images/martins.gif"
        }, 
        {
            question: "What is the only year the Washington Huskies basketball team has appeared in the Final Four?", 
            choice: ["1948", "1984", "2005", "1953" ],
            answer: 3,
            photo: "assets/images/huskies.jpg"    
        }];
    
var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})