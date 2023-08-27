$(document).ready(function() {
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern=[];
    var level=0;
    var check=0;
    $(document).one("keypress",function (event)
    {
        let key=event.keyCode;
        let character=String.fromCharCode(key);
        if(character=='a')
        {
            // alert("A is pressed");
            $("h1").text("Level 0");
            nextSequence();
        }
    });

    function nextSequence() {
        level++;
        userClickedPattern=[];
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber]; // Change variable name
        gamePattern.push(randomChosenColour);
        // console.log(gamePattern);

        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        $("h1").text("Level " + level);
    }
    function playSound(name)
    {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    function animatePress(currentColor)
    {
        $("." + currentColor).addClass("pressed");
        setTimeout(function(){
            $("." + currentColor).removeClass("pressed");},
            100)
    }
    function checkAnswer(currentLevel)
    {
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
        {
            console.log("Success");
            if(userClickedPattern.length==gamePattern.length)
            {
                setTimeout(function(){
                    nextSequence();},
                    1000)
            }
        }
        else{
            playSound("wrong");
            $("h1").text("Game Over,Press Any Key to Restart");

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");},
                200)
                $(document).one("keypress", function(event) {
                    startover();
                    $("h1").text("Level 0");
                    nextSequence();
                });
            
        }
    }
    function startover()
    {
        level=0;
        gamePattern=[];
        userClickedPattern=[];
    }

    // Attach a click event handler to the colored div elements
    $(".btn").click(function() {

        var userChosenColours=$(this).attr('id');
        userClickedPattern.push(userChosenColours);
        
        animatePress(userChosenColours);
        playSound(userChosenColours);
        
        checkAnswer(userClickedPattern.length-1);
    });
});
