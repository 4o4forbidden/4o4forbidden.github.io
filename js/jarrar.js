/* 
  888888                                           
    "88b                                           
     888                                           
     888  8888b.  888d888 888d888  8888b.  888d888 
     888     "88b 888P"   888P"       "88b 888P"   
     888 .d888888 888     888     .d888888 888     
     88P 888  888 888     888     888  888 888     
     888 "Y888888 888     888     "Y888888 888     
   .d88P                                           
 .d88P"                                            
888P"                                              
*/

var randomTab = [];
var randomTabBis = [];
var currentTab = [];
var Try = 0;
var Prize = 1998;
var Difficulty = 'Realistic';


$(document).ready(function () {

    $('.inputVal').attr('disabled','true');
    
    // watch Inputs OnKeyUp
    $('input').keyup(function () { // avoiding onkeyup(n) html
        id = Number($(this).attr('id').slice(5, 6));
        watchInput(id);
    })

    // watch Difficulty Toggle
    $('#difficultySwitch').change(function () {
        if ($(this).prop('checked') == true) {
            $('label').html('Realistic');
            Difficulty = 'Realistic';
        } else {
            $('label').html('Easy');
            Difficulty = 'Easy';
        }
    })
    
    // Easter Egg ( Cheat )
    $('h4').click(function(){
        console.log(randomTabBis);
    })

});

function checkIf(x) {
    Test = false;
    for (j = randomTab.length; j>-1; j--) {
        if (x == randomTab[j]) {
            Test = true;
            break;
        }
    }
    return Test;
}

function Start() {
    if(Prize == 1998){
        $('.inputVal').removeAttr('disabled');
        
        randomTab[0] = 9;
        randomTabBis[0] = 9;
        for (i = 1; i < 7; i++) {

            var Rd = Math.floor(Math.random() * 10);

            if(Difficulty == 'Realistic'){
                randomTab[i] = Rd;
                randomTabBis[i] = Rd;
            }else{
                while (checkIf(Rd)) {
                var Rd = Math.floor(Math.random() * 10);
            }
                randomTab[i] = Rd;
                randomTabBis[i] = Rd;
            }
        }
        
    Prize = 3050;
    $('#input1').focus();
    calcPrize();

    }else{location.reload();}
}

function calcPrize() {
    if(Prize > 0){
    Prize -= 50;
    $('h1').html(Prize + ' Dt');
    setTimeout(function () {
        calcPrize();
    }, 1400)
    }else{
        Lose();
    }
}

function watchInput(n) {
    if ($('#input' + n).val() >= 0 && $('#input' + n).val() != '') {
        if (n != 7) {
            currentTab[n - 1] = $('#input' + n).val();
            $('#input' + (n + 1)).focus();
        } else {
            currentTab[n - 1] = $('#input' + n).val();
            $('input').val('');
            $('#input1').focus();
            mainProcess();
        }
    }
}

function mainProcess() {
    Try++;

    currentTab.forEach((current, i) => {
        setTimeout(() => {
            $('#r' + Try + 'sp' + (i + 1)).addClass('animated flipInY');
            $('#r' + Try + 'sp' + (i + 1)).css('opacity','.5');
            $('#r' + Try + 'sp' + (i + 1)).html(current);
        }, i * 50);
      });
      

    //  ### Old Method Before Adding The Animation 
    // for (i = 0; i < 7; i++) {
    //     $('#r' + Try + 'sp' + (i + 1)).html(currentTab[i]);
    //     $('#r' + Try + 'sp' + (i + 1)).css('opacity','.5');
    //     $('#r' + Try + 'sp' + (i + 1)).addClass('animated flipInY');
    //     setTimeout(() => {
    //         console.log('Hello');
    //     },400);
    // }

    setTimeout(() => {
        wrongPlaceCheck();
        correctPlaceCheck();
        // console.log(randomTab);            
    },350)
}

function wrongPlaceCheck() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            if (currentTab[i] == randomTab[j]) {
                $('#r' + Try + 'sp' + (i + 1)).css('background', '#feca57');
                $('#r' + Try + 'sp' + (i + 1)).css('opacity','1');
                break;
            }
        }
    }
}

function correctPlaceCheck() {
    Correct = 0;
    for (i = 0; i < 7; i++) {
        if (currentTab[i] == randomTabBis[i] || ((randomTab[i] == 'X') && (randomTabBis[i] == currentTab[i]))) {
            $('#r' + Try + 'sp' + (i + 1)).css('background', '#7bed9f');
            $('#r' + Try + 'sp' + (i + 1)).css('opacity','1');
            Correct++;
            randomTab[i] = 'X';
        }else{
        currentTab[i] = 0; // Bech l'utilisateur me ynjamach direct yabda men case > 1 baed kol try l tableau initiallisih b 0'et
        }
    }

    if (Correct == 7) {
        Win();
    }

    if(Try == 8 & Correct < 7){
            Lose();
    }
}

function Win(){
    $('.inputVal').attr('disabled','true');
    $('h1').css('opacity','0');
    swal("Bood job boi!", "Congrats ! You won " + Prize + " Dt", "success");
}

function Lose(){
    $('h1').css('opacity','0');
    TargetNumber = '';
    for(i=0;i<7;i++){
        TargetNumber += ' ' + randomTabBis[i];
    }

    swal("Bad job!", "Oh boi, You lost ! here's the correct number \n[ "+TargetNumber +" ]", "error").then(() => {
        location.reload();
    })
}

/* 
  888888                                           
    "88b                                           
     888                                           
     888  8888b.  888d888 888d888  8888b.  888d888 
     888     "88b 888P"   888P"       "88b 888P"   
     888 .d888888 888     888     .d888888 888     
     88P 888  888 888     888     888  888 888     
     888 "Y888888 888     888     "Y888888 888     
   .d88P                                           
 .d88P"                                            
888P"                                              
*/