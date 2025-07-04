function filter() {
    const filterButton = document.getElementById('filterButton');
    const filteringSection = document.getElementById('filteringSection');
    const availableSeatToggle = document.getElementById('availableSeatToggle');

    // Toggle the visibility of the filtering section
    filterButton.addEventListener('click', () => {
        console.log("Filter button clicked");
        filteringSection.classList.toggle('hidden');
    });

    // Add event listener for the available seat toggle
    availableSeatToggle.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log("Hide filled sections");
            // Logic to hide filled sections

            const rows = document.querySelectorAll('#table tr');
            rows.forEach(row => {
                const availableSeatCell = row.querySelector('td:nth-child(6)'); // Assuming the 6th column is "Available Seat"
                if (availableSeatCell) {
                    const availableSeats = parseInt(availableSeatCell.textContent, 10);
                    if (availableSeats <= 0) {
                        row.classList.add('hidden'); // Hide rows with no available seats
                    } else {
                        row.classList.remove('hidden'); // Show rows with available seats
                    }
                }

            }
            );
        } else {
            console.log("Show all sections");
            // Logic to show all sections

            const rows = document.querySelectorAll('#table tr');
            rows.forEach(row => {
                row.classList.remove('hidden'); // Show all rows
            }   
            );
        }
    });
}

// Initialize the filter functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing filter functionality");
    filter();
});