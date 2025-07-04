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

}

// Initialize the filter functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing filter functionality");
    filter();
});