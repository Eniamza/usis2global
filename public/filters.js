function filter() {
    const filterButton = document.getElementById('filterButton');
    const filteringSection = document.getElementById('filteringSection');
    const availableSeatToggle = document.getElementById('availableSeatToggle');

    // Toggle the visibility of the filtering section
    filterButton.addEventListener('click', () => {
        console.log("Filter button clicked");
        filteringSection.classList.toggle('hidden');
    });

    let filterState = {
        search: "",
        hideFilled: false
    }

    input = document.getElementById("searchInput");
    input.addEventListener('keyup', (event) => {
        filterState.search = event.target.value.toUpperCase();
        console.log("Search input changed:", filterState.search);
        debounceSearch();

    });

    // Toggle the hide filled sections functionality
    availableSeatToggle.addEventListener('change', (event) => {
        filterState.hideFilled = event.target.checked;
        console.log("Hide filled sections:", filterState.hideFilled);
    
    });

    // Apply the filters to the table
    document.getElementById('applyFiltersButton').addEventListener('click', () => {
        console.log("Applying filters:", filterState);
        const table = document.getElementById("table");
        const rows = table.getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
            const row = rows[i];
            const courseCodeCell = row.getElementsByTagName("td")[0]; // Course Code
            const facultyCell = row.getElementsByTagName("td")[1]; // Faculty Init.
            const availableSeatCell = row.getElementsByTagName("td")[5]; // Available Seat

            let showRow = true;

            if (filterState.search) {
                const courseCodeText = courseCodeCell ? (courseCodeCell.textContent || courseCodeCell.innerText) : "";
                const facultyText = facultyCell ? (facultyCell.textContent || facultyCell.innerText) : "";
                showRow = courseCodeText.toUpperCase().includes(filterState.search) || facultyText.toUpperCase().includes(filterState.search);
            }

            if (filterState.hideFilled && availableSeatCell) {
                const availableSeats = parseInt(availableSeatCell.textContent || availableSeatCell.innerText, 10);
                showRow = showRow && availableSeats > 0;
            }

            row.classList.toggle('hidden', !showRow);
        }
    });

}

// Initialize the filter functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing filter functionality");
    filter();
});