import $ from 'jquery';
import './css/styles.css';
import * as Character from './businessLogic.js';
import PirateImg from './assets/images/pirate.jpg';

$("#pirate-img").attr("src", PirateImg);

let currentChar = Character.storeState(Character.startStateFunc());
currentChar = Character.storeState(Character.addTrait(currentChar()));
currentChar = Character.storeState(Character.addTrait(currentChar()));
updateCharacterElements(currentChar());

function updateCharacterElements(character) {
  //update health
  $("#health-value").text(`${character.Health}`);
  //update skills
  $("#swordsmanship-value").text(`${character.Swordsmanship}`);
  $("#marksmanship-value").text(`${character.Marksmanship}`);
  $("#navigation-value").text(`${character.Navigation}`);
  $("#shipwrighting-value").text(`${character.Shipwrighting}`);
  $("#bluff-value").text(`${character.Bluff}`);
  $("#intimidation-value").text(`${character.Intimidation}`);

  character.Traits.forEach(trait => {
    $("#traits-list").append(`<li>${trait}</li>`);
  });
}

//id skill flavorTextWin flavorTextFail page
function battleBtn(page) {
  return function(damage = 0) {
    return function(skill) {
      return function (amountToBeat) {
        return function(flavorTextWin, flavorTextFail) {
          page();
          if(Character.Battle(currentChar()[skill])(amountToBeat)) {
            $('#text-box').prepend(`<p>${flavorTextWin}</p>`);
          } else {
            $('#text-box').prepend(`<p>${flavorTextFail}</p>`);
            currentChar(Character.healthChange(damage));
            $("#health-value").text(`${currentChar().Health}`);
          }
        };
      };
    };
  };
}

function pageTwo() {
  $("#text-box").html(`
    <p>You set off on the seas with your crew but where do you go? you have treasure map but its pretty complicated and hard to read. You overhear someone in your crew whisper about a legend of untold riches in the east.</p>
    <button class="choice-btn" id="pg2-nav">Take the time to study your map and chart a course. no need to follow legends when you have a map to sure treasure!</button>
    <button class="choice-btn" id="pg2-intimidate">Force your crew member to speak about the legend! You are the captain after all!</button>
    `);
}

function pageThree() {
  $("#text-box").html(`
  <p>vnjdsvnkjsdnv</p>
  <button class="choice-btn" id="pg3-nav">button!</button>
  <button class="choice-btn" id="pg3-marksman">button!</button>
  <button class="choice-btn" id="pg3-intimidate">button!</button>
  `);
}

$("#pg1-bluff").click(function(event) {
  event.preventDefault();
  battleBtn(pageTwo)()('Bluff')(5)('Everyone was fooled! You have a strong crew!', 'No one really believed you...luckily a few people decided to join anyway.');
});

$("#pg1-sword").click(function(event) {
  event.preventDefault();
  battleBtn(pageTwo)(-2)('Swordsmanship')(5)('You knocked the sword out of your opponent\'s hand and pointed your sword right at his neck! Checkmate! You decided to give your opponent mercy and spare him--this time. Everyone was so impressed they all wanted to join your crew; including the swordsman! You now have the best crew on the sea!', 'You try your best to defeat the swordsman but he is a much stronger opponent than you thought. He slashes you in the chest and walks away laughing at your failure. You manage to gain a very small crew of ruffians the next day and decided to forget this embarrassment.');
});

$("#pg1-intimidation").click(function(event) {
  event.preventDefault();
  battleBtn(pageTwo)()('Intimidation')(5)('Everyone cowers in fear at your commanding presence and they quickly join. You have a strong crew!', 'Everyone rolls their eyes at your attempt at intimidation. They\'ve all heard it before. You still manage to get a small unimpressive crew.');
});

$("#pg2-nav").click(function(event) {
  event.preventDefault();
  battleBtn(pageThree)(-2)('Navigation')(5)('You take the time to study the map and guide your crew to the island it indicates while expertly avoiding rough waters. the island seems to match with the map exactly!', 'You take a long time studying the map and the crew get restless. a strong crewmate tries to gather a mutiny! You must fight him in a dual to the death to show the crew you deserve your title as captain! he strikes a strong blow to your head but you manage to defeat him in the end. you win the crew back for now and manage to navigate the ship to an island. Is this the right place? Your not quite sure...');
});

$("#pg2-intimidate").click(function(event) {
  event.preventDefault();
  battleBtn(pageThree)(-2)('Intimidation')(5)('You yell at the crew member immediately after hearing him, for not informing his captain about such important information. He jumps and meekly explains everything about what he\'s heard about a cursed island in the east. He shows you on a map exactly where it\'s located and it turns out it\'s very close by! You and your crew arrive there in only a few days!', 'You shout at the crew member for not telling you such important information but the crew member justs laughs. He thought the legend seemed like a joke told to mock overconfident pirates and your reaction has confirmed that for him. This angers you and you challenge the crew member to a dual to regain your standing as the captain of your ship! Turns out the crew member is pretty strong and you take a blow to the head. Luckily your stronger though, and you manage to defeat him in the end. You sail your ship through treacherous waters having not studied your map well, but you manage to land across an island that looks similar to the one layed out in your map. Is this the right place? Your unsure...');
});