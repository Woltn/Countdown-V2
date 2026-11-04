
// ============================================================
// THE COUNTDOWN DASHBOARD
// VERSION 2.1
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================

const countdownTarget = new Date(2026, 11, 4, 17, 45, 0);

const scheduleStart = new Date(2026, 8, 8, 0, 0, 0);
const scheduleEnd = new Date(2026, 11, 4, 23, 59, 59);

const termStart = new Date(2026, 9, 5, 0, 0, 0);
const termEnd = countdownTarget;


// ============================================================
// CLASS CONFIGURATION
// ============================================================
//
// To ADD a class:
// Copy one of the class objects below and change its details.
//
// To REMOVE a class:
// Delete its entire object from this array.
//
// Days:
// 0 = Sunday
// 1 = Monday
// 2 = Tuesday
// 3 = Wednesday
// 4 = Thursday
// 5 = Friday
// 6 = Saturday
//
// Times use 24-hour format.
//
// ============================================================

const classes = [

    {
        id: "ballet",
        name: "Ballet",
        icon: "fa-person-running",
        days: [1, 2, 3, 4, 5],
        start: "14:45",
        end: "16:15",
        extras: [
            {
                date: "2026-11-07",
                start: "09:00",
                end: "09:45"
            }
        ]
    },

    {
        id: "vcass",
        name: "VCASS",
        icon: "fa-school",
        days: [1, 2, 3, 4, 5],
        sessions: [
            { day: 1, start: "08:30", end: "09:15" },
            { day: 1, start: "09:15", end: "10:00" },
            { day: 1, start: "10:20", end: "11:05" },
            { day: 1, start: "11:50", end: "12:35" },

            { day: 2, start: "12:35", end: "13:20" },
            { day: 2, start: "13:20", end: "14:05" },
            { day: 2, start: "14:05", end: "14:50" },
            { day: 2, start: "14:50", end: "15:35" },

            { day: 3, start: "08:30", end: "09:15" },
            { day: 3, start: "09:15", end: "10:00" },
            { day: 3, start: "10:20", end: "11:05" },
            { day: 3, start: "11:50", end: "12:35" },

            { day: 4, start: "13:20", end: "14:05" },
            { day: 4, start: "14:05", end: "14:50" },
            { day: 4, start: "14:50", end: "15:35" },

            { day: 5, start: "08:30", end: "09:15" },
            { day: 5, start: "09:15", end: "10:00" },
            { day: 5, start: "10:20", end: "11:05" },
            { day: 5, start: "11:50", end: "12:35" }
        ]
    },

    {
        id: "conditioning",
        name: "Conditioning",
        icon: "fa-dumbbell",
        sessions: [
            { day: 1, start: "14:05", end: "14:35" },
            { day: 3, start: "14:05", end: "14:35" }
        ]
    },

    {
        id: "gym",
        name: "Gym",
        icon: "fa-weight-hanging",
        sessions: [
            { day: 2, start: "16:45", end: "17:15" },
            { day: 4, start: "12:00", end: "12:30" }
        ]
    },

    {
        id: "character",
        name: "Character",
        icon: "fa-masks-theater",
        days: [5],
        start: "16:30",
        end: "17:45"
    },

    {
        id: "contemporary",
        name: "Contemporary",
        icon: "fa-music",
        days: [2],
        start: "10:00",
        end: "11:15"
    },

    {
        id: "classical-studies",
        name: "Classical Studies",
        icon: "fa-book-open",
        sessions: [
            { day: 1, start: "16:30", end: "17:15" },
            { day: 5, start: "15:30", end: "16:15" }
        ]
    },

    {
        id: "repertoire",
        name: "Repertoire",
        icon: "fa-star",
        days: [3],
        start: "16:30",
        end: "17:15",
        extras: [
            {
                date: "2026-10-31",
                start: "10:15",
                end: "10:30"
            }
        ]
    }

];


// ============================================================
// GLOBAL DATA
// ============================================================

let classSessions = [];


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


function pad(number) {
    return String(number).padStart(2, "0");
}


function formatDate(date) {
    return date.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


function formatTime(date) {
    return date.toLocaleTimeString("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}


function makeDate(dateString, timeString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);

    return new Date(year, month - 1, day, hours, minutes, 0);
}


// ============================================================
// GENERATE CLASS SESSIONS
// ============================================================

function generateClassSessions() {

    const sessions = [];

    classes.forEach(classInfo => {

        function addSession(date, start, end) {

            const startDate = makeDate(date, start);
            const endDate = makeDate(date, end);

            if (
                startDate >= scheduleStart &&
                endDate <= scheduleEnd
            ) {
                sessions.push({
                    id: classInfo.id,
                    name: classInfo.name,
                    icon: classInfo.icon,
                    start: startDate,
                    end: endDate
                });
            }
        }


        // Regular weekly sessions

        const currentDate = new Date(scheduleStart);

        while (currentDate <= scheduleEnd) {

            const day = currentDate.getDay();

            if (classInfo.sessions) {

                classInfo.sessions.forEach(session => {

                    if (session.day === day) {

                        const dateString =
                            `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(currentDate.getDate())}`;

                        addSession(
                            dateString,
                            session.start,
                            session.end
                        );
                    }

                });

            } else if (classInfo.days && classInfo.days.includes(day)) {

                const dateString =
                    `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(currentDate.getDate())}`;

                addSession(
                    dateString,
                    classInfo.start,
                    classInfo.end
                );

            }

            currentDate.setDate(currentDate.getDate() + 1);
        }


        // Additional one-off sessions

        if (classInfo.extras) {

            classInfo.extras.forEach(extra => {

                addSession(
                    extra.date,
                    extra.start,
                    extra.end
                );

            });

        }

    });


    sessions.sort((a, b) => a.start - b.start);

    return sessions;
}


// ============================================================
// CREATE CLASS CARDS
// ============================================================

function createClassCards() {

    const grid = getElement("classGrid");

    if (!grid) return;

    grid.innerHTML = "";


    classes.forEach((classInfo, index) => {

        const card = document.createElement("div");

        card.className = `class-card class-color-${index % 8}`;

        card.dataset.classId = classInfo.id;


        card.innerHTML = `

            <div class="class-card-top">

                <div class="class-icon">
                    <i class="fa-solid ${classInfo.icon}"></i>
                </div>

            </div>

            <h3>${classInfo.name}</h3>

            <div class="class-number" id="class-number-${classInfo.id}">
                --
            </div>

            <p>CLASSES REMAINING</p>

        `;


        grid.appendChild(card);

    });

}


// ============================================================
// UPDATE CLASS COUNTERS
// ============================================================

function updateClassCounters(now) {

    classes.forEach(classInfo => {

        const numberElement = getElement(
            `class-number-${classInfo.id}`
        );

        if (!numberElement) return;


        const remaining = classSessions.filter(session => {

            return (
                session.id === classInfo.id &&
                session.end > now
            );

        }).length;


        numberElement.textContent = remaining;

    });

}


// ============================================================
// COUNTDOWN
// ============================================================

function updateCountdown(now) {

    const difference = countdownTarget - now;

    if (difference <= 0) {

        getElement("days").textContent = "00";
        getElement("hours").textContent = "00";
        getElement("minutes").textContent = "00";
        getElement("seconds").textContent = "00";

        getElement("countdownMessage").textContent =
            "You've made it!";

        getElement("totalDaysRemaining").textContent = "0";

        return;
    }


    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;


    getElement("days").textContent = pad(days);
    getElement("hours").textContent = pad(hours);
    getElement("minutes").textContent = pad(minutes);
    getElement("seconds").textContent = pad(seconds);


    getElement("countdownMessage").textContent =
        "The finish line is getting closer!";

    getElement("totalDaysRemaining").textContent = days;

}


// ============================================================
// CURRENT DATE
// ============================================================

function updateCurrentDate(now) {

    const element = getElement("currentDate");

    if (!element) return;

    element.textContent = formatDate(now);

}


// ============================================================
// TERM PROGRESS
// ============================================================

function updateTermProgress(now) {

    const totalDuration = termEnd - termStart;

    const elapsed = now - termStart;

    let percentage = (elapsed / totalDuration) * 100;

    percentage = Math.max(0, Math.min(100, percentage));


    getElement("termProgress").textContent =
        `${percentage.toFixed(2)}%`;


    getElement("termProgressBar").style.width =
        `${percentage}%`;


    const remaining = Math.max(
        0,
        Math.ceil((termEnd - now) / 86400000)
    );


    getElement("progressRemaining").textContent =
        `${remaining} DAYS REMAINING`;

}


// ============================================================
// NEXT CLASS
// ============================================================

function updateNextClass(now) {

    const nextSession = classSessions.find(session => {
        return session.end > now;
    });


    if (!nextSession) {

        getElement("nextClassName").textContent =
            "No more classes!";

        getElement("nextClassDate").textContent =
            "You've reached the end.";

        getElement("nextClassTime").textContent = "--";

        return;
    }


    getElement("nextClassName").textContent =
        nextSession.name;


    if (now >= nextSession.start) {

        getElement("nextClassDate").textContent =
            "Currently in progress";

        getElement("nextClassTime").textContent =
            `Until ${formatTime(nextSession.end)}`;

    } else {

        getElement("nextClassDate").textContent =
            formatDate(nextSession.start);

        getElement("nextClassTime").textContent =
            formatTime(nextSession.start);

    }

}


// ============================================================
// MILESTONES
// ============================================================

function updateMilestones(now) {

    const milestones = [
        { days: 30, id: "milestone30" },
        { days: 14, id: "milestone14" },
        { days: 7, id: "milestone7" }
    ];


    milestones.forEach(milestone => {

        const date = new Date(countdownTarget);

        date.setDate(date.getDate() - milestone.days);

        const element = getElement(milestone.id);

        if (!element) return;


        if (now >= date) {

            element.textContent = "Reached!";

        } else {

            element.textContent = formatDate(date);

        }

    });

}


// ============================================================
// UPDATE DASHBOARD
// ============================================================

function updateCountdownDashboard() {

    const now = new Date();

    updateCurrentDate(now);

    updateCountdown(now);

    updateTermProgress(now);

    updateClassCounters(now);

    updateNextClass(now);

    updateMilestones(now);

}


// ============================================================
// INITIALISE APPLICATION
// ============================================================

function initialiseDashboard() {

    console.log("Initialising Countdown Dashboard...");


    // Generate all class sessions once.

    classSessions = generateClassSessions();


    // Create class cards once.
    // They will not be rebuilt every second.

    createClassCards();


    // Initial dashboard update.

    updateCountdownDashboard();


    // Refresh countdown and counters every second.

    setInterval(updateCountdownDashboard, 1000);


    console.log("Countdown Dashboard ready.");
    console.log("Version 2.1");

}


// ============================================================
// START APPLICATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    initialiseDashboard
);
