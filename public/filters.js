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
        hideFilled: false,
        onlyShowCourses: []
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

    // Separated filter applying function
    function applyFilters(filters) {
        console.log("Applying filters:", filters);
        const table = document.getElementById("table");
        const rows = table.getElementsByTagName("tr");

        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
            const row = rows[i];
            const courseCodeCell = row.getElementsByTagName("td")[0]; // Course Code
            const facultyCell = row.getElementsByTagName("td")[1]; // Faculty Init.
            const availableSeatCell = row.getElementsByTagName("td")[5]; // Available Seat

            let showRow = true;

            if (filters.search) {
                const courseCodeText = courseCodeCell ? (courseCodeCell.textContent || courseCodeCell.innerText) : "";
                const facultyText = facultyCell ? (facultyCell.textContent || facultyCell.innerText) : "";
                showRow = courseCodeText.toUpperCase().includes(filters.search) || facultyText.toUpperCase().includes(filters.search);
            }

            if (filters.hideFilled && availableSeatCell) {
                const availableSeats = parseInt(availableSeatCell.textContent || availableSeatCell.innerText, 10);
                showRow = showRow && availableSeats > 0;
            }

            row.classList.toggle('hidden', !showRow);
        }
    }

    // Apply filters button event handler
    document.getElementById('applyFiltersButton').addEventListener('click', () => {
        applyFilters(filterState);
    });

    document.getElementById('resetFiltersButton').addEventListener('click', () => {
        // Reset filter state
        filterState.search = "";
        filterState.hideFilled = false;
        filterState.onlyShowCourses = [];
        
        // Reset UI elements
        document.getElementById("searchInput").value = "";
        
        // Reset toggle button - ensure both the checked property and visual state are updated
        const toggleInput = availableSeatToggle.querySelector('input[type="checkbox"]');
        toggleInput.checked = false;
        
        // For Tailwind toggle components, we need to manually trigger the peer class effect
        // by dispatching a change event
        toggleInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Apply reset filters
        applyFilters(filterState);
        console.log("Filters reset");
    });
    
}

// Initialize the filter functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing filter functionality");
    filter();
});