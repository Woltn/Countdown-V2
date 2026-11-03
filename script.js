
// ============================================================
// THE COUNTDOWN — VERSION 2.0
// ============================================================

console.log("The Countdown - Version 2.1");

// ============================================================
// CONFIGURATION
// ============================================================

const targetDate = new Date(2026, 11, 4, 17, 45, 0);

const firstPeriod = new Date(2026, 8, 8, 0, 0, 0);

const secondPeriod = new Date(2026, 9, 5, 0, 0, 0);

const termStart = new Date(2026, 9, 5, 0, 0, 0);

const termEnd = targetDate;

const STORAGE_KEY = "countdownDashboard_v2";

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

// All your original classes and schedules are preserved.
// You can now add and remove classes directly on the website.

const defaultClasses = [

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
// LOAD AND SAVE CLASSES
// ============================================================

function cloneClasses(classes) {
    return JSON.parse(JSON.stringify(classes));
}

function loadClasses() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            const parsed = JSON.parse(saved);

            if (
                Array.isArray(parsed) &&
                parsed.every(item =>
                    item &&
                    typeof item.id === "string" &&
                    typeof item.name === "string" &&
                    Array.isArray(item.weekly) &&
                    Array.isArray(item.extras)
                )
            ) {
                return parsed;
            }

        }

    } catch (error) {

        console.error("Could not load saved classes:", error);

    }

    return cloneClasses(defaultClasses);

}

let classes = loadClasses();


function saveClasses() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(classes)
        );

    } catch (error) {

        console.error("Could not save classes:", error);

        showMessage(
            "Unable to save changes. Check your browser storage.",
            "error"
        );

    }

}


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


function createID() {

    return "custom-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2, 8);

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


function updateClassCounters(now) {

    const grid = getElement("classGrid");

    if (!grid) return;

    classes.forEach((classInfo, index) => {

        const remaining = countClassesLeft(classInfo, now);

        // Find the existing card
        let card = grid.querySelector(
            `[data-class-id="${classInfo.id}"]`
        );

        // Only create the card if it doesn't already exist
        if (!card) {

            card = document.createElement("div");

            card.className = `class-card class-color-${index % 8}`;
            card.dataset.classId = classInfo.id;

            const top = document.createElement("div");
            top.className = "class-card-top";

            const icon = document.createElement("div");
            icon.className = "class-icon";

            const iconElement = document.createElement("i");
            iconElement.className = `fa-solid ${classInfo.icon || "fa-book"}`;
            icon.appendChild(iconElement);

            const category = document.createElement("span");
            category.className = "class-category";
            category.textContent = classInfo.category;

            top.append(icon, category);

            const number = document.createElement("div");
            number.className = "class-number";

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
        }

        // Update only the number
        card.querySelector(".class-number").textContent = remaining;

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
            "The countdown is complete. You made it!";

    } else if (days <= 7) {

        message.textContent =
            "The final week.";

    } else if (days <= 30) {

        message.textContent =
            "The final month.";

    } else {

        message.textContent =
            "The countdown is underway. Make every moment count.";

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
// MANAGEMENT FEEDBACK
// ============================================================

function showMessage(message, type = "success") {

    const element = getElement("managementMessage");

    if (!element) return;

    element.textContent = message;

    element.className =
        `management-message ${type}`;

}


// ============================================================
// MANAGEMENT TABS
// ============================================================

function initialiseTabs() {

    const tabs = document.querySelectorAll(
        ".management-tab"
    );

    const panels = document.querySelectorAll(
        ".management-content"
    );


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selected = tab.dataset.tab;

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            panels.forEach(panel => {
                panel.classList.remove("active");
            });

            tab.classList.add("active");

            getElement(
                `${selected}Panel`
            ).classList.add("active");

            if (selected === "manage") {
                renderManagedClasses();
            }

        });

    });

}


// ============================================================
// CLASS CATEGORY ICONS
// ============================================================

function getCategoryIcon(category, name) {

    const lowerName = name.toLowerCase();

    if (lowerName.includes("ballet")) {
        return "fa-shoe-prints";
    }

    if (lowerName.includes("gym")) {
        return "fa-heart-pulse";
    }

    if (lowerName.includes("condition")) {
        return "fa-dumbbell";
    }

    if (lowerName.includes("repertoire")) {
        return "fa-star";
    }

    if (lowerName.includes("contemporary")) {
        return "fa-music";
    }

    if (lowerName.includes("character")) {
        return "fa-person-walking";
    }

    if (lowerName.includes("school") || lowerName.includes("vcass")) {
        return "fa-school";
    }

    switch (category) {

        case "Dance":
            return "fa-shoe-prints";

        case "School":
            return "fa-school";

        case "Fitness":
            return "fa-dumbbell";

        case "Studies":
            return "fa-book-open";

        default:
            return "fa-book";

    }

}


// ============================================================
// ADD WEEKLY CLASS
// ============================================================

function initialiseWeeklyForm() {

    const form = getElement("weeklyClassForm");

    form.addEventListener("submit", event => {

        event.preventDefault();


        const name = getElement(
            "weeklyClassName"
        ).value.trim();

        const day = Number(
            getElement("weeklyClassDay").value
        );

        const category = getElement(
            "weeklyClassCategory"
        ).value;

        const start = getElement(
            "weeklyClassStart"
        ).value;

        const end = getElement(
            "weeklyClassEnd"
        ).value;

        const period = getElement(
            "weeklyClassPeriod"
        ).value;


        // ====================================
        // VALIDATION
        // ====================================

        if (!name || !start || !end) {

            showMessage(
                "Please complete all fields.",
                "error"
            );

            return;

        }


        if (start >= end) {

            showMessage(
                "The end time must be after the start time.",
                "error"
            );

            return;

        }


        const existing = classes.find(item =>
            item.name.toLowerCase() === name.toLowerCase()
        );


        // ====================================
        // CREATE SESSION
        // ====================================

        const newSession = {
            day,
            start,
            end,
            period
        };


        if (existing) {

            // Add another weekly session to an
            // existing class instead of duplicating it.

            const duplicate = existing.weekly.some(session =>

                session.day === day &&
                session.start === start &&
                session.end === end &&
                (session.period || "all") === period

            );


            if (duplicate) {

                showMessage(
                    "This weekly session already exists.",
                    "error"
                );

                return;

            }


            existing.weekly.push(newSession);

            showMessage(
                `Added another weekly session to ${existing.name}.`
            );

        } else {

            // Create a completely new class.

            const newClass = {

                id: createID(),

                name,

                category,

                icon: getCategoryIcon(category, name),

                weekly: [newSession],

                extras: []

            };


            classes.push(newClass);


            showMessage(
                `${name} has been added to your dashboard.`
            );

        }


        saveClasses();

        refreshDashboard();

        updateExtraClassDropdown();

        renderManagedClasses();

        form.reset();

    });

}


// ============================================================
// ADD ONE-TIME CLASS
// ============================================================

function initialiseExtraForm() {

    const form = getElement("extraClassForm");

    form.addEventListener("submit", event => {

        event.preventDefault();


        const classId = getElement(
            "extraClassName"
        ).value;

        const date = getElement(
            "extraClassDate"
        ).value;

        const start = getElement(
            "extraClassStart"
        ).value;

        const end = getElement(
            "extraClassEnd"
        ).value;


        const classInfo = classes.find(item =>
            item.id === classId
        );


        if (!classInfo || !date || !start || !end) {

            showMessage(
                "Please complete all fields.",
                "error"
            );

            return;

        }


        if (start >= end) {

            showMessage(
                "The end time must be after the start time.",
                "error"
            );

            return;

        }


        const selectedDate = new Date(
            `${date}T12:00:00`
        );


        if (
            selectedDate < firstPeriod ||
            selectedDate > targetDate
        ) {

            showMessage(
                "The class must be between September 8 and December 4, 2026.",
                "error"
            );

            return;

        }


        const duplicate = classInfo.extras.some(extra =>

            extra.date === date &&
            extra.start === start &&
            extra.end === end

        );


        if (duplicate) {

            showMessage(
                "This one-time class already exists.",
                "error"
            );

            return;

        }


        classInfo.extras.push({

            id: createID(),

            date,

            start,

            end

        });


        saveClasses();

        refreshDashboard();

        renderManagedClasses();

        showMessage(
            `One-time ${classInfo.name} class added successfully.`
        );

        form.reset();

    });

}


// ============================================================
// UPDATE ONE-TIME CLASS DROPDOWN
// ============================================================

function updateExtraClassDropdown() {

    const select = getElement("extraClassName");

    if (!select) return;

    const previousValue = select.value;

    select.innerHTML = "";


    const placeholder = document.createElement("option");

    placeholder.value = "";

    placeholder.textContent = "Select a class";

    select.appendChild(placeholder);


    classes.forEach(classInfo => {

        const option = document.createElement("option");

        option.value = classInfo.id;

        option.textContent = classInfo.name;

        select.appendChild(option);

    });


    if (classes.some(item => item.id === previousValue)) {

        select.value = previousValue;

    }

}


// ============================================================
// MANAGE EXISTING CLASSES
// ============================================================

function renderManagedClasses() {

    const container = getElement(
        "managedClassesList"
    );

    if (!container) return;

    container.innerHTML = "";


    if (classes.length === 0) {

        const empty = document.createElement("p");

        empty.textContent =
            "You haven't added any classes yet.";

        container.appendChild(empty);

        return;

    }


    classes.forEach(classInfo => {

        const wrapper = document.createElement("div");

        wrapper.className = "managed-class";


        // Class information

        const information = document.createElement("div");

        information.className = "managed-class-info";


        const name = document.createElement("h4");

        name.textContent = classInfo.name;


        const category = document.createElement("p");

        category.textContent =
            `${classInfo.category} · ${classInfo.weekly.length} weekly sessions · ${classInfo.extras.length} extra sessions`;


        information.append(
            name,
            category
        );


        // Remove class button

        const removeButton = document.createElement("button");

        removeButton.type = "button";

        removeButton.className = "remove-class-button";

        removeButton.innerHTML =
            '<i class="fa-solid fa-trash"></i> Remove';


        removeButton.addEventListener("click", () => {

            const confirmed = window.confirm(
                `Are you sure you want to remove "${classInfo.name}" and all its scheduled sessions?`
            );

            if (!confirmed) return;


            classes = classes.filter(item =>
                item.id !== classInfo.id
            );


            saveClasses();

            refreshDashboard();

            updateExtraClassDropdown();

            renderManagedClasses();

            showMessage(
                `${classInfo.name} has been removed.`
            );

        });


        wrapper.append(
            information,
            removeButton
        );


        // ====================================
        // INDIVIDUAL ONE-TIME SESSIONS
        // ====================================

        if (classInfo.extras.length > 0) {

            const extraContainer = document.createElement("div");

            extraContainer.className = "managed-extras";


            classInfo.extras.forEach(extra => {

                const extraRow = document.createElement("div");

                extraRow.className = "managed-extra-row";


                const extraText = document.createElement("span");

                const [year, month, day] =
                    extra.date.split("-").map(Number);

                const date = new Date(year, month - 1, day);

                extraText.textContent =
                    `${formatDate(date)} · ${formatTime(extra.start)} – ${formatTime(extra.end)}`;


                const removeExtra = document.createElement("button");

                removeExtra.type = "button";

                removeExtra.className = "remove-extra-button";

                removeExtra.title = "Remove this one-time class";

                removeExtra.setAttribute(
                    "aria-label",
                    `Remove one-time ${classInfo.name} session`
                );

                removeExtra.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';


                removeExtra.addEventListener("click", () => {

                    classInfo.extras =
                        classInfo.extras.filter(item =>
                            item.id !== extra.id
                        );


                    saveClasses();

                    refreshDashboard();

                    renderManagedClasses();

                    showMessage(
                        "One-time class removed."
                    );

                });


                extraRow.append(
                    extraText,
                    removeExtra
                );

                extraContainer.appendChild(extraRow);

            });


            wrapper.appendChild(extraContainer);

        }


        container.appendChild(wrapper);

    });

}


// ============================================================
// SET DATE INPUT LIMITS
// ============================================================

function initialiseDateLimits() {

    const dateInput = getElement("extraClassDate");

    dateInput.min = "2026-09-08";

    dateInput.max = "2026-12-04";

}


// ============================================================
// REFRESH DASHBOARD
// ============================================================

function refreshDashboard() {

    const now = new Date();

    updateClassCounters(now);

    updateNextClass(now);

}


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


    // Set up the management system.

    initialiseTabs();

    initialiseDateLimits();


    // Populate class management.

    updateExtraClassDropdown();

    renderManagedClasses();


    // Initial dashboard update.

    updateCountdownDashboard();


    // Refresh every second.

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
