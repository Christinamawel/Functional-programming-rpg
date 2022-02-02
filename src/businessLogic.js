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

export function changeStateReplaceString(prop) {
  return value => {
    return (state) => ({
      ...state,
      [prop] : value
    });
  };
}

export function addTrait(buffedSkill) {
  return (nerfedSkill) => {
    return (name) => {
      return (state) => {
        return {
          ...state,
          Traits : [...state.Traits, name],
          [buffedSkill] : (state[buffedSkill] + 2),
          [nerfedSkill] : (state[nerfedSkill] - 1)
        };
      };
    };
  };
}