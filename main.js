var artistListUrl="https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5d6e5087059b42a9329b1e1013b4f09f&format=json"; // var artistListUrl holds the api of gettopartists
var artistTopAlbums="https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=5d6e5087059b42a9329b1e1013b4f09f&format=json";// var artistTopAlbums holds the api of get top album of the artis5
var artistName = ""; // Initialize global variable outside the function. Idea is to get the artist details onclick such albums, playcount etc
function dataload() { //dataload function
    var xmlhttp = new XMLHttpRequest(); // var xmlhttp holds the XMLhttpRequest object 
    xmlhttp.onreadystatechange = function () { // onreadystatechange event handler is triggered whenever the state of the request changes
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // when readyState is 4 and status is 200 , Var jsonObject will update with response text (see next line)
            var jsonObj = JSON.parse(xmlhttp.responseText);// converting JSON string into javascript object

            for (let index = 0; index < jsonObj.artists.artist.length; index++) { // for loop , this loop will until index is less then jsonObj.artists.artist.length 
                var artist = jsonObj.artists.artist[index]; // assining artist array to var artist based on index value
                var artistName = artist.name; // assining name property of artist object to var artistName
                var imageUrl = "";// imageUrl var 
                if (artist.image) { // if artist.image= true, for loop will execute
                    for (let i = 0; i < artist.image.length; i++) {// for loop will contiune until i is less then artist.image.length
                        if (artist.image[i].size === "medium") { // medium size picture is choose for this project 
                            imageUrl = artist.image[i]["#text"]; // adding the image to var imageurl
                            break;// loop break
                        }
                    }
                }
                var artistDiv = document.createElement("div");// creating div element and assigning it to var artistDiv
                artistDiv.textContent = artistName;// value of artistName is added to artistDiv's textContent property
                artistDiv.style.cursor = "pointer";// adding cursor pointer to artistDiv so that user can understand it is clickable 
                var artistImage = document.createElement("img");// assigning <img> element to var artistImage
                artistImage.src = imageUrl;// assigning var imageUrl to artistImage url 

               /* artistDiv.addEventListener("click", function () {  // removing addEventListerner function to avoid hard coding 
                    var clickedArtistName = this.textContent;
                    albumDetails(clickedArtistName);
                });*/

                artistDiv.onclick=function(){// when user will click on artistDiv  this function will trigger 
                    var clickedArtistName = this.textContent;// var clickedArtistName holds the value of this.textContent 
                    albumDetails(clickedArtistName);// calling albumDetails function and passing clickedArtistName as parameter

                };

                document.getElementById("artistNameList").appendChild(artistDiv);// Appending artistDiv as a child to the element with id "artistNameList"
            }
                var searchArtistButton=document.getElementById("searchArtistButton");// var searchArtistButton represents a html button element , id 'searchArtistButton'
                var InputSearchValue=document.getElementById("InputSearchValue");// var InputSearchValue holds the value of a html input element ,  id 'inputSearchValue'

               searchArtistButton.onclick= function(){// adding onclick event to var searchArtistButton
                let seachInputValue=InputSearchValue.value;// assing InputSearchValue's value to var searchInputvalue
                let artistName=seachInputValue.replace(/\s+/g, ' ').trim()// removing leading and trailing spaces, removing extra spaces in between first and last name , and assiging it to var artistName
                albumDetails(artistName); // calling albumDetails function and sending artistName as parameter
            };
        }
    };
    xmlhttp.open("GET", artistListUrl, true); // .open() method make a new request or re-initialize existing one, GET is standard HTTP method to retrieve data from the server, artistListUrl is the url which request will be sent, true means that request is asynchronous (code execution continue without watiting for the server's response)
    xmlhttp.send();//resquest is sent by send() method
}

function albumDetails(artistName) { // albumDetails function
    var xmlhttp = new XMLHttpRequest();//var xmlhttp holds the XMLhttpRequest object 
    xmlhttp.onreadystatechange = function () {//onreadystatechange event handler is triggered whenever the state of the request changes
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {//when readyState is 4 and status is 200 , Var jsonObject will update with response text (see next line)
            var jsonObj = JSON.parse(xmlhttp.responseText);//converting JSON string into javascript object

            document.getElementById("artistDetails").innerHTML = ""; // clearing artist details of the previous search

            for (let index = 0; index < jsonObj.topalbums.album.length; index++) { // for loop will continue until index is less then json.topalbums.album.length
                var albumDetails = jsonObj.topalbums.album[index];// assining array album  to var album based on index value
                var albumName = albumDetails.name;// assining name property of albumName object to var artistName
                var playcount = albumDetails.playcount;// assining palycount property of albumDetails to var playcount
                var singerName = albumDetails.artist.name;// assinging name property of artist to var singerName

                var imageUrl = "";// imageUrl var
                if (albumDetails.image) { // if (albumDetails.image) is true 
                    for (let i = 0; i < albumDetails.image.length; i++) { // for loop will contiune until i is less then albumDetails.image.length
                        if (albumDetails.image[i].size === "medium") {// medium size picture is choosen for this project
                            imageUrl = albumDetails.image[i]["#text"];//adding the image to var imageurl
                            break;// loop will break
                        }
                    }
                }


                var albumNameDiv = document.createElement("div"); //creating div element and assigning it to var artistDiv
                albumNameDiv.textContent = "Album name : "+albumName;// "Album name: "+value of artistName is added to artistDiv's textContent property
                var playcountDiv = document.createElement("div");//creating div element and assigning it to var playcount
                playcountDiv.textContent= "Playcount: "+playcount;//"Playcount: "+value of playcount is added to playcount's textContent property
                var singerNameDiv = document.createElement("div");//creating div element and assigning it to var singerNameDiv
                singerNameDiv.textContent ="Singer name: " +singerName;//"Singer name: "+value of singerName is added to singerName's textContent property
                var imgDiv=document.createElement("img");//creating img element and assigning it to var imaDiv
                imgDiv.src=imageUrl;//assigning var imageUrl to artistImage url 
                var br=document.createElement("br"); // line break is created and assigned to var br
                document.getElementById("artistDetails").appendChild(albumNameDiv);//Appending albumNameDiv as a child to the element with id "artistDetails"
                document.getElementById("artistDetails").appendChild(imgDiv);//Appending imgDiv as a child to the element with id "artistDetails"
                document.getElementById("artistDetails").appendChild(singerNameDiv);//Appending singerNameDiv as a child to the element with id "artistDetails"
                document.getElementById("artistDetails").appendChild(playcountDiv);//Appending playcountDiv as a child to the element with id "artistDetails"
                document.getElementById("artistDetails").appendChild(br);//Appending br as a child to the element with id "artistDetails"
            }
        }
    };
    var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artistName + "&api_key=5d6e5087059b42a9329b1e1013b4f09f&format=json";// url var is contact variable it  holds the url and artistName var . It will help us to search artist by name
    xmlhttp.open("GET", url, true);// .open() method make a new request or re-initialize existing one, GET is standard HTTP method to retrieve data from the server, url ( here is var , var url has a url link) is the url which request will be sent, true means that request is asynchronous (code execution continue without watiting for the server's response)
    xmlhttp.send();// resquest is sent by send() method
}


dataload(); // Call dataload function to start loading artist data
