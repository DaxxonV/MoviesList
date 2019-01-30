// A js program to add movie and rating to a movies table

let table = document.getElementById("MTable");
let submitBtn = document.getElementById("submitBtn");

let titleHead = document.getElementsByTagName("th")[0];
let ratingHead = document.getElementsByTagName("th")[1];
let deleteHead = document.getElementsByTagName("th")[2];


function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.getElementById("MTable");
    switching = true;
    // Set the default direction to ascending
    dir = "asc";
    while(switching) {
        switching = false;
        rows = table.rows;
        // Loop through all rows except for first header
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i+1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
            }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            let parent = rows[i].parentNode;
            let currentRow = parent.getElementsByTagName("TR")[i];
            let nextRow = parent.getElementsByTagName("TR")[i+1];
            parent.insertBefore(nextRow, currentRow);
            switching = true;
            switchCount++;
        } else {
            if (switchCount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function hoverTextColor(x) {
    x.style.cursor = "pointer";
    x.style.color = "lightGreen";
}

function leaveTextColor(x) {
    x.style.color = "black";
}

submitBtn.addEventListener("click", function() {
    let name = document.getElementsByName("movieName")[0].value;
    let rank = document.getElementsByName("movieRank")[0].value;

    if (name === "") alert("Please enter name!");
    else if (name.length > 50) {
        alert("The movie name is too long!");
        document.getElementsByName("movieName")[0].focus();
    }
    else if (rank === "") alert("Please enter rank!");
    else if (rank > 10 || rank < 0) {
        alert("Rating must be from 0-10");
        document.getElementsByName("movieRank")[0].focus();
    }
    else {
        // Create an empty <tr> element and add it to the last position of the table:
        let row = table.insertRow(-1);


        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let nameCell = row.insertCell(0);
        let rankCell = row.insertCell(1);
        let deleteCell = row.insertCell(2);

        nameCell.setAttribute("class", "centerText tableRow");
        rankCell.setAttribute("class", "centerText tableRow");
        deleteCell.setAttribute("class", "centerText tableRow");


        // Add some text to the new cells:
        nameCell.innerHTML = name;
        rankCell.innerHTML = rank;


        let dBtn = document.createElement("input");
        dBtn.setAttribute("class", "btn btn-danger");
        dBtn.type = "button";
        dBtn.value = "Delete";
        deleteCell.appendChild(dBtn);
        dBtn.onclick = (function(x) {
             table.deleteRow(this.parentNode.parentNode.rowIndex);
        })

        // Resets the input values
        document.getElementsByName("movieName")[0].value = "";
        document.getElementsByName("movieRank")[0].value = "";


    }
});
