let addBtn = document.getElementById("add");
let resetBtn = document.getElementById("reset");
let cardContainer = document.getElementById("cardContainer");
let form = document.querySelector("form");
let showForm = document.getElementById("showForm");
let greeting = document.getElementById("greeting");
let close = document.getElementById("close");
let note = document.getElementById("note");

showForm.addEventListener("click", function() {
    form.classList.remove("form-hidden");
    form.classList.add("form-visible");
})

close.addEventListener("click", function() {
    form.classList.remove("form-visible");
    form.classList.add("form-hidden");
})

addBtn.addEventListener("click", main);


window.onload = function() {
    if (localStorage.getItem('entries')) {
        if ((JSON.parse(localStorage.getItem('entries'))).length < 1) {
            createGreeting();
        } else {
            let addresses = JSON.parse(localStorage.getItem('entries'));
            addresses.forEach(address => {
                displayElements(address);
            })
        }
    } else {
        createGreeting();
    }

}

function main() {
    let lname = document.getElementById("lName").value;
    let fname = document.getElementById("fName").value;
    let mname = document.getElementById("mName").value;
    let ptel = document.getElementById("personalTel").value;
    let htel = document.getElementById("homeTel").value;
    let wtel = document.getElementById("workTel").value;
    let email = document.getElementById("email").value;
    let comment = document.getElementById("comment").value;
    form.classList.add("form-hidden");

    addEntry(lname, fname, mname, ptel, htel, wtel, email, comment);
}

function createObject(id, lname, fname, mname, ptel, htel, wtel, email, comment) {
    const obj = { id, lname, fname, mname, ptel, htel, wtel, email, comment }
    return obj;
}

function addEntry(lname, fname, mname, ptel, htel, wtel, email, comment) {
    let filledObject;
    if (localStorage.getItem('entries')) {
        let entries = JSON.parse(localStorage.getItem('entries'));
        let id = entries.length + 1;
        filledObject = createObject(id, lname, fname, mname, ptel, htel, wtel, email, comment);
        entries.push(filledObject);
        localStorage.setItem('entries', JSON.stringify(entries));
    } else {
        let entries = [];
        let id = entries.length + 1;
        filledObject = createObject(id, lname, fname, mname, ptel, htel, wtel, email, comment);
        entries.push(filledObject);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    displayElements(filledObject);
    greeting.style.display = "none";
}

function displayElements(object) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let labels = ["ID", "Last Name", "First Name", "Middle Name", "Personal Phone", "Home Phone", "Work Phone", "E-mail", "Comments"];
    let i = 0;
    let fieldWrap = document.createElement("div");
    for (item in object) {
        let field = document.createElement("div");
        field.classList.add("field");
        let label = document.createElement("p");
        labelText = document.createTextNode(labels[i]);
        label.appendChild(labelText);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.value = object[item];
        field.appendChild(label);
        field.appendChild(input);
        fieldWrap.appendChild(field);
        i++;
    }
    divCard.appendChild(fieldWrap);

    let cardBtns = document.createElement("div");
    cardBtns.classList.add("cardBtns");

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", object.id);

    let deleteText = document.createTextNode("Delete");
    deleteBtn.appendChild(deleteText);

    let updateBtn = document.createElement("button");
    updateBtn.setAttribute("id", object.id);

    let updateText = document.createTextNode("Update");
    updateBtn.appendChild(updateText);
    updateBtn.classList.add("updateBtn");

    cardBtns.appendChild(updateBtn);
    cardBtns.appendChild(deleteBtn);
    divCard.appendChild(cardBtns);
    updateBtn.addEventListener("click", update);
    deleteBtn.addEventListener("click", deleteEntry);
    cardContainer.appendChild(divCard);
}

function update(e) {
    let values = e.target.parentNode.parentNode.childNodes[0].childNodes;
    values = [...values].map(value => value.childNodes[1]);
    let updatedObject = createObject(values[0].value, values[1].value, values[2].value, values[3].value,
        values[4].value, values[5].value, values[6].value, values[7].value, values[8].value);
    let entries = JSON.parse(localStorage.getItem('entries'));
    let index = parseInt(values[0].value) - 1;
    entries[index] = updatedObject;
    entries = JSON.stringify(entries);
    localStorage.setItem('entries', entries);

    let noteContainer = document.createElement("p");
    let noteText = document.createTextNode("Successfully Updated!");
    noteContainer.appendChild(noteText);
    note.appendChild(noteContainer);
    window.setTimeout(function() {
        note.innerHTML = "";
    }, 2000);
}

function deleteEntry(e) {
    let values = e.target.parentNode.parentNode.childNodes[0].childNodes;
    values = [...values].map(value => value.childNodes[1]);
    let entries = JSON.parse(localStorage.getItem('entries'));
    let index = parseInt(values[0].value) - 1;
    entries.splice(index, 1);
    entries.forEach(entry => {
        entry.id = entries.indexOf(entry) + 1;
    })
    cardContainer.innerHTML = "";
    if (entries.length < 1) {
        greeting.style.display = "block";
    }
    entries.forEach(entry => displayElements(entry));
    entries = JSON.stringify(entries);
    localStorage.setItem('entries', entries);
}

function createGreeting() {
    let greetingEmpty = document.createElement("p");
    greetingEmpty.classList.add("greetingEmpty");
    let greetingText = document.createTextNode("The address book is empty");
    greetingEmpty.appendChild(greetingText);
    greeting.appendChild(greetingEmpty);
}