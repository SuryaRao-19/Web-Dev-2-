function getEvents() {
    return JSON.parse(localStorage.getItem("events")) || [];
}

function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}

function displayEvents() {
    let events = getEvents();
    let list = document.getElementById("eventList");

    list.innerHTML = "";

    if (events.length === 0) {
        list.innerHTML = "<p>No events yet. Add your first event!</p>";
        return;
    }

    events.forEach((event) => {
        list.innerHTML += `
        <div class="event-item">
            <b>${event.title}</b><br>
            Date: ${event.date}<br>
            Category: ${event.category}<br>
            ${event.description}
        </div>
        `;
    });
}

function addEvent() {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    if (!title || !date) {
        alert("Please fill Title and Date");
        return;
    }

    let events = getEvents();

    events.push({
        title,
        date,
        category,
        description
    });

    saveEvents(events);
    displayEvents();

    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}

function clearEvents() {
    localStorage.removeItem("events");
    displayEvents();
}

function addSample() {
    let sampleEvents = [
        {
            title: "Tech Conference",
            date: "2025-03-15",
            category: "Conference",
            description: "Annual technology conference"
        },
        {
            title: "Team Meeting",
            date: "2025-04-01",
            category: "Meeting",
            description: "Monthly team sync-up"
        }
    ];

    saveEvents(sampleEvents);
    displayEvents();
}

// Load events when page opens
displayEvents();
