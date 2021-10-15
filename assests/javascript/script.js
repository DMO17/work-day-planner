// Store Html DOM elements in a variable
const timeBlockContainer = $("#time-block-container");

const timeBlockArray = [
  {
    label: "9",
    key: 9,
    btnTextArea: "btnText9",
  },
  {
    label: "10",
    key: 10,
    btnTextArea: "btnText10",
  },
  {
    label: "11",
    key: 11,
    btnTextArea: "btnText11",
  },
  {
    label: "12",
    key: 12,
    btnTextArea: "btnText12",
  },
  {
    label: "13",
    key: 13,
    btnTextArea: "btnText13",
  },
  {
    label: "14",
    key: 14,
    btnTextArea: "btnText14",
  },
  {
    label: "15",
    key: 15,
    btnTextArea: "btnText15",
  },
  {
    label: "16",
    key: 16,
    btnTextArea: "btnText16",
  },
  {
    label: "17",
    key: 17,
    btnTextArea: "btnText17",
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
        id= '${each.btnTextArea}'
        cols="50"
        rows="3"
      ></textarea>
    </div>
    <div>
      <button type="button" class="btn btn-primary btn-lg" id= '${each.btnTextArea}'>
        SAVE
      </button>
    </div>
    </div>
    
    `;

    return htmlTimeBlockCode;
  }

  return timeBlockArray.map(callback).join("");
}

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

// save the text area message in local storage

function storeTextAreaInput(event) {
  const dayPlannerTextArea = $("textarea");
  const target = $(event.target);

  if (target.is("button")) {
    const btnId = target.attr("id");
    const textAreaId = target.attr("id");
    if (btnId == textAreaId) console.log(`1yesssss`);
  } else console.log(`nope`);
}

timeBlockContainer.on("click", storeTextAreaInput);

// when window loads

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
