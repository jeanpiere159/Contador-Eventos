let events = [];

const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#eventsContainer');

const json = load();

let arr;
try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}
events = arr ? [...arr] : [];

renderEvents();

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
});

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();
    addEvent();
});

function addEvent() {
    if (eventName.value === "" || eventDate.value === "") {
        return;
    }
    if (dateDiff(eventDate.value) < 0) {
        return;
    }
    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);

    save(JSON.stringify(events));

    eventName.value = "";
    eventDate.value = "";

    renderEvents();
}

function dateDiff(d) {
    const targetDate = new Date(d);
    const now = new Date();
    const diferencia = targetDate.getTime() - now.getTime();
    const days = Math.ceil(diferencia / (1000 * 3600 * 24));
    return days;
}

function renderEvents() {
    const eventsHTML = events.map(event => {
        return `
        <div class="event">
            <div class="days">
                <span class="days-number">${dateDiff(event.date)}</span>
            </div>
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}">Eliminar</button>
            </div>
        </div>`;
    });

    eventsContainer.innerHTML = eventsHTML.join("");

    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id);

            save(JSON.stringify(events));
            renderEvents();
        });
    });
}

function save(data) {
    localStorage.setItem('items', data);
}

function load() {
    return localStorage.getItem('items');
}
