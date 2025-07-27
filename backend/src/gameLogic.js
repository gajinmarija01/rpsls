// RPSLS Game Logic
const choices = [
  { id: 1, name: "rock" },
  { id: 2, name: "paper" },
  { id: 3, name: "scissors" },
  { id: 4, name: "lizard" },
  { id: 5, name: "spock" },
];

const gameRules = {
  rock: {
    beats: ["scissors", "lizard"],
    beatenBy: ["paper", "spock"],
  },
  paper: {
    beats: ["rock", "spock"],
    beatenBy: ["scissors", "lizard"],
  },
  scissors: {
    beats: ["paper", "lizard"],
    beatenBy: ["rock", "spock"],
  },
  lizard: {
    beats: ["paper", "spock"],
    beatenBy: ["rock", "scissors"],
  },
  spock: {
    beats: ["rock", "scissors"],
    beatenBy: ["paper", "lizard"],
  },
};

function getChoiceById(id) {
  return choices.find((choice) => choice.id === id) || choices[0];
}

function getChoiceByName(name) {
  return choices.find((choice) => choice.name === name);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  const playerChoiceName = getChoiceById(playerChoice).name;
  const computerChoiceName = getChoiceById(computerChoice).name;

  const playerRules = gameRules[playerChoiceName];

  if (playerRules.beats.includes(computerChoiceName)) {
    return "win";
  } else {
    return "lose";
  }
}

module.exports = {
  choices,
  getChoiceById,
  getChoiceByName,
  determineWinner,
};
