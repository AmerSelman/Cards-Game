var turnCount = 1;
var player_A_Score = 0;
var player_B_Score = 0;
var player_to_start = localStorage.getItem('player_to_start');


//dodaje i brise classu visible kojom okrecemo kartu
class CardS{
	
	flipCard(card){
		if(this.canFlipCard(card)){
			card.classList.add("visible");
		}
	}
	canFlipCard(card){
		return true;
	}
}
//daje vrijednost i sliku kartama
function RandomCard(row,column){
	PlayerToPlay();
	//setTimeout(function(){ U chromu izgleda cudno bez ove funkcije
	var pic = "myimage";
	for (i = 1; i < 26; i++){
		var PicN = pic + i;
		
	
		var num = Math.floor(Math.random() * 12) + 1;
	
		if(num != 12){
			document.getElementById(PicN).src= num +".jpg";
		}else{
			document.getElementById(PicN).src= num +".png";
		}
	}
	//},1000);
}
//Čuva vrijednost da počne drugi igrač
function setLocalStorage() {
    if (player_to_start == 0) {
        player_to_start = 1;
    }
    else {
        player_to_start = 0;
    }
    localStorage.setItem("player_to_start", player_to_start);
}

//Pokazuje ko je na redu
function PlayerToPlay(){
	if(turnCount%2 == 1 - player_to_start){
		document.getElementById("first").style.color = 'white';
		document.getElementById("second").style.color = 'black';
	}else{
		document.getElementById("first").style.color = 'black';
		document.getElementById("second").style.color = 'white';
	}
}

//Pokazuje zbir osvojenih bodova
function clickOnCard(row,column,clickedCard)
{	
	var pict = "myimage";
	var b = 0;
	var PicId;
	for (i = 0; i < 5; i++){
		for(j = 0; j < 5; j++ ){
			b++;
			if (row == i && column == j){
				PicId = pict + b;
			

				var path = document.getElementById(PicId).src;
				var data = path.split(".");
				var name = data[0].split("/");

				if(turnCount%2 == 1 - player_to_start)
				{	
					if(parseInt(name[name.length-1], 10) == 11){
						player_A_Score = 0;
						document.getElementById('bodovi-A-igraca').innerHTML = player_A_Score;
					}else if(parseInt(name[name.length-1], 10) == 12){
						player_A_Score = player_A_Score * 2;
						document.getElementById('bodovi-A-igraca').innerHTML = player_A_Score;
					}
					else{
						player_A_Score = player_A_Score + parseInt(name[name.length-1], 10);
						document.getElementById('bodovi-A-igraca').innerHTML = player_A_Score;
					}
				}
				else
				{
					if(parseInt(name[name.length-1], 10) == 11){
						player_B_Score = 0;
						document.getElementById('bodovi-B-igraca').innerHTML = player_B_Score;
					}else if(parseInt(name[name.length-1], 10) == 12){
						player_B_Score = player_B_Score * 2;
						document.getElementById('bodovi-B-igraca').innerHTML = player_B_Score;
					}
					else{
						player_B_Score = player_B_Score + parseInt(name[name.length-1], 10);
						document.getElementById('bodovi-B-igraca').innerHTML = player_B_Score;
					}
				}
				turnCount++;

			}
		}
	}
	//okrece kartu nazad
	setTimeout(function() {
        		clickedCard.classList.remove("visible");
        		setTimeout(function(){
        			RandomCard(row,column);
        		},500);
   			}, 1000);
	if(player_A_Score>=50)
	{
		setLocalStorage();
		setTimeout(function(){
			alert("Player A wins the Game \n Press ok to start again"); 
			window.stop();
			document.location.reload(true);
		},500);
	}
	if(player_B_Score>=50)
	{	
		setTimeout(function(){
			alert("Player B wins the Game \n Press ok to start again"); 
			window.stop();
			document.location.reload(true);
		},500);
	}
}
function ready(){
	let cards = Array.from(document.getElementsByClassName("card"));
	let game = new CardS(0,0,cards);



	cards.forEach(card =>{
		card.addEventListener("click",() =>{
			game.flipCard(card);
		});
	});
}

if(document.readyState === "loading"){
	document.addEventListener("DOMContentLoaded",ready());
} else{
	ready();
}