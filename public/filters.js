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
        onlyShowFaculties: []
    }

    let debounceTimeout;

    input = document.getElementById("searchInput");
    input.addEventListener('keyup', (event) => {
        filterState.search = event.target.value.toUpperCase();
        console.log("Search input changed:", filterState.search);
        
        // Clear existing timeout
        clearTimeout(debounceTimeout);
        
        // Set new timeout to apply filters after 300ms delay
        debounceTimeout = setTimeout(() => {
            applyFilters(filterState);
        }, 300);
    });

    // Toggle the hide filled sections functionality
    availableSeatToggle.addEventListener('change', (event) => {
        filterState.hideFilled = event.target.checked;
        console.log("Hide filled sections:", filterState.hideFilled);
    });

    // Choicesjs for faculty selection
    const element = document.querySelector('#selectFaculties');
    let choices;

    function initializeChoices() {
        // Check if options are populated
        const optionCount = element.querySelectorAll('option').length;
        console.log("Options found:", optionCount);
        
        if (optionCount > 0) {
            // Options are populated, initialize Choices.js
            choices = new Choices(element, {
                renderChoiceLimit: 15,
                addItems: true,
                addItemFilter: (value) => !!value && value !== '',
                removeItems: true,
                removeItemButton: true,
                duplicateItemsAllowed: false,
                searchFloor: 1,
                searchResultLimit: -1,
                renderSelectedChoices: 'always',
                position: 'bottom',
                shouldSort: false,
                closeDropdownOnSelect: true,
                shouldSortItems: false,
                shadowRoot: null,
                placeholder: true,
                placeholderValue: "Type Faculty Initials",
                loadingText: 'Loading...',
                noResultsText: 'No faculties found',
                noChoicesText: 'No choices to choose from',
                itemSelectText: 'Press to select',
                uniqueItemText: 'Only unique values can be added',
                customAddItemText: 'Only values matching specific conditions can be added',
                addItemText: (value, rawValue) => {
                  return `Press Enter to add <b>"${value}"</b>`;
                },
                removeItemIconText: () => `Remove item`,
                removeItemLabelText: (value, rawValue) => `Remove item: ${value}`,
                maxItemText: (maxItemCount) => {
                  return `Only ${maxItemCount} values can be added`;
                },
                valueComparer: (value1, value2) => {
                  return value1 === value2;
                },
                // Choices uses the great Fuse library for searching. You
                // can find more options here: https://fusejs.io/api/options.html
                fuseOptions: {
                  includeScore: false
                },
                labelId: '',
                callbackOnInit: null,
                callbackOnCreateTemplates: null,
                appendGroupInSearch: false,
            });

            // Listen for changes in the faculty selection
            element.addEventListener('change', (event) => {
                filterState.onlyShowFaculties = choices.getValue(true); // Get array of selected values
                console.log("Selected faculties to avoid:", filterState.onlyShowFaculties);
            });

            console.log("Choices.js initialized successfully");
        } else {
            // Options not yet populated, retry after a short delay
            console.log("Options not yet populated, retrying in 500ms");
            setTimeout(initializeChoices, 500);
        }
    }

    // Start trying to initialize Choices.js
    initializeChoices();


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

            // Search filter
            if (filters.search) {
                const courseCodeText = courseCodeCell ? (courseCodeCell.textContent || courseCodeCell.innerText) : "";
                const facultyText = facultyCell ? (facultyCell.textContent || facultyCell.innerText) : "";
                showRow = courseCodeText.toUpperCase().includes(filters.search) || facultyText.toUpperCase().includes(filters.search);
            }

            // Hide filled sections filter
            if (filters.hideFilled && availableSeatCell) {
                const availableSeats = parseInt(availableSeatCell.textContent || availableSeatCell.innerText, 10);
                showRow = showRow && availableSeats > 0;
            }

            // Faculty filter (avoid selected faculties)
            if (filters.onlyShowFaculties && filters.onlyShowFaculties.length > 0 && facultyCell) {
                const facultyText = (facultyCell.textContent || facultyCell.innerText).trim();
                // Hide row if faculty is in the "avoid" list
                showRow = showRow && !filters.onlyShowFaculties.includes(facultyText);
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
        filterState.onlyShowFaculties = [];
        
        // Reset UI elements
        document.getElementById("searchInput").value = "";
        
        // Reset toggle button - ensure both the checked property and visual state are updated
        const toggleInput = availableSeatToggle.querySelector('input[type="checkbox"]');
        toggleInput.checked = false;
        
        // For Tailwind toggle components, we need to manually trigger the peer class effect
        // by dispatching a change event
        toggleInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Reset Choices.js selection
        if (choices) {
            choices.removeActiveItems();
        }
        
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