    /*
    GAME RULES:

    - O jogo tem 2 jogadores, jogando em rounds
    - Em cada turno, um jogador rola o dado quantas vezes ele quiser. Cada resultado é adicionado para a sua pontuação no ROUND
    - Mas, se o jogador rolar 1, todos a sua pontuação no ROUND é perdida. Apos isso, é a vez do proximo jogador.
    
    - O jogador pode escolher "Segurar", que faz com que sua pontuação do ROUND seja adicionada para a sua pontuação GLOBAL, apos isso, é a vez do proximo jogador
    - O primeiro jogador  que chegar á 100 pontos na pontuação GLOBAL, vence o jogo
 */
    var scores, roundScore, activePlayer, dice, gamePlaying, lastDice;

    init();


    document.querySelector('.btn-roll').addEventListener('click', function(){
        if(gamePlaying){

            //1. Numero aleatorio
            var dice = Math.floor(Math.random() * 6) + 1;


        //2. Mostra o resultado
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            
            //2.5 se o dado  cair no 6 em sequencia, o jogador perde a pontuação globale passa o vez para o proximo jogador
            

            if (dice === 6 && lastDice === 6){
                document.getElementById('score-' + activePlayer).textContent = '0';
                scores[activePlayer] = 0;
                nextPlayer();
              

            
        //3. Atualiza a pontuação da rodada se o numero for diferente de 1
            }else if (dice !== 1 ) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
          


        } else{
            //proximo jogador
            nextPlayer();
        }
            lastDice = dice;


        }



    });





    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying){

            // Adicionar pontuação corrente para a ponturação global

        scores[activePlayer] += roundScore;





        // atualizar interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


            var input = document.querySelector('.final-score').value;
            var winningScore;
            if(input){
                 winningScore = input;
                
            }else{
                winningScore = 100;
            }

        //Checar se jogador venceu



        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Vencedor!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;


        }else{
             //proximo jogador
            nextPlayer();

        }


        }










    });


    function nextPlayer(){
         activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;

            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';


            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');


            document.querySelector('.dice').style.display = 'none';

    }



    document.querySelector('.btn-new').addEventListener('click', init);


    function init(){
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Jogador 1';
    document.querySelector('#name-1').textContent = 'Jogador 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');




    }










