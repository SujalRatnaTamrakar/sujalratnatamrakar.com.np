/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const button = document.getElementById("time_button");

const ctx = document.getElementById("axes_line_chart").getContext("2d");
let today = new Date();
let yesterday = new Date(today.setDate(today.getDate() - 1));
console.log(yesterday);
let current = new Date();
if(today.getDay()==0){
  var firstDayOfWeek = new Date(current.setDate(current.getDate() - 7));
}else{
  var firstDayOfWeek = new Date(current.setDate(current.getDate() - current.getDay()-1));
};
// APP VARIABLES
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [],
  weekly_cases_list = [],
  weekly_recovered_list = [],
  weekly_deaths_list = [],
  dropdownItems,
  selected,
  country_code="",
  user_country="",
  countryName="";

// GET USERS COUNTRY CODE
// let country_code = geoplugin_countryCode();
// let user_country;
// country_list.forEach((country) => {
//   if (country.code == country_code) {
//     user_country = country.name;
//   }
// });
_ipgeolocation.enableSessionStorage(true);
_ipgeolocation.makeAsyncCallsToAPI(false);
_ipgeolocation.getGeolocation(handleResponse, "b8e0f1ef2893413dbdf023aed4f73ec8");
function handleResponse(response) {
    country_code=response.country_code2;
    country_list.forEach((country) => {
      if (country.code == country_code) {
        user_country = response.country_name;
      }
    });
}



// Which_li_selected
dropdownItems = document.querySelectorAll(".dropdown-menu li");
for (var i = 0; i < dropdownItems.length; i++){
    dropdownItems[i].addEventListener('mousedown', function(){
      selected=this.innerHTML;
      button.innerHTML=this.innerHTML;
    });
  }
// country_name_element.addEventListener('DOMSubtreeModified', function(){
//   if(country_name_element.innerHTML=="Loading..."){
//     button.disabled=true;
//   }else{
//     button.disabled=false;
//   }
//   button.innerHTML=country_name_element.innerHTML;
// });
observer = new MutationObserver(function(mutationsList, observer) {
    if (country_name_element.innerHTML=="Loading...") {
      button.disabled=true;
    }else{
      button.disabled=false;
    }

});
observer.observe(country_name_element, {characterData: false, childList: true, attributes: false});


/* ---------------------------------------------- */
/*                     FETCH API                  */
/* ---------------------------------------------- */
function fetchData(country) {
  user_country = country;
  country_name_element.innerHTML = "Loading...";
  button.innerHTML="Total";
  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);


  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
      });

    updateUI();
  };

  api_fetch(country);
}

// TOTAL
function fetchDataTotal() {
  countryName = country_name_element.innerHTML;
  user_country = countryName;
  country_name_element.innerHTML = "Loading...";


  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        countryName +
        "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
        countryName +
        "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + countryName + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
      });

    updateUI();
  };

  api_fetch(countryName);
}


// THIS_WEEK
function fetchDataWeek() {
  countryName = country_name_element.innerHTML;
  user_country = countryName;
  country_name_element.innerHTML = "Loading...";


  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        countryName +
        "/status/confirmed?from="+
        firstDayOfWeek.getFullYear()+"-"+(firstDayOfWeek.getMonth()+1)+"-"+firstDayOfWeek.getDate()+"T00:00:00Z&to="+
        yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+(yesterday.getDate())+"T00:00:00Z",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
        weekly_cases_list = cases_list.map((v, i, a) => v - (a[i-1] || cases_list[0]));
        weekly_cases_list.splice(0,1);
        cases_list.splice(0, cases_list.length, ...weekly_cases_list);
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
        countryName +
        "/status/recovered?from="+
        firstDayOfWeek.getFullYear()+"-"+(firstDayOfWeek.getMonth()+1)+"-"+firstDayOfWeek.getDate()+"T00:00:00Z&to="+
        yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+(yesterday.getDate())+"T00:00:00Z",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
        weekly_recovered_list = recovered_list.map((v, i, a) => v - (a[i-1] || recovered_list[0]));
        weekly_recovered_list.splice(0,1);
        recovered_list.splice(0, recovered_list.length, ...weekly_recovered_list);
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
      countryName +
      "/status/deaths?from="+
      firstDayOfWeek.getFullYear()+"-"+(firstDayOfWeek.getMonth()+1)+"-"+firstDayOfWeek.getDate()+"T00:00:00Z&to="+
      yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+(yesterday.getDate())+"T00:00:00Z",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
        weekly_deaths_list = deaths_list.map((v, i, a) => v - (a[i-1] || deaths_list[0]));
        weekly_deaths_list.splice(0,1);
        deaths_list.splice(0, deaths_list.length, ...weekly_deaths_list);
      });

    updateUI();
  };

  api_fetch(user_country);
}
// THIS_WEEK


// fetchData(user_country);
switch(selected){
  case "Today":
    fetchDataToday();
    break;
  case "This week":
    fetchDataWeek();
    break;
  default:
    fetchData(user_country);
    break;
}


// UPDATE UI FUNCTION
function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {


  if(selected=="This week"){
    const total_cases = cases_list.reduce((a, b) => a + b, 0);
    const new_confirmed_cases = Math.abs(cases_list[cases_list.length - 1] - cases_list[cases_list.length - 2]);

    const total_recovered = recovered_list.reduce((a, b) => a + b, 0);
    const new_recovered_cases = Math.abs(recovered_list[recovered_list.length - 1] - recovered_list[recovered_list.length - 2]);

    const total_deaths = deaths_list.reduce((a, b) => a + b, 0);
    const new_deaths_cases = Math.abs(deaths_list[deaths_list.length - 1] - deaths_list[deaths_list.length - 2]);
    country_name_element.innerHTML = user_country;
    total_cases_element.innerHTML = total_cases;
    new_cases_element.innerHTML = `+${new_confirmed_cases}`;
    recovered_element.innerHTML = total_recovered;
    new_recovered_element.innerHTML = `+${new_recovered_cases}`;
    deaths_element.innerHTML = total_deaths;
    new_deaths_element.innerHTML = `+${new_deaths_cases}`;
  }else{
    const total_cases = cases_list[cases_list.length - 1];
    const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

    const total_recovered = recovered_list[recovered_list.length - 1];
    const new_recovered_cases =
      total_recovered - recovered_list[recovered_list.length - 2];

    const total_deaths = deaths_list[deaths_list.length - 1];
    const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];
    country_name_element.innerHTML = user_country;
    total_cases_element.innerHTML = total_cases;
    new_cases_element.innerHTML = `+${new_confirmed_cases}`;
    recovered_element.innerHTML = total_recovered;
    new_recovered_element.innerHTML = `+${new_recovered_cases}`;
    deaths_element.innerHTML = total_deaths;
    new_deaths_element.innerHTML = `+${new_deaths_cases}`;
  }



  // format dates
  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#FFC107",
          backgroundColor: "#FFC107",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#28A745",
          backgroundColor: "#28A745",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#DC3545",
          backgroundColor: "#DC3545",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// FORMAT DATES
const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);
  let index = (date.getMonth()) % (monthsNames.length);
  return `${date.getDate()+1} ${monthsNames[date.getMonth()]}`;
}
