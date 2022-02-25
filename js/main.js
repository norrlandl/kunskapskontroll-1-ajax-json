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

/**
 *
 *
 *
 */

btn.addEventListener('click', function () {
  fetchData();
});

async function fetchData(e) {
  // e.preventDefault();
  // const theClickedLink = e.target;
  // const subject = theClickedLink.id;
  // const title = theClickedLink.innerText;

  try {
    const response = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' + input.value
    );
    const responseRosters = await fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/' +
        input.value +
        '?expand=team.roster'
    );
    // if (!response.ok) {
    //   throw new Error('Something went wrong with the server');
    // }
    const data = await response.json();
    console.log(data);
    console.log(data.teams);

    const dataRosters = await responseRosters.json();
    console.log(dataRosters);

    let nhl = '';
    for (let teams of data.teams) {
      nhl += `
                <i>${teams.teamName}</i>
                <h5>${teams.name}</h5>
                <h6> City: ${teams.locationName}</h6>
                <h6> Conference: ${teams.conference.name}</h6>
                <h6> Webbsite:  <a href="${teams.officialSiteUrl}" target="_blank">${teams.officialSiteUrl}</a></h6>
               
                <button class="btn btn-outline-secondary" type="button" id="button-rosters"> Rosters </button>
            `;
    }
    result.innerHTML = nhl;

    $('#result #button-rosters').on('click', function () {
      const theClickedPostLink = $(this); // jQuery way

      let teamRosters = dataRosters.teams[0].roster.roster;
      let rosters = '';
      for (let player of teamRosters) {
        rosters += `
                  <h6>${player.jerseyNumber}</h6>

                  <i>${player.position.name}</i>
                  <h5 class="name">${player.person.fullName}</h5>`;
      }
      resultRosters.innerHTML = rosters;
    });
  } catch (error) {
    console.log(error);
  }
}
