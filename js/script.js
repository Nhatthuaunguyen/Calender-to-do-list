const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector("#prev"),
    next = document.querySelector("#next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// add days
function initalCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // top of calendar
    date.innerHTML = months[month] + " " + year;
    // adding days
    let days = "";
    // prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // current month days
    for (let i = 1; i <= lastDate; i++) {
        // if day is today, add class today
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    // next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
}

initalCalendar();

// prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initalCalendar();
}

// next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initalCalendar();
}

// eventListener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// today button function
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initalCalendar();
});

// date input function
dateInput.addEventListener("keyup", (e) => {
    // allow only numbers remove anything else 
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

// function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // some date validation
    if (dateArr.length === 2) {
        const inputMonth = parseInt(dateArr[0], 10);
        const inputYear = parseInt(dateArr[1], 10);
        if (inputMonth > 0 && inputMonth < 13 && !isNaN(inputYear)) {
            month = inputMonth - 1;
            year = inputYear;
            initalCalendar();
            return;
        }
        // invalid date
        alert("Invalid date");
    }
}
