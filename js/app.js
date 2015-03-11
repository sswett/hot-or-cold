/*
#count is the guess number (qty) - span
#userGuess is the value of the current guess number - input text
#guessButton is the button for doing the guess - input submit
#guessList is the unordered list for output - ul
.new is the "new game" link - a
#feedback is the initial "Make Your Guess!" but becomes feedback - div
*/

var secretNumber = 0;
var prevDiff = 0;


$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$("#guessButton").click(function(event) {
  		handleGuessButtonClick(event);
  	});

	$("#userGuess").keydown(function(event) {
		if ( event.which == 13 )
		{
			handleGuessButtonClick(event);
			event.preventDefault();
			return false;
		}
	});


  	$(".new").click(function() {
  		newGame();
  	});

  	newGame();

});


function newGame()
{
	$("#count").html("0");
	$("#userGuess").val("");
	$("#guessList li").remove();
	$("#feedback").html("Make Your Guess!");

	setSecretNumber();
	prevDiff = 0;
}


function setSecretNumber()
{
    secretNumber = Math.floor(Math.random() * 100);   // returns 0-99
    secretNumber += 1;

    // Temporary to make sure secret number is ok:
	// $("#guessList").append("<li>Secret number: " + secretNumber + "</li>");

}


function handleGuessButtonClick(pEvent)
{
	var input = $("#userGuess").val();

	if (!isValidInput(input))
	{
		$("#feedback").html("Guess must be integer 1-100");
		return;
	}

	incrementGuessCount();

	var feedback = getFeedback(parseInt(input));
	$("#feedback").html(feedback);

	$("#guessList").prepend("<li>" + input + " - " + feedback + "</li>");

	$("#userGuess").val("");
}


function isValidInput(pInput)
{
	var num = + pInput;

	if (num == NaN)
	{
		return false;
	}

	if (num % 1 != 0)
	{
		return false;
	}

	if (num < 1 || num > 100)
	{
		return false;
	}

	return true;
}


function incrementGuessCount()
{
	var currentGuess = $("#count").html();

	if (currentGuess == NaN)
	{
		currentGuess = 0;
	}

	currentGuess++;
	$("#count").html(currentGuess);	
}


function getFeedback(pGuess)
{
	var diff = Math.abs(secretNumber - pGuess);

	if (diff == 0)
	{
		return "Bingo!  You got it!";
	}

	var hint = "";

	if (prevDiff != 0 && prevDiff != diff)
	{
		hint = diff < prevDiff ? " (warmer)" : " (colder)";
	}

	prevDiff = diff;


	if (diff < 10)
	{
		return "Very hot" + hint;
	}

	if (diff < 20)
	{
		return "Hot" + hint;
	}

	if (diff < 30)
	{
		return "Warm" + hint;
	}

	if (diff < 50)
	{
		return "Cold" + hint;
	}

	return "Ice cold ... burrr!" + hint;
}