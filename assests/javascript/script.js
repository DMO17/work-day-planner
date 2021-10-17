// Store Html DOM elements in a variable
const timeBlockContainer = $("#time-block-container");
const timeDateContainer = $("#currentDay");
const currentDayContainer = $("#header-container");

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

// construct date and time div on header

function constructDateTimeDiv() {
  const timeDate = moment().format("MMMM Do YYYY, h:mm: a");
  const currentDay = timeDateContainer.text(timeDate);
  return currentDayContainer.append(currentDay);
}

// construct the time block section dynamically

// construct color coding blocks to represent past present and future

function getClassId(time) {
  const hour = moment().hour();

  // const timeText = $('.time-zone')
  // console.log(timeText.text())

  if (hour == time) {
    return "present";
  } else if (hour > time) {
    //render red block for past
    return "past";
  } else return "future";
}

function constructTimeBlockSection() {
  // use mapping method to produce time blocks for the whole day

  function callback(timeObj) {
    const htmlTimeBlockCode = `
    <div class="single-event-row-container ${getClassId(timeObj.key)}" >
    <div   class="time-zone">${timeObj.label}</div>
    <div class="text-area">
      <textarea
        class="border border-dark"
        name="plan-text-area"
        id= '${timeObj.btnTextArea}'
        cols="50"
        rows="3"
      > ${saveTextAreaInput(timeObj.key)} </textarea>
    </div>
    <div>
      <button type="button" class="btn btn-primary btn-lg" data-time = "${
        timeObj.key
      }">
        SAVE
      </button>
    </div>
    </div>
    
    `;

    return htmlTimeBlockCode;
  }

  return timeBlockArray.map(callback).join("");
}

/// ??????????????????? not working
function saveTextAreaInput(timeNum) {
  // console.log(timeNum);
  const localStorageValues = getFromLocalStorage();

  // console.log(localStorageValues);

  const callback = function (each) {
    // console.log(each);
    if (timeNum === each.messageHour) {
      return each.hourlyMessage;
    } else {
      return "empty";
    }
  };
  const message = localStorageValues.find(callback);

  return message?.hourlyMessage || "";
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

function storeTextAreaInput(event) {
  const target = $(event.target);
  if (target.is("button")) {
    // get the time and message from text area
    const hour = target.data("time");
    const message = target.parent().prev().children().val();

    // store the time and message in a object
    const timePlanObj = {
      messageHour: hour,
      hourlyMessage: message,
    };

    // get from local storage

    const plannerDataFromLS = getFromLocalStorage();

    plannerDataFromLS.push(timePlanObj);

    // set in LS
    const convertToLSData = JSON.stringify(plannerDataFromLS);
    localStorage.setItem("planner", convertToLSData);
  }
}

timeBlockContainer.on("click", storeTextAreaInput);

// when window loads

function onReady() {
  // initialize the storage
  InitializeLocalStorage();

  // get from local storage
  getFromLocalStorage();

  //render current day and time
  constructDateTimeDiv();

  // render time block cards
  renderTimeBlock();
}

$(document).ready(onReady);
