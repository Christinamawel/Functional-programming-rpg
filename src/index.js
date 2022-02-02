import $ from 'jquery';
import './css/styles.css';
import * as Character from './businessLogic.js';
import PirateImg from './assets/images/pirate.jpg';

let currentChar = Character.storeState(Character.startStateFunc());
currentChar = Character.storeState(Character.addTrait("Intimidation")("Marksmanship")("Eye patch")(currentChar()));
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

  $("#text-box").append(`<p>${character.Traits[0]}</p>`);

  $("#pirate-img").attr("src", PirateImg);
}