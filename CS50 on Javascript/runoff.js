// Max voters and candidates
const MAX_VOTERS = 100;
const MAX_CANDIDATES = 9;

// preferences[i][j] is the jth preference for voter i
const preferences = Array.from({ length: MAX_VOTERS }, () => Array(MAX_CANDIDATES).fill(0));

// Candidates have a name, vote count, and eliminated status
const candidates = Array(MAX_CANDIDATES).fill(null).map(() => ({
  name: "",
  votes: 0,
  eliminated: false,
}));

// Numbers of voters and candidates
let voter_count = 0;
let candidate_count = 0;

// Function to get input from the user using prompts
function getInput(promptMessage) {
  return prompt(promptMessage);
}

// Function prototypes
function vote(voter, rank, name) {
  for (let i = 0; i < candidate_count; i++) {
    if (name === candidates[i].name) {
      preferences[voter][rank] = i;
      return true;
    }
  }
  return false;
}

function tabulate() {
  for (let i = 0; i < candidate_count; i++) {
    candidates[i].votes = 0;
  }

  for (let i = 0; i < voter_count; i++) {
    let top_preference = 0;
    while (candidates[preferences[i][top_preference]].eliminated) {
      top_preference++;
    }
    candidates[preferences[i][top_preference]].votes++;
  }
}

function print_winner() {
  const majority_vote = Math.floor(voter_count / 2) + 1;

  for (let i = 0; i < candidate_count; i++) {
    if (candidates[i].votes >= majority_vote && !candidates[i].eliminated) {
      console.log(candidates[i].name);
      return true;
    }
  }
  return false;
}

function find_min() {
  let min_votes = voter_count;

  for (let i = 0; i < candidate_count; i++) {
    if (!candidates[i].eliminated && candidates[i].votes < min_votes) {
      min_votes = candidates[i].votes;
    }
  }
  return min_votes;
}

function is_tie(min) {
  for (let i = 0; i < candidate_count; i++) {
    if (!candidates[i].eliminated && candidates[i].votes !== min) {
      return false;
    }
  }
  return true;
}

function eliminate(min) {
  for (let i = 0; i < candidate_count; i++) {
    if (!candidates[i].eliminated && candidates[i].votes === min) {
      candidates[i].eliminated = true;
    }
  }
}

function main() {
  // Prompt for candidate names
  const candidateNames = [];
  let candidateName;
  while (true) {
    candidateName = getInput("Enter a candidate's name (or type 'done' to finish): ");
    if (candidateName === "done") {
      break;
    }
    candidateNames.push(candidateName);
  }

  if (candidateNames.length === 0) {
    console.log("You must enter at least one candidate.");
    return;
  }

  candidate_count = candidateNames.length;
  for (let i = 0; i < candidate_count; i++) {
    candidates[i].name = candidateNames[i];
  }

  voter_count = parseInt(getInput("Number of voters: "));

  if (voter_count > MAX_VOTERS) {
    console.log(`Maximum number of voters is ${MAX_VOTERS}`);
    return;
  }

  // Keep querying for votes
  for (let i = 0; i < voter_count; i++) {
    for (let j = 0; j < candidate_count; j++) {
      const name = getInput(`Rank ${j + 1}: `);
      if (!vote(i, j, name)) {
        console.log("Invalid vote.");
        return;
      }
    }
  }

  while (true) {
    tabulate();
    const won = print_winner();
    if (won) {
      break;
    }

    const min = find_min();
    const tie = is_tie(min);

    if (tie) {
      for (let i = 0; i < candidate_count; i++) {
        if (!candidates[i].eliminated) {
          console.log(candidates[i].name);
        }
      }
      break;
    }

    eliminate(min);

    for (let i = 0; i < candidate_count; i++) {
      candidates[i].votes = 0;
    }
  }
}

main();
