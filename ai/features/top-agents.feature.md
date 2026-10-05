# Feature Specification — Top Agents

**This document specifies one single feature. Read `ai/ai-spec.md` first.**

- All global rules defined in `ai/ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai/ai-spec.md` and this document.

- **Feature Name:** Top Agents / Service Agents Directory
- **Related Area:** front-end

---

## 1. Feature Goal

Visitors to the Residential Services page can browse, sort, and filter the company's service agents in a table. They see agent details (name, fee, rating, region), can sort by name, and filter by region. The table displays only high-quality agents (rating 85+) and shows a loading indicator while data is fetched from the API.

---

## 2. Feature Scope

### In Scope

- Fetch agent data from the API endpoint (`GET http://137.184.147.137/api/agents`)
- Filter agents to show only those with rating 85 or above
- Display agent table with columns: first name, last name, fee, rating, region
- Sort table by agent name (toggle ascending/descending on repeated clicks)
- Filter table by region (multi-select or dropdown; both work and must work together)
- Show a loading indicator while API data is being fetched
- Show a meaningful "no results" message when the combined sort/filter returns no agents
- All logic in a dedicated JavaScript module (`assets/js/agents-table.js`)

### Out of Scope

- Editing or deleting agents
- Saving user's sort/filter preferences
- Real-time agent updates or WebSocket data
- The backend API itself (consume as-is)

### Feature-Specific Constraints

- The minimum quality threshold is a rating of 85 or above (not 95). Agents with rating < 85 are filtered out in JavaScript after the API call, not requested from the API.
- Sort and filter must work together without cancelling each other out (e.g., filter by "North", then sort by name; both apply).
- The feature only appears on `residential.html` and has no impact on other pages.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Fetch Agent Data

**Requirement:**
Make a GET request to `http://137.184.147.137/api/agents` when the page loads (or when the Agents section becomes visible). Handle network errors gracefully.

**Expected Result:**
Agent data is retrieved from the API without errors. If the network fails, an error message is shown instead of an empty table.

### FR-02 — Filter by Quality Threshold

**Requirement:**
Only display agents with a rating of 85 or above. Filter happens in JavaScript after the API response, not on the server.

**Expected Result:**
Agents with rating < 85 do not appear in the table, even if the API returned them.

### FR-03 — Display Agent Table

**Requirement:**
Show all qualifying agents in a table with columns: First Name, Last Name, Fee, Rating, Region. Each row represents one agent.

**Expected Result:**
A readable table with agent data correctly mapped from the API response.

### FR-04 — Sort by Agent Name

**Requirement:**
Clicking the "First Name" or "Last Name" column header sorts the visible table by agent name. Clicking again toggles between ascending and descending order. The sort applies to all currently visible rows after filtering.

**Expected Result:**
Table rows reorder immediately when a sort header is clicked. The sort direction is clear (visual indicator like ▲/▼ or text showing "ascending/descending").

### FR-05 — Filter by Region

**Requirement:**
Provide a way to filter agents by region (e.g., dropdown, checkboxes, or multi-select). Users can choose one or more regions, or "All Regions" to see everyone. The filter applies to the currently sorted table.

**Expected Result:**
Only agents matching the selected region(s) appear in the table. Changing the filter updates the table without losing the current sort.

### FR-06 — Handle Empty Results

**Requirement:**
When a combination of sort and filter leaves no agents to display, show a meaningful message (e.g., "No agents found in this region" or "No results match your selection") instead of an empty table.

**Expected Result:**
The user understands why the table is empty and what to do next (e.g., change the filter).

### FR-07 — Loading Indicator

**Requirement:**
While the API data is being fetched, display a loading indicator (spinner, "Loading...", or similar) in the agents section. The indicator disappears and the table appears when data arrives.

**Expected Result:**
Users know the page is working and waiting for data, not broken or empty.

---

## 4. User Flow

**Main flow**

1. The user opens the Residential Services page (`residential.html`).
2. The Agents section loads and displays a loading indicator.
3. The JavaScript makes a GET request to the API.
4. The API returns agent data; agents with rating < 85 are filtered out.
5. A table appears showing all qualifying agents, sorted by first name (default).
6. A region filter dropdown or checkbox list is visible above or beside the table.
7. The user clicks a sort header (e.g., "Last Name") to sort by that column.
8. The user selects a region from the filter; the table updates to show only agents in that region, preserving the current sort.
9. The user changes the filter again; the table updates accordingly.

**Alternate / failure flow**

1. The user opens the Residential Services page.
2. The loading indicator appears.
3. The API request fails (network error, 500, timeout).
4. An error message is shown: "Failed to load agents. Please try again later."
5. An optional retry button allows the user to fetch again.

---

## 5. Interfaces Involved

### Pages

- `residential.html` (existing) - adds a new "Agents" or "Service Agents" section with a table and filter controls

### Components

- `assets/js/agents-table.js` (new) - fetches data from the API, filters by rating, renders the table, handles sort and filter interactions. Loaded only by `residential.html`.
- `assets/css/custom.css` (existing, created by brand-theme or here) - styles for the table, loading indicator, filter controls, and empty-state message
- `#agents-section` or similar (new in residential.html) - container for the agents feature
- Filter control (new in residential.html) - dropdown, checkboxes, or multi-select for region filtering
- Table element (new in residential.html) - `<table>` with `<thead>` (sortable headers) and `<tbody>` (agent rows, generated by JavaScript)

### Endpoints

- `GET http://137.184.147.137/api/agents` - fetches all agents as a JSON array of agent objects

---

## 6. Data

### Inputs

- API response from `GET /api/agents` (JSON array of agent objects with fields: `first_name`, `last_name`, `fee`, `rating`, `region`, `email`)
- User selection: region filter (string or array of strings)
- User click: sort column header (column name and direction toggle)

### Outputs / Returned Data

- Rendered table rows (HTML `<tr>` elements with agent data)
- Loading indicator (text or spinner HTML)
- Error message (text on page)
- Empty-state message (text on page, e.g., "No agents found")

### Stored / Modified Data

N/A (no persistent storage; filter/sort state is kept in memory during the session only)

---

## 7. Validation

- **API response:** must be a valid JSON array; if invalid, show error message (checked on client)
- **Agent object fields:** must have at least `first_name`, `last_name`, `fee`, `rating`, `region`. If missing, skip that agent or show a warning (checked on client)
- **Rating filter:** only include agents where `rating >= 85` (checked in JavaScript after API response)
- **Region filter:** user selection must match the region values returned by the API (checked on client when rendering filter options)

---

## 8. Expected Behavior

### Success Behavior

- Loading indicator displays briefly.
- Table appears with all agents rated 85+, sorted by first name by default.
- Region filter shows all unique regions from the data.
- User can sort by clicking headers and filter by selecting regions; both work together.
- Table updates instantly when sort or filter changes.

### Error / Invalid Behavior

- Network error during API call: error message appears, table does not load, user can see a retry option (if implemented).
- API returns invalid JSON: error message appears.
- API returns empty array: "No agents found" message appears.

### Empty / Edge Cases

- No agents have a rating >= 85: "No agents available" message appears.
- User filters by a region with no qualifying agents: "No agents in [Region]" message appears.
- User clicks sort header while a filter is active: table re-sorts among the filtered results only.
- User changes filter while a custom sort is applied: the sort is preserved (e.g., sort by "Last Name" descending, then filter by "South"; the South agents appear sorted by last name descending).

---

## 9. Acceptance Criteria

- [ ] API GET request is made to `http://137.184.147.137/api/agents` when the page loads; response is received and parsed without errors. (FR-01)
- [ ] Only agents with rating >= 85 appear in the table. (FR-02)
- [ ] Table displays all qualifying agents with columns: First Name, Last Name, Fee, Rating, Region. (FR-03)
- [ ] Clicking a sort column header sorts the table by that column; clicking again toggles ascending/descending. (FR-04)
- [ ] Clicking a sort header while a filter is active re-sorts the filtered results. (FR-04)
- [ ] Region filter dropdown or checkboxes populate with unique regions from the data. (FR-05)
- [ ] Selecting a region filters the table to show only agents in that region. (FR-05)
- [ ] Changing the region filter preserves the current sort order. (FR-05)
- [ ] Filtering by a region with no qualifying agents shows a meaningful message (e.g., "No agents found in this region"). (FR-06)
- [ ] While API data is loading, a loading indicator (text or spinner) is visible. (FR-07)
- [ ] When data is loaded, the loading indicator is hidden and the table is visible. (FR-07)
- [ ] If the API request fails, an error message is displayed instead of a table. (FR-01)
- [ ] All agent table logic is in `assets/js/agents-table.js`; no agent-related code is inline in HTML or in other files. (Compliance with ai-spec.md)
- [ ] The table is responsive and readable on mobile and desktop widths. (Compliance with ai-spec.md)
