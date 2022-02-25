/**
 *  NHL
 *	https://statsapi.web.nhl.com/api/v1/teams/
 *
 */

('use strict');

const btn = document.getElementById('button');
const input = document.getElementById('input');
const result = document.getElementById('result');
const searchWord = input.value;

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
    const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/');
    // if (!response.ok) {
    //   throw new Error('Something went wrong with the server');
    // }
    const data = await response.json();
    console.log(data);
    console.log(data.teams);
    let nhl = '';

    function inputName(theName) {
      for (let teams of data.teams) {
        nhl += ` 
                <h6>${teams.name}</h6>
            `;
      }
      console.log(nhl);
    }

    inputName(searchWord);
    result.innerHTML = nhl;
  } catch (error) {
    console.log(error);
  }
}
