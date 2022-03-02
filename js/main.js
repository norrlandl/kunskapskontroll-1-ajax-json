/**
 *  NHL
 *	https://statsapi.web.nhl.com/api/v1/teams/
 *
 */

('use strict');

const btn = document.getElementById('button');
const input = document.getElementById('input');
const result = document.getElementById('result');
const resultRosters = document.getElementById('result-rosters');
const resultBtn = document.getElementById('button-rosters');

/**
 *
 *
 *
 */

btn.addEventListener('click', fetchDataTeam);
resultBtn.addEventListener('click', fetchDataRosters);

/**
 *
 *
 *
 */

async function fetchDataTeam(e) {
  resultRosters.innerHTML = '';

  try {
    const response = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' + input.value
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the server');
    }

    const data = await response.json();
    result.innerHTML = team(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchDataRosters(e) {
  try {
    const response = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' +
        input.value +
        '?expand=team.roster'
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the server');
    }

    const data = await response.json();
    resultRosters.innerHTML = rosters(data);
  } catch (error) {
    console.log(error);
  }
}

function rosters(data) {
  let teamRosters = data.teams[0].roster.roster;
  let rosters = '';
  for (let player of teamRosters) {
    rosters += `
                <div class="player">
                <div class="number"> ${player.jerseyNumber} </div>
                <i> ${player.position.name} </i>
                <h5 class="name"> ${player.person.fullName} </h5>
                </div>`;
  }
  return rosters;
}

function team(data) {
  let nhl = '';
  for (let teams of data.teams) {
    nhl += `
              <i> ${teams.teamName} </i>
              <h5> ${teams.name} </h5>
              <h6> City: ${teams.locationName}</h6>
              <h6> Conference: ${teams.conference.name}</h6>
              <h6> Webbsite:  <a href="${teams.officialSiteUrl}" target="_blank">${teams.officialSiteUrl}</a></h6>
          `;
  }
  return nhl;
}
