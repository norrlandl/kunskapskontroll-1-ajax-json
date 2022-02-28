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
resultBtn.addEventListener('click', fetchDataRoster);

// $('#result #button-rosters').on('click', fetchDataRoster);

async function fetchDataTeam(e) {
  resultRosters.innerHTML = '';
  // e.preventDefault();
  // const theClickedLink = e.target;
  // const subject = theClickedLink.id;
  // const title = theClickedLink.innerText;

  try {
    const response = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' + input.value
    );
    // if (!response.ok) {
    //   throw new Error('Something went wrong with the server');
    // }
    const data = await response.json();
    console.log(data);
    console.log(data.teams);

    // const dataRosters = await responseRosters.json();
    // console.log(dataRosters);

    let nhl = '';
    for (let teams of data.teams) {
      nhl += `
                <i>${teams.teamName}</i>
                <h5>${teams.name}</h5>
                <h6> City: ${teams.locationName}</h6>
                <h6> Conference: ${teams.conference.name}</h6>
                <h6> Webbsite:  <a href="${teams.officialSiteUrl}" target="_blank">${teams.officialSiteUrl}</a></h6>
            
            `;
    }
    result.innerHTML = nhl;
  } catch (error) {
    console.log(error);
  }
}

async function fetchDataRoster(e) {
  try {
    const responseRosters = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' +
        input.value +
        '?expand=team.roster'
    );
    const dataRosters = await responseRosters.json();
    console.log(dataRosters);

    let teamRosters = dataRosters.teams[0].roster.roster;
    console.log(teamRosters);

    let rosters = '';
    for (let player of teamRosters) {
      rosters += `
                  <div class="player">
                  <h6>${player.jerseyNumber}</h6>

                  <i>${player.position.name}</i>
                  <h5 class="name">${player.person.fullName}</h5>
                  </div>`;
    }
    resultRosters.innerHTML = rosters;
  } catch (error) {
    console.log(error);
  }
}
