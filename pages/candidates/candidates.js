const backendURL = "http://localhost:8080"
const tHeader = ["ID", "Name", "Party_ID", "EDIT", "DELETE", "ADD"];

getCandidates(backendURL + "/api/candidate");
function getCandidates(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            createTable(data);
            console.log(data);

        })
        .catch((error) => {
            console.log(error);
        })
};

function createTable(array) {
    var mainContainer = document.getElementById("candidatesList")
    //const tHeader = ["ID", "Name", "Party_ID", "EDIT", "DELETE", "ADD"];
    var table = document.createElement("table");


    const candidateDescriptionRow = table.insertRow();
    tHeader.forEach((text) => createCell(candidateDescriptionRow, text));
    for (let j = 0; j < array.length; j++) {
        let candidateRow = table.insertRow();
        let test = array[0];
        createCell(candidateRow, array[j].id);
        createCell(candidateRow, array[j].name);
        createCell(candidateRow, array[j].partyId);

        editButton(candidateRow, array[j].id);
        deteleButton(candidateRow, array[j].id);
        addButton(candidateRow, array[j].id);
    }


    mainContainer.appendChild(table)

    function deteleButton(row, candidateId) {
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement("a");
        deleteBtn.classList.add('btn', 'btn-primary');
        deleteBtn.innerText = "Delete"
        deleteCell.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            fetch(backendURL + "/api/candidate/" + candidateId, {
                method: "DELETE",
            })
                .then((response) => response.text())
                .then(() => {
                    table.querySelector("tbody").removeChild(row);
                });
        });
    }


    function editButton(row, candidateId) {
        const editCell = row.insertCell();
        const editBtn = document.createElement("a");
        editBtn.classList.add('btn', 'btn-primary');
        editBtn.innerText = "EDIT"
        editCell.appendChild(editBtn);

    }

    function addButton(row) {
        const addCell = row.insertCell();
        const addBtn = document.createElement("a");
        addBtn.classList.add('btn', 'btn-primary');
        addBtn.innerText = "Add Candidate"
        addCell.appendChild(addBtn);
        addBtn.addEventListener("click", createCandidateRow);


    }

    function createCandidateRow() {
        let table = document.querySelector("table");
        const submitBtn = document.createElement("button");
        submitBtn.setAttribute("class", "submitBtn");
        submitBtn.innerHTML = "Submit";
        //new row for the new entry
        let newCand = table.insertRow(-1);


        //submit btn
        let cell1 = newCand.insertCell();
        cell1.appendChild(submitBtn);

        //name input
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("value", "");
        nameInput.setAttribute("class", "last-name-input");
        let cell2 = newCand.insertCell();
        console.log(nameInput.value);
        cell2.appendChild(nameInput);

        //party input (not working)
        const partyInput = document.createElement("input");
        partyInput.setAttribute("type", "text");
        partyInput.setAttribute("value", "");
        partyInput.setAttribute("class", "last-name-input");
        let cell3 = newCand.insertCell();
        console.log(partyInput.value);
        cell3.appendChild(partyInput);

        editButton(newCand);
        deteleButton(newCand);
        addButton(newCand);

        submitBtn.addEventListener("click", submit);




        function submit() {
            const body = {
                name: nameInput.value,
                party: partyInput.value
            }
            fetch(backendURL + "/api/candidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((candidateData) => {
                    console.log(candidateData);
                });
            location.reload();
        }

    }
    function createCell(row, info) {
        let cell = row.insertCell();
        let text = document.createTextNode(info);
        cell.appendChild(text);
    }
}
