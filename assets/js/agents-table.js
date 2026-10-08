/* ================================================
 * AGENTS TABLE: FETCH, FILTER, SORT, DISPLAY
 * Residential page service agents directory
 * ================================================ */

const agentsContainer = document.getElementById("agents-section");
const filterRegionSelect = document.getElementById("filter-region");

let allAgents = [];
let filteredAgents = [];
let currentSort = { column: "first_name", direction: "asc" };
let currentRegionFilter = "all";

const API_URL = "http://137.184.147.137/api/agents";
const MIN_RATING = 85;

async function fetchAgents() {
  try {
    agentsContainer.innerHTML = '<div class="loading">Loading agents...</div>';
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    allAgents = Array.isArray(data) ? data : data.agents;
    filterAgents();
    populateRegionFilter();
  } catch (error) {
    console.error("Error:", error);
    agentsContainer.innerHTML = '<div class="error">Failed to load agents.</div>';
  }
}

function filterAgents() {
  filteredAgents = allAgents.filter(agent => {
    if (agent.rating < MIN_RATING) return false;
    if (currentRegionFilter !== "all" && agent.region !== currentRegionFilter) return false;
    return true;
  });
  sortAgents();
  displayTable();
}

function sortAgents() {
  filteredAgents.sort((a, b) => {
    let valueA = a[currentSort.column];
    let valueB = b[currentSort.column];

    // Numeric columns: fee, rating (sort as numbers, not strings)
    if (currentSort.column === "fee" || currentSort.column === "rating") {
      valueA = Number(valueA) || 0;
      valueB = Number(valueB) || 0;
      return currentSort.direction === "asc" ? valueA - valueB : valueB - valueA;
    }

    // String columns: first_name, last_name, region (alphabetical sort)
    valueA = String(valueA || "").toLowerCase();
    valueB = String(valueB || "").toLowerCase();
    let comparison = valueA.localeCompare(valueB);
    return currentSort.direction === "asc" ? comparison : comparison * -1;
  });
}

function displayTable() {
  if (filteredAgents.length === 0) {
    agentsContainer.innerHTML = '<div class="no-results">No agents found.</div>';
    return;
  }
  
  let html = '<table class="agents-table table table-striped"><thead><tr>';
  html += '<th onclick="handleSort(\'first_name\')">First Name</th>';
  html += '<th onclick="handleSort(\'last_name\')">Last Name</th>';
  html += '<th onclick="handleSort(\'fee\')">Fee</th>';
  html += '<th onclick="handleSort(\'rating\')">Rating</th>';
  html += '<th onclick="handleSort(\'region\')">Region</th>';
  html += '</tr></thead><tbody>';
  
  filteredAgents.forEach(agent => {
    html += `<tr><td>${agent.first_name}</td><td>${agent.last_name}</td><td>$${agent.fee}</td><td>${agent.rating}</td><td>${agent.region}</td></tr>`;
  });
  
  html += '</tbody></table>';
  agentsContainer.innerHTML = html;
}

function handleSort(column) {
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
  } else {
    currentSort.column = column;
    currentSort.direction = "asc";
  }
  filterAgents();
}

function populateRegionFilter() {
  const regions = [...new Set(allAgents.map(a => a.region))].sort();
  let html = '<option value="all">All Regions</option>';
  regions.forEach(region => html += `<option value="${region}">${region}</option>`);
  filterRegionSelect.innerHTML = html;
}

function handleRegionChange(event) {
  currentRegionFilter = event.target.value;
  filterAgents();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAgents();
  filterRegionSelect.addEventListener("change", handleRegionChange);
});
