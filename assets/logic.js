
$(document).ready(function () {

    // INFORMATION FOR SITE 
    // 6 character
    // Huklk, ironman, captain america, hawkeye, thor, black widdow

    // http://www.omdbapi.com/?s=thor&year=2008&apikey=f367c400

    // API/AJAX Test sections  

    //OMDB Key = f367c400
    //Marvel API Key = ded1811505155fd04255b903b7f0378a

    // Sorting function/Algorithm
    function bubbleSort(arr) {
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
                if (arr[j - 1] > arr[j]) {
                    var temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    // these two variables will be set during the onclick event to whatever the items data-name attr is
    var characterName = "";  
    var marvelCharacterName = "";
    var imdbID = "";
    



    $(".circle").on("click", function () {  
        
        characterName = $(this).attr("data-name");
        console.log(characterName);

        
        
        if (characterName === "blackWidow") {
            characterName = "avengers_infinity_war";
            
        }

        var OMDBQueryURL = "https://www.omdbapi.com/?s=" + characterName + "&year=2008&apikey=f367c400";
         console.log(OMDBQueryURL);

        //AJAX Call
        $.ajax({
            url: OMDBQueryURL,
            method: 'GET'
        }).then(function (response) {

            console.log(response);
        
        // ===== This section sorts the movie respons years=====
            var yearArr = [];
            var yearIntArr = [];

            for (var i = 0; i < response.Search.length; i++) {
                if (response.Search[i].Type === "movie") {
                     yearArr.push(response.Search[i].Year);
                console.log(yearArr); 
                }
            }
            
            for (var j=0; j<yearArr.length; j++){
                var yearToNum = parseInt(yearArr[j]);
                yearIntArr.push(yearToNum);
                console.log(yearIntArr);   
            }

            bubbleSort(yearIntArr);
            console.log("bubble sorted" ,yearIntArr);
        // ====================

        // ==== looks to find most recent movie's IMDB ID ========
            for (var x = 0; x < response.Search.length; x++) {
            var convertedYear = parseInt(response.Search[x].Year);
           
            var yearAtEnd = yearIntArr[yearIntArr.length - 1]
            
            console.log(response.Search[x].Year)
            console.log(convertedYear, "==", yearIntArr[yearIntArr.length-1])
            if (convertedYear == yearIntArr[yearIntArr.length-1]) {
                if (characterName === "hawkeye" || characterName === "blackWidow" || characterName === "avengers_infinity_war") {
                    imdbID = "tt4154756";
                } else {
                     imdbID = response.Search[x].imdbID;
                console.log("imbd", imdbID);
                }
               
            } else {
                console.log("error");  
            }
       
            
        }

          var imdbIDQueryURL = "https://www.omdbapi.com/?i="+imdbID+"&plot=full&apikey=f367c400";
           
            $.ajax({
                url: imdbIDQueryURL,
                method: 'GET'
            }).then(function (response2) {
                
                $("#homePG").addClass("invisible");
                $("#charPG").removeClass("invisible");
                
                var movieTitle;
                var movieReleased;
                var movieRating;
                var moviePlot;

                if (response2.Ratings.length == 0) {
                    movieRating = "Data Unavailable";
                } else {
                    movieRating = response2.Ratings[0].Source + " - " + response2.Ratings[0].Value;
                }

                console.log(imdbID);

                console.log(imdbIDQueryURL);
                console.log(response2);

                $("#currentMovieTitle").text(response2.Title);
                $("#currentMovieRelease").text(response2.Released);
                $("#currentMovieRating").text(movieRating);
                $("#currentMoviePlot").text(response2.Plot);
                // $("#characterName").text("characterName");
                // $("#characterName").html("characterName");

            });

            console.log(marvelCharacterName);
            if (characterName === "blackWidow" || characterName === "avengers_infinity_war") {
            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=natasha-romanoff&resources=character";
            $("#characterName").text("Black Widow");

        }
        else if (characterName === "captain-america") {
            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=steve-rogers&resources=character";
            $("#characterName").text("Captain America");
        }
        else if (characterName === "hulk") {
            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=bruce-banner&resources=character";
            $("#characterName").text("The Hulk");
        }
        else if (characterName === "hawkeye") {
            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=clint-barton&resources=character";
            $("#characterName").text("Hawkeye");
        }
        else if (characterName === "iron-man") {

            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=anthony-edward-stark&resources=character";
            $("#characterName").text("Iron Man");
        }
        else if (characterName === "thor") {
            var comicVineQueryURL = "https://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=thor&resources=character";
            $("#characterName").text("Thor");

        }
        
            var script = document.createElement('script');

            script.src = 'http://comicvine.gamespot.com/api/search/?api_key=e526edc540369ef498dc63ec7fc899e35658beba&format=json&query=thor&resources=character';
            var thisthing = document.getElementsByTagName('head')[0].appendChild(script);
            console.log(toString(thisthing));

        $.ajax({
            url: comicVineQueryURL,
            method: 'GET',
            jsonp: "callback",
            crossDomain: true,
            dataType: 'jsonp'
        }).then(function (response) {
            console.log(response);

        });

        });
        
  

});
});
