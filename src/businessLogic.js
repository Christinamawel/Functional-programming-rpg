export function storeState(startState) {
  let currentState = startState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
}

export function startStateFunc() {
  return {
    Health: 10,
    Swordsmanship: skillRandomizer(), 
    Marksmanship: skillRandomizer(),
    Navigation: skillRandomizer(),
    Shipwrighting: skillRandomizer(),
    Bluff: skillRandomizer(),
    Intimidation: skillRandomizer(),
    Traits: []
  };
}

export function skillRandomizer() {
  return Math.floor(Math.random() * 6);
}

export function changeStateInt(prop) {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
}

export const healthChange = changeStateInt("Health");

export function changeStateReplaceString(prop) {
  return value => {
    return (state) => ({
      ...state,
      [prop] : value
    });
  };
}

export function addTrait(state) {
  const traitArray = [
    ["Intimidation", "Marksmanship", "Eye patch"],
    ["Swordsmanship","Navigation","Grumpy"],
    ["Bluff","Shipwrighting","Sneaky"],
    ["Marksmanship","Swordsmanship","Hook"],
    ["Navigation","Bluff","Smart"]
  ];
  if(traitArray.length === state.Traits.length) {
    return {...state};
  } else {
    let chosenTrait = traitArray[Math.floor(Math.random() * traitArray.length)];
    while(state.Traits.includes(chosenTrait[2])) {
      chosenTrait = traitArray[Math.floor(Math.random() * traitArray.length)];
    }
    return {
      ...state,
      Traits : [...state.Traits, chosenTrait[2]],
      [chosenTrait[0]] : (state[chosenTrait[0]] + 2),
      [chosenTrait[1]] : (state[chosenTrait[1]] - 1)
    };
  }
}

export function Battle(skill) {
  return function(numberToBeat) {
    const roll = Math.floor(Math.random() * 4) + skill;
    return roll > numberToBeat;
  };
}