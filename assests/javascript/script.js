// Store Html DOM elements in a variable
const timeBlockContainer = $("#time-block-container");

const timeBlockArray = [
  {
    label: "9",
    key: 9,
  },
  {
    label: "10",
    key: 10,
  },
  {
    label: "11",
    key: 11,
  },
  {
    label: "12",
    key: 12,
  },
  {
    label: "13",
    key: 13,
  },
  {
    label: "14",
    key: 14,
  },
  {
    label: "15",
    key: 15,
  },
  {
    label: "16",
    key: 16,
  },
  {
    label: "17",
    key: 17,
  },
];

// construct the time block section dynamically

function constructTimeBlockSection() {
  // use mapping method to produce time blocks for the whole day

  function callback(each) {
    const htmlTimeBlockCode = `
    <div class="single-event-row-container">
    <div   class="time-zone">${each.label}:00</div>
    <div class="text-area">
      <textarea
        class="border border-dark"
        name="plan-text-area"
        id="plan-text-area"
        cols="50"
        rows="3"
      ></textarea>
    </div>
    <div>
      <button type="button" class="btn btn-primary btn-lg" id="btn-${each.label}">
        SAVE
      </button>
    </div>
    </div>
    
    `;

    return htmlTimeBlockCode;
  }

  return timeBlockArray.map(callback).join("");
}

console.log(constructTimeBlockSection());

function renderTimeBlock() {
  return timeBlockContainer.append(constructTimeBlockSection());
}

// initialize the local storage and get from local storage
function InitializeLocalStorage() {
  const planner = JSON.parse(localStorage.getItem("planner"));

  if (planner === null) {
    return localStorage.setItem("planner", JSON.stringify([]));
  }
}

function getFromLocalStorage() {
  const localStorageData = JSON.parse(localStorage.getItem("planner"));

  return localStorageData === null ? JSON.stringify([]) : localStorageData;
}

function onReady() {
  //   // initialize the storage
  InitializeLocalStorage();
  //   // get from local storage

  getFromLocalStorage();
  //   // get current day

  //   //render current day
  //   //
  //   // render time block cards

  renderTimeBlock();
}

$(document).ready(onReady);
