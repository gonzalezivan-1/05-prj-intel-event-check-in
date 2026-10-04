const checkInForm = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const maxGoal = 50;
const teamKeys = ["water", "zero", "power"];
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};
const teamMessages = {
  water: [
    "Making waves for a brighter future!",
    "Team Water Wise is flowing strong!",
    "Every drop of effort makes a difference!",
  ],
  zero: [
    "Every step brings us closer to net zero!",
    "A lighter footprint, a stronger future!",
    "Team Net Zero is turning ambition into impact!",
  ],
  power: [
    "Clean energy is powering the way forward!",
    "Renewables are bringing bright ideas to life!",
    "The future is charged with possibility!",
  ],
};
const messageIndexes = { water: 0, zero: 0, power: 0 };
let attendeeCount = 0;

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName = attendeeNameInput.value.trim();
  const selectedTeam = teamSelect.value;
  const selectedTeamLabel = teamSelect.options[teamSelect.selectedIndex].text;
  const teamCountDisplay = document.getElementById(`${selectedTeam}Count`);
  const attendeeList = document.getElementById(`${selectedTeam}Attendees`);
  const attendeeListItem = document.createElement("li");

  attendeeListItem.textContent = attendeeName;
  attendeeList.appendChild(attendeeListItem);

  attendeeCount = attendeeCount + 1;
  teamCountDisplay.textContent = Number(teamCountDisplay.textContent) + 1;

  let leadingTeam = selectedTeam;
  let highestTeamCount = Number(teamCountDisplay.textContent);

  for (let index = 0; index < teamKeys.length; index++) {
    const currentTeam = teamKeys[index];
    const currentTeamCount = Number(
      document.getElementById(`${currentTeam}Count`).textContent,
    );

    if (currentTeamCount > highestTeamCount) {
      leadingTeam = currentTeam;
      highestTeamCount = currentTeamCount;
    }
  }

  const messages = teamMessages[selectedTeam];
  const messageIndex = messageIndexes[selectedTeam];
  const welcomeMessage = messages[messageIndex];
  messageIndexes[selectedTeam] = (messageIndex + 1) % messages.length;

  const progressPercentage = (attendeeCount / maxGoal) * 100;
  const displayedProgress = Math.min(progressPercentage, 100);

  attendeeCountDisplay.textContent = attendeeCount;
  progressBar.style.width = `${displayedProgress}%`;
  if (attendeeCount === maxGoal) {
    greeting.textContent = `Congratulations to ${teamNames[leadingTeam]}! Your team has the most attendees, and the event has reached ${maxGoal}. Thanks, ${attendeeName}, for joining ${selectedTeamLabel}.`;
  } else {
    greeting.textContent = `${welcomeMessage} Welcome, ${attendeeName}! You are checked in with ${selectedTeamLabel}.`;
  }
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  checkInForm.reset();
});
