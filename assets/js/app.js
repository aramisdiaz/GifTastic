$(document).ready(function(){
    var topics = ["Dark Souls", "Undertale", "Metal Gear Solid", "Persona 5", "Breath Of The Wild", "Portal", "Baldur's Gate", ]
    const theme = new Audio("assets/audio/game-theme-song.mp3");
    var musicPlaying = false;
    var results;
  
    

    
        $("#title-button").on("click", function() {
            if(musicPlaying == false){
                theme.play();
                musicPlaying = true;
               }else {
                theme.pause();
                musicPlaying = false;
            }
        });



        function buttonExpress(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {

            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonExpress();
   


    $(document).on('click', '.expression', function() {

    var game = $(this).html(); 
    console.log(game);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=F1i9203sS2xotoy2ILMs5FlvQrtFdHn0&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {

            var results = response.data;


            $('#expressView').empty();

            for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;

                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                    

                    var rating = results[j].rating;

                    var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
            
                } 
                
        }); 
        

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 
                
                
    })
    

       



    $(document).on('click', '#addExpress', function(){
    if ($('#express-input').val().trim() == ''){
      alert('Please add a game!');
   }
   else {
    var game = $('#express-input').val().trim();
    topics.push(game);
    $('#express-input').val('');
    buttonExpress();
    return false;

    }

});



});  
