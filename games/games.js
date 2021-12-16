import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let pastGamesArray = [];

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;


nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(nameForm);
  
    const nameOne = formData.get('team-one');
    const nameTwo = formData.get('team-two');

    name1 = nameOne;
    name2 = nameTwo;
  
    console.log('step1');
    nameForm.reset();
    displayCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    score1++;
    
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    score2++;

    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    score1--;

    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    score2--;
    displayCurrentGameEl();
});


finishGameButton.addEventListener('click', async() => {
    const currentGame = makeCurrentGame();

    await createGame(currentGame);
    
    const games = await getGames();

    pastGamesArray = [...games];
    
    displayAllGames();
    
    
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});




logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const games = await getGames();

    if (games) {
        pastGamesArray = games;

        displayAllGames();
    }
});
function displayCurrentGameEl() {
   
   
    currentGameEl.textContent = '';
    
    const currentGame = makeCurrentGame();
    console.log(currentGame);
    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    const gameEl = renderGame(currentGame);
    
    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}
function displayAllGames() {
    pastGamesEl.textContent = '';

    for (let game of pastGamesArray) {
        const gameEl = renderGame(game);

        gameEl.classList.add('past');
        
        pastGamesEl.append(gameEl);

       
    }
}
function makeCurrentGame(){
    return {
        name1, name2, score1, score2
    };
}
displayCurrentGameEl();