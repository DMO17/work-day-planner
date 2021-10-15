// Store Html DOM elements in a variable
const timeBlockContainer = $("#time-block-container");

const timeBlockArray = [
  {
    plannerTime: "9",
    key: 9,
  },
  {
    plannerTime: "10",
    key: 10,
  },
  {
    plannerTime: "11",
    key: 11,
  },
  {
    plannerTime: "12",
    key: 12,
  },
  {
    plannerTime: "13",
    key: 13,
  },
  {
    plannerTime: "14",
    key: 14,
  },
  {
    plannerTime: "15",
    key: 15,
  },
  {
    plannerTime: "16",
    key: 16,
  },
  {
    plannerTime: "17",
    key: 17,
  },
];

// construct the time block section dynamically

function constructTimeBlockSection() {
  // use mapping method to produce time blocks for the whole day

  function callback(each) {
    const htmlTimeBlockCode = `
    <div class="single-event-row-container">
    <div   class="time-zone">${each.plannerTime}:00</div>
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
      <button type="button" class="btn btn-primary btn-lg" id="btn-${each.plannerTime}">
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

function onReady() {
  // get current day
  //
  //render current day
  //
  // render time block cards

  renderTimeBlock();
}

$(document).ready(onReady);
