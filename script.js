// ---------- Utilities ----------
function formatDateTime(dt) {
  // Format: DD-MM-YYYY, h:mmAM/PM
  const d = new Date(dt);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day}-${month}-${year}, ${hours}:${minutes}${ampm}`;
}

function humanDate(d) {
  const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  return new Date(d).toLocaleDateString(undefined, options);
}

function statusClass(status, overdue) {
  if (overdue) return "status-overdue";
  const s = (status || "").toLowerCase();
  switch (s) {
    case "new": return "status-new";
    case "in progress": return "status-inprogress";
    case "on hold": return "status-onhold";
    case "ready for delivery": return "status-ready";
    default: return "status-unknown";
  }
}

function isOverdue(item) {
  const now = new Date();
  const delivery = new Date(item.deliveryDate);
  const status = (item.status || "").toLowerCase();
  // Overdue if delivery date/time is in the past and not yet "Ready for Delivery"
  return delivery < now && status !== "ready for delivery";
}

// ---------- Mock data (16 job cards) ----------
const jobCards = [
  {
    plate: "KL-07-AB-1234",
    vin: "MA1TA2BC3D4E56789",
    owner: "Anil Kumar",
    contact: "+91 98765 43210",
    deliveryDate: offsetDays(0, 17, 30), // today 5:30PM
    status: "In Progress",
    workers: ["Ravi", "Meera"],
    jobs: ["Engine diagnostics", "Oil change", "Brake inspection"],
    parts: ["Oil filter", "Brake pads"]
  },
  {
    plate: "KL-08-CD-5678",
    vin: "MB2TB3CD4E5F67890",
    owner: "Lakshmi Nair",
    contact: "+91 91234 56789",
    deliveryDate: offsetDays(1, 11, 0),
    status: "New",
    workers: ["Akhil"],
    jobs: ["Initial assessment"],
    parts: []
  },
  {
    plate: "KL-39-EF-9012",
    vin: "MC3TC4DE5F6G78901",
    owner: "Joseph Thomas",
    contact: "+91 90000 11122",
    deliveryDate: offsetDays(-1, 16, 0), // overdue
    status: "On Hold",
    workers: ["Sarin", "Deepa"],
    jobs: ["Suspension check", "Wheel alignment"],
    parts: ["Tie rod end"]
  },
  {
    plate: "KL-11-GH-3456",
    vin: "MD4TD5EF6G7H89012",
    owner: "Neha Pillai",
    contact: "+91 94444 33322",
    deliveryDate: offsetDays(2, 10, 45),
    status: "In Progress",
    workers: ["Vivek"],
    jobs: ["AC service", "Cabin filter replacement"],
    parts: ["Cabin filter"]
  },
  {
    plate: "KL-32-IJ-7890",
    vin: "ME5TE6FG7H8I90123",
    owner: "Rahul Menon",
    contact: "+91 95555 22211",
    deliveryDate: offsetDays(0, 13, 15),
    status: "Ready for Delivery",
    workers: [],
    jobs: ["Final inspection"],
    parts: []
  },
  {
    plate: "KL-22-KL-2468",
    vin: "MF6TF7GH8I9J01234",
    owner: "Fathima",
    contact: "+91 98888 77766",
    deliveryDate: offsetDays(3, 9, 30),
    status: "New",
    workers: ["Nikhil", "Anju"],
    jobs: ["Electrical check"],
    parts: ["Fuse", "Relay"]
  },
  {
    plate: "KL-15-MN-1357",
    vin: "MG7TG8HI9J0K12345",
    owner: "Suresh",
    contact: "+91 99999 00011",
    deliveryDate: offsetDays(-2, 18, 0), // overdue
    status: "In Progress",
    workers: ["Arjun"],
    jobs: ["Transmission fluid replacement"],
    parts: ["ATF fluid"]
  },
  {
    plate: "KL-28-OP-9753",
    vin: "MH8TH9IJ0K1L23456",
    owner: "Divya",
    contact: "+91 93333 22233",
    deliveryDate: offsetDays(4, 14, 20),
    status: "On Hold",
    workers: [],
    jobs: ["Spare part confirmation"],
    parts: ["Alternator"]
  },
  {
    plate: "KL-10-QR-8642",
    vin: "MI9TI0JK1L2M34567",
    owner: "Anirudh",
    contact: "+91 96666 11223",
    deliveryDate: offsetDays(1, 16, 10),
    status: "New",
    workers: ["Hari"],
    jobs: ["Bodywork estimate"],
    parts: []
  },
  {
    plate: "KL-40-ST-7531",
    vin: "MJ0TJ1KL2M3N45678",
    owner: "Sneha",
    contact: "+91 95555 77889",
    deliveryDate: offsetDays(0, 12, 0),
    status: "In Progress",
    workers: ["Meera", "Vivek"],
    jobs: ["Tire rotation", "Wheel balancing"],
    parts: []
  },
  {
    plate: "KL-18-UV-6420",
    vin: "MK1TK2LM3N4O56789",
    owner: "Gopal",
    contact: "+91 90011 22334",
    deliveryDate: offsetDays(2, 18, 15),
    status: "On Hold",
    workers: [],
    jobs: ["Insurance approval"],
    parts: []
  },
  {
    plate: "KL-34-WX-5310",
    vin: "ML2TL3MN4O5P67890",
    owner: "Zoya",
    contact: "+91 94400 55667",
    deliveryDate: offsetDays(-3, 9, 50), // overdue
    status: "Unknown",
    workers: ["Sujith"],
    jobs: ["Diagnostics pending"],
    parts: []
  },
  {
    plate: "KL-27-YZ-4206",
    vin: "MM3TM4NO5P6Q78901",
    owner: "Manu",
    contact: "+91 97777 88899",
    deliveryDate: offsetDays(5, 15, 0),
    status: "New",
    workers: ["Deepa"],
    jobs: ["Paint touch-up"],
    parts: ["Paint kit"]
  },
  {
    plate: "KL-05-AA-3141",
    vin: "MN4TN5OP6Q7R89012",
    owner: "Kiran",
    contact: "+91 98870 12012",
    deliveryDate: offsetDays(0, 19, 45),
    status: "Ready for Delivery",
    workers: [],
    jobs: ["Delivery prep"],
    parts: []
  },
  {
    plate: "KL-23-BB-2718",
    vin: "MO5TO6PQ7R8S90123",
    owner: "Reshma",
    contact: "+91 90123 45678",
    deliveryDate: offsetDays(2, 11, 35),
    status: "In Progress",
    workers: ["Akhil", "Nikhil"],
    jobs: ["Cooling system flush"],
    parts: ["Coolant"]
  },
  {
    plate: "KL-31-CC-1618",
    vin: "MP6TP7QR8S9T01234",
    owner: "Vishnu",
    contact: "+91 94456 78901",
    deliveryDate: offsetDays(-1, 20, 10), // overdue
    status: "In Progress",
    workers: [],
    jobs: ["Headlight replacement"],
    parts: ["LED headlight unit"]
  }
];

// Helper to create future/past dates offset by days, hour, minute
function offsetDays(daysOffset, hour = 15, minute = 30) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// ---------- DOM elements ----------
const currentDateEl = document.getElementById("currentDate");
const cardsGridEl = document.getElementById("cardsGrid");
const layoutEl = document.querySelector(".layout");
const detailsPanelEl = document.getElementById("detailsPanel");
const closeDetailsEl = document.getElementById("closeDetails");

const detailsPlateEl = document.getElementById("detailsPlate");
const detailsVINEl = document.getElementById("detailsVIN");
const detailsOwnerEl = document.getElementById("detailsOwner");
const detailsContactEl = document.getElementById("detailsContact");
const detailsDeliveryEl = document.getElementById("detailsDelivery");
const detailsStatusEl = document.getElementById("detailsStatus");
const detailsWorkersEl = document.getElementById("detailsWorkers");
const detailsJobsEl = document.getElementById("detailsJobs");
const detailsPartsEl = document.getElementById("detailsParts");
const viewJobCardEl = document.getElementById("viewJobCard");

// ---------- Initialize ----------
initDate();
renderGrid(jobCards);
attachEvents();

// ---------- Functions ----------
function initDate() {
  const now = new Date();
  currentDateEl.textContent = humanDate(now);
}

function renderGrid(data) {
  cardsGridEl.innerHTML = "";
  data.forEach((item, idx) => {
    const overdue = isOverdue(item);
    const badgeClass = statusClass(item.status, overdue);

    const workersHtml =
      item.workers && item.workers.length
        ? `<div class="workers">${item.workers.map(w => `<span class="worker-chip">${escapeHTML(w)}</span>`).join("")}</div>`
        : "";

    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">
          <i class="fa-solid fa-car"></i>
          <span>${escapeHTML(item.plate)}</span>
        </div>
        <span class="status-badge ${badgeClass}">${escapeHTML(overdue ? "Overdue" : item.status || "Unknown")}</span>
      </div>
      <div class="card-body">
        <div class="card-line">
          <i class="fa-regular fa-clock"></i>
          <span>${formatDateTime(item.deliveryDate)}</span>
        </div>
        ${workersHtml ? `
          <div class="card-line">
            <i class="fa-solid fa-people-group"></i>
            ${workersHtml}
          </div>` : ""}
      </div>
    `;
    cardsGridEl.appendChild(card);
  });
}

function attachEvents() {
  // Open details on card click
  cardsGridEl.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const idx = Number(card.dataset.index);
    openDetails(jobCards[idx]);
  });

  // Keyboard accessibility: Enter to open
  cardsGridEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const card = e.target.closest(".card");
      if (!card) return;
      const idx = Number(card.dataset.index);
      openDetails(jobCards[idx]);
    }
  });

  // Close panel
  closeDetailsEl.addEventListener("click", closeDetails);

  // View Job Card action
  viewJobCardEl.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Job Card opened (demo). Hook this to your detailed page or modal.");
  });

  // Click outside to close (optional)
  document.addEventListener("click", (e) => {
    const withinPanel = e.target.closest("#detailsPanel");
    const withinCard = e.target.closest(".card");
    if (!withinPanel && !withinCard && layoutEl.classList.contains("details-open")) {
      closeDetails();
    }
  });
}

function openDetails(item) {
  detailsPanelEl.setAttribute("aria-hidden", "false");
  layoutEl.classList.add("details-open");

  detailsPlateEl.textContent = item.plate;
  detailsVINEl.textContent = item.vin;
  detailsOwnerEl.textContent = item.owner;
  detailsContactEl.textContent = item.contact;
  detailsDeliveryEl.textContent = formatDateTime(item.deliveryDate);
  detailsStatusEl.textContent = isOverdue(item) ? "Overdue" : (item.status || "Unknown");

  // Workers
  detailsWorkersEl.textContent = (item.workers && item.workers.length) ? item.workers.join(", ") : "—";

  // Jobs list
  detailsJobsEl.innerHTML = "";
  (item.jobs || []).forEach(j => {
    const li = document.createElement("li");
    li.textContent = j;
    detailsJobsEl.appendChild(li);
  });
  if (!item.jobs || !item.jobs.length) {
    detailsJobsEl.innerHTML = `<li>—</li>`;
  }

  // Parts list
  detailsPartsEl.innerHTML = "";
  (item.parts || []).forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    detailsPartsEl.appendChild(li);
  });
  if (!item.parts || !item.parts.length) {
    detailsPartsEl.innerHTML = `<li>—</li>`;
  }
}

function closeDetails() {
  layoutEl.classList.remove("details-open");
  detailsPanelEl.setAttribute("aria-hidden", "true");
}

// Minimal HTML escaping
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
