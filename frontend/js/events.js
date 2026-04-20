// Events component
const events = [
    { 
      name: "Event Name", 
      description: "The Voyager 1 probe is currently the most distant human-made object from Earth.",
      date: "Date",
      time: "Time",
      location: "Location"
    },

    { 
      name: "Event Name", 
      description: "The Voyager 1 probe is currently the most distant human-made object from Earth.",
      date: "Date",
      time: "Time",
      location: "Location"
    },

    { 
      name: "Event Name", 
      description: "The Voyager 1 probe is currently the most distant human-made object from Earth.",
      date: "Date",
      time: "Time",
      location: "Location"
    },
];

const container = document.getElementById('events-container');

events.forEach(event => {
    container.innerHTML += `
        <div class="events-card-wrapper">
    <div class="events-card-holder">
        <h2 class="events-name">${event.name}</h2>
        <p class="events-card-description">${event.description}</p>
        <div class="events-meta">
            <p class="events-date">${event.date}</p>
            <p class="events-time">${event.time}</p>
            <p class="events-location">${event.location}</p>
        </div>
    </div>
    <button class="view-event-btn">View Event Details</button>
</div>
    `;
});