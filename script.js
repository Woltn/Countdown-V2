// ============================================================
// THE COUNTDOWN — VERSION 2.1
// ============================================================

console.log("The Countdown - Version 2.1");

// ============================================================
// CONFIGURATION
// ============================================================

const targetDate = new Date(2026, 11, 4, 17, 15, 0);

const firstPeriod = new Date(2026, 8, 8, 0, 0, 0);

const secondPeriod = new Date(2026, 9, 5, 0, 0, 0);

const termStart = new Date(2026, 9, 5, 0, 0, 0);

const termEnd = targetDate;

const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


// ============================================================
// CLASS DEFINITIONS
// ============================================================

// EDIT YOUR CLASSES HERE:
// Add a new object to this array to create a class.
// Remove an object to remove that class from the dashboard.
// Each weekly session uses day: 0 (Sunday) to 6 (Saturday).
// Times use 24-hour format, e.g. "14:45".

const classes = [

    {
        id: "ballet",
        name: "Ballet",
        category: "Dance",
        icon: "fa-shoe-prints",

        weekly: [
            { day: 1, start: "14:45", end: "16:15" },
            { day: 2, start: "08:30", end: "09:45" },
            { day: 3, start: "14:45", end: "16:15" },
            { day: 4, start: "08:30", end: "10:00" },
            { day: 5, start: "13:45", end: "15:15" }
        ],

        extras: [
            {
                id: "extra-ballet-1",
                date: "2026-11-07",
                start: "09:00",
                end: "09:45"
            }
        ]
    },


    {
        id: "vcass",
        name: "VCASS",
        category: "School",
        icon: "fa-school",

        weekly: [
            // Monday
            { day: 1, start: "08:30", end: "09:15" },
            { day: 1, start: "09:15", end: "10:00" },
            { day: 1, start: "10:20", end: "11:05" },
            { day: 1, start: "11:50", end: "12:35" },

            // Tuesday
            { day: 2, start: "12:35", end: "13:20" },
            { day: 2, start: "13:20", end: "14:05" },
            { day: 2, start: "14:05", end: "14:50" },
            { day: 2, start: "14:50", end: "15:35" },

            // Wednesday
            { day: 3, start: "08:30", end: "09:15" },
            { day: 3, start: "09:15", end: "10:00" },
            { day: 3, start: "10:20", end: "11:05" },
            { day: 3, start: "11:50", end: "12:35" },

            // Thursday
            { day: 4, start: "13:20", end: "14:05" },
            { day: 4, start: "14:05", end: "14:50" },
            { day: 4, start: "14:50", end: "15:35" },

            // Friday
            { day: 5, start: "08:30", end: "09:15" },
            { day: 5, start: "09:15", end: "10:00" },
            { day: 5, start: "10:20", end: "11:05" },
            { day: 5, start: "11:50", end: "12:35" }
        ],

        extras: []
    },


    {
        id: "conditioning",
        name: "Conditioning",
        category: "Fitness",
        icon: "fa-dumbbell",

        weekly: [
            { day: 1, start: "14:05", end: "14:35" },
            { day: 3, start: "14:05", end: "14:35" }
        ],

        extras: []
    },


    {
        id: "gym",
        name: "Gym",
        category: "Fitness",
        icon: "fa-heart-pulse",

        weekly: [
            { day: 2, start: "16:45", end: "17:15" },
            { day: 4, start: "12:00", end: "12:30" }
        ],

        extras: []
    },


    {
        id: "character",
        name: "Character",
        category: "Dance",
        icon: "fa-person-walking",

        weekly: [
            { day: 5, start: "16:30", end: "17:45" }
        ],

        extras: []
    },


    {
        id: "contemporary",
        name: "Contemporary",
        category: "Dance",
        icon: "fa-music",

        weekly: [
            { day: 2, start: "10:00", end: "11:15" }
        ],

        extras: []
    },


    {
        id: "classical-studies",
        name: "Classical Studies",
        category: "Studies",
        icon: "fa-book-open",

        weekly: [
            { day: 1, start: "16:30", end: "17:15" },
            { day: 5, start: "15:30", end: "16:15" }
        ],

        extras: []
    },


    {
        id: "repertoire",
        name: "Repertoire",
        category: "Dance",
        icon: "fa-star",

        weekly: [
            { day: 3, start: "16:30", end: "17:15" }
        ],

        extras: [
            {
                id: "extra-repertoire-1",
                date: "2026-10-31",
                start: "10:15",
                end: "10:30"
            }
        ]
    }

];


// ============================================================
// GENERAL HELPERS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


function pad(number) {
    return String(number).padStart(2, "0");
}


function formatTime(time) {

    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date(2026, 0, 1, hours, minutes);

    return date.toLocaleTimeString("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

}


function formatDate(date) {

    return date.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


function createDate(date, time) {

    const [hours, minutes] = time.split(":").map(Number);

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes,
        0
    );

}


function formatDuration(milliseconds) {

    const totalSeconds = Math.max(
        0,
        Math.floor(milliseconds / 1000)
    );

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(totalSeconds / 3600) % 24;

    const minutes = Math.floor(totalSeconds / 60) % 60;

    const seconds = totalSeconds % 60;

    if (days > 0) {

        return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    }

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

}


// ============================================================
// CLASS PERIOD CHECKING
// ============================================================

function isPeriodActive(date, period) {

    const inFirstPeriod =
        date >= firstPeriod &&
        date < secondPeriod;

    const inSecondPeriod =
        date >= secondPeriod &&
        date <= targetDate;

    if (period === "first") {
        return inFirstPeriod;
    }

    if (period === "second") {
        return inSecondPeriod;
    }

    return inFirstPeriod || inSecondPeriod;

}


// ============================================================
// GENERATE ALL CLASS SESSIONS
// ============================================================

function getAllClasses(classInfo) {

    const sessions = [];

    // ========================================
    // RECURRING WEEKLY CLASSES
    // ========================================

    const currentDate = new Date(firstPeriod);

    while (currentDate <= targetDate) {

        if (isPeriodActive(currentDate, "all")) {

            const weekday = currentDate.getDay();

            for (const session of classInfo.weekly) {

                if (session.day !== weekday) {
                    continue;
                }

                if (!isPeriodActive(currentDate, session.period || "all")) {
                    continue;
                }

                const start = createDate(
                    currentDate,
                    session.start
                );

                const end = createDate(
                    currentDate,
                    session.end
                );

                if (end <= targetDate) {

                    sessions.push({
                        start,
                        end,
                        type: "weekly"
                    });

                }

            }

        }

        currentDate.setDate(
            currentDate.getDate() + 1
        );

    }


    // ========================================
    // ONE-TIME CLASSES
    // ========================================

    for (const extra of classInfo.extras) {

        const [year, month, day] =
            extra.date.split("-").map(Number);

        const start = new Date(
            year,
            month - 1,
            day,
            ...extra.start.split(":").map(Number),
            0
        );

        const end = new Date(
            year,
            month - 1,
            day,
            ...extra.end.split(":").map(Number),
            0
        );

        if (
            start >= firstPeriod &&
            end <= targetDate &&
            end > start
        ) {

            sessions.push({
                start,
                end,
                type: "extra",
                extraId: extra.id
            });

        }

    }


    // Put everything in chronological order.

    sessions.sort(
        (a, b) => a.start - b.start
    );

    return sessions;

}


// ============================================================
// CLASS COUNTERS
// ============================================================

function countClassesLeft(classInfo, now) {

    const sessions = getAllClasses(classInfo);

    return sessions.filter(session =>
        session.end > now
    ).length;

}


// Keep references to the counter numbers so cards are not rebuilt
// every second. This prevents the class cards from flashing.
const classCardNumbers = new Map();

function createClassCards() {

    const grid = getElement("classGrid");

    if (!grid) return;

    grid.replaceChildren();
    classCardNumbers.clear();

    classes.forEach((classInfo, index) => {

        const card = document.createElement("div");

        card.className =
            `class-card class-color-${index % 8}`;

        card.dataset.classId = classInfo.id;

        const top = document.createElement("div");
        top.className = "class-card-top";

        const icon = document.createElement("div");
        icon.className = "class-icon";

        const iconElement = document.createElement("i");
        iconElement.className =
            `fa-solid ${classInfo.icon || "fa-book"}`;

        icon.appendChild(iconElement);

        const category = document.createElement("span");
        category.className = "class-category";
        category.textContent = classInfo.category || "Other";

        top.append(icon, category);

        const number = document.createElement("div");
        number.className = "class-number";
        number.textContent = "0";

        const name = document.createElement("h3");
        name.textContent = classInfo.name;

        const description = document.createElement("p");
        description.textContent = "Classes remaining";

        const footer = document.createElement("div");
        footer.className = "class-card-footer";

        const indexNumber = document.createElement("span");
        indexNumber.textContent = pad(index + 1);

        const line = document.createElement("span");
        line.className = "class-line";

        const arrow = document.createElement("i");
        arrow.className = "fa-solid fa-arrow-right";

        footer.append(indexNumber, line, arrow);
        card.append(top, number, name, description, footer);
        grid.appendChild(card);

        classCardNumbers.set(classInfo.id, number);
    });

}


function updateClassCounters(now) {

    classes.forEach(classInfo => {

        const number = classCardNumbers.get(classInfo.id);

        if (!number) return;

        const remaining = countClassesLeft(classInfo, now);

        // Only update the text when the value has actually changed.
        const nextValue = String(remaining);

        if (number.textContent !== nextValue) {
            number.textContent = nextValue;
        }

    });

}


// ============================================================
// MAIN COUNTDOWN
// ============================================================

function updateCountdown(now) {

    const difference = Math.max(
        0,
        targetDate - now
    );

    const totalSeconds = Math.floor(
        difference / 1000
    );

    const days = Math.floor(
        totalSeconds / 86400
    );

    const hours = Math.floor(
        totalSeconds / 3600
    ) % 24;

    const minutes = Math.floor(
        totalSeconds / 60
    ) % 60;

    const seconds = totalSeconds % 60;


    getElement("days").textContent = days;

    getElement("hours").textContent = pad(hours);

    getElement("minutes").textContent = pad(minutes);

    getElement("seconds").textContent = pad(seconds);


    getElement("totalDaysRemaining").textContent =
        `${days} DAYS`;


    const message = getElement("countdownMessage");

    if (difference === 0) {

        message.textContent =
            "The countdown is complete. You Survived";

    } else if (days <= 7) {

        message.textContent =
            "The final week until you escape this place";

    } else if (days <= 30) {

        message.textContent =
            "The final month until you escape this place";

    } else {

        message.textContent =
            "The countdown is underway";

    }

}


// ============================================================
// CURRENT DATE
// ============================================================

function updateCurrentDate(now) {

    getElement("currentDate").textContent =
        now.toLocaleDateString("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}


// ============================================================
// TERM PROGRESS
// ============================================================

function updateTermProgress(now) {

    const totalDuration = termEnd - termStart;

    const elapsed = now - termStart;

    let progress = (
        elapsed / totalDuration
    ) * 100;

    progress = Math.max(
        0,
        Math.min(100, progress)
    );

    const percentage = progress.toFixed(3);


    getElement("termProgress").textContent =
        `${percentage}%`;


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
// UPCOMING CLASS
// ============================================================

function updateNextClass(now) {

    const allSessions = [];

    classes.forEach(classInfo => {

        getAllClasses(classInfo).forEach(session => {

            allSessions.push({
                ...session,
                className: classInfo.name
            });

        });

    });


    allSessions.sort(
        (a, b) => a.start - b.start
    );


    // Check whether a class is currently happening.

    const activeClass = allSessions.find(session =>
        session.start <= now &&
        session.end > now
    );


    // Otherwise find the next upcoming class.

    const nextClass = activeClass ||
        allSessions.find(session =>
            session.start > now
        );


    if (!nextClass) {

        getElement("nextClassName").textContent =
            "No more classes!";

        getElement("nextClassDate").textContent =
            "You've completed your scheduled classes.";

        getElement("nextClassTime").textContent =
            "00:00:00";

        document.querySelector(
            ".next-class-countdown span"
        ).textContent = "COMPLETE";

        return;

    }


    const isActive = Boolean(activeClass);

    getElement("nextClassName").textContent =
        nextClass.className;


    if (isActive) {

        getElement("nextClassDate").textContent =
            `Currently in progress · Ends at ${formatTime(
                nextClass.end.toTimeString().slice(0, 5)
            )}`;

        document.querySelector(
            ".next-class-countdown span"
        ).textContent = "ENDS IN";

        getElement("nextClassTime").textContent =
            formatDuration(nextClass.end - now);

    } else {

        getElement("nextClassDate").textContent =
            `${formatDate(nextClass.start)} · ${formatTime(
                nextClass.start.toTimeString().slice(0, 5)
            )}`;

        document.querySelector(
            ".next-class-countdown span"
        ).textContent = "STARTS IN";

        getElement("nextClassTime").textContent =
            formatDuration(nextClass.start - now);

    }

}


// ============================================================
// COUNTDOWN MILESTONES
// ============================================================

function updateMilestones(now) {

    const milestones = [
        { days: 30, id: "milestone30" },
        { days: 14, id: "milestone14" },
        { days: 7, id: "milestone7" }
    ];


    milestones.forEach(milestone => {

        const date = new Date(
            targetDate.getTime() -
            milestone.days * 86400000
        );

        const difference = date - now;

        let message;

        if (difference <= 0) {

            message = `Passed · ${formatDate(date)}`;

        } else if (difference <= 86400000) {

            message = `Today · ${formatDate(date)}`;

        } else {

            message = formatDate(date);

        }

        getElement(milestone.id).textContent =
            message;

    });

}


// ============================================================
// REFRESH DASHBOARD
// ============================================================

// ============================================================
// MAIN UPDATE FUNCTION
// ============================================================

function updateCountdownDashboard() {

    const now = new Date();

    updateCountdown(now);

    updateCurrentDate(now);

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

    // Build the class cards once. The counters are updated in place.
    createClassCards();

    // Initial dashboard update.
    updateCountdownDashboard();

    // Refresh countdowns and counters every second without rebuilding cards.
    setInterval(
        updateCountdownDashboard,
        1000
    );

    console.log("Countdown Dashboard ready.");

}


// ============================================================
// START APPLICATION
// ============================================================

initialiseDashboard();
