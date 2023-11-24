function searchTable() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        // Change this index if you want to search in a specific column
        td = tr[i].getElementsByTagName("td")[0]; 
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

let debounceTimeout;

function debounceSearch() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(searchTable, 1); // 1000ms = 1 second
}

document.getElementById('searchInput').addEventListener('keyup', debounceSearch);