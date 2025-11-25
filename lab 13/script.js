let collection = [];

function renderList() {
    const list = document.getElementById("itemList");
    list.innerHTML = "";
    collection.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item + " ";
        
        let delBtn = document.createElement("button");
        delBtn.textContent = "Удалить";
        delBtn.onclick = () => deleteItem(index);

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addItem() {
    const input = document.getElementById("itemInput");
    if (input.value.trim() !== "") {
        collection.push(input.value.trim());
        input.value = "";
        renderList();
    }
}

function deleteItem(index) {
    collection.splice(index, 1);
    renderList();
}

function searchItem() {
    const query = document.getElementById("searchInput").value.trim();
    const found = collection.filter(item => item.includes(query));

    if (found.length > 0) {
        alert("Найдено: " + found.join(", "));
    } else {
        alert("Ничего не найдено");
    }
}

function sortItems() {
    collection.sort();
    renderList();
}

