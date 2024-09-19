function searchTable() {
    let input, filter, table, tr, td1, td2, i, txtValue1, txtValue2;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        // Get the first and second columns
        td1 = tr[i].getElementsByTagName("td")[0];
        td2 = tr[i].getElementsByTagName("td")[2];
        if (td1 || td2) {
            txtValue1 = td1 ? (td1.textContent || td1.innerText) : "";
            txtValue2 = td2 ? (td2.textContent || td2.innerText) : "";
            if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
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
    debounceTimeout = setTimeout(searchTable, 300); // 300ms debounce time
    window.scrollTo(0, 0);
}

document.getElementById('searchInput').addEventListener('keyup', debounceSearch);