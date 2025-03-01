function addCategory() {
    let categoryInput = document.getElementById("new-category");
    let categoryText = categoryInput.value.trim();
    let categoryImgInput = document.getElementById("category-img");
    
    if (categoryText === "") return;
    
    let categoriesContainer = document.getElementById("categories-container");
    let div = document.createElement("div");
    div.className = "bg-gray-100 p-3 rounded-lg";
    
    let imgURL = categoryImgInput.files.length > 0 ? URL.createObjectURL(categoryImgInput.files[0]) : "https://via.placeholder.com/40";
    
    div.innerHTML = `
        <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
            <img src="${imgURL}" class="w-10 h-10 rounded-full object-cover">
            <span class="font-bold">${categoryText}</span>
        </div>
        <i class="fas fa-trash text-red-500 cursor-pointer" onclick="removeCategory(this)"></i>
    </div>
    <div class="mt-2 flex space-x-2">
        <input type="text" class="w-full p-1 bg-gray-200 rounded-lg" placeholder="Add item">
        <button onclick="addItem(this)" class=" text-green-500 p-1 rounded-lg text-2xl font-bold">+</button>
    </div>
    <ul class="mt-2 space-y-1" id="category-${categoryText.replace(/\s+/g, '-').toLowerCase()}"></ul>
`;
    categoriesContainer.appendChild(div);
    categoryInput.value = "";
    categoryImgInput.value = "";
}

function addItem(button) {
    let inputElement = button.previousElementSibling;
    let categoryList = button.parentElement.nextElementSibling;
    
    if (inputElement.value.trim() !== "") {
        let li = document.createElement("li");
        li.className = "flex justify-between items-center bg-white p-2 rounded-lg shadow-sm";
        
        li.innerHTML = `
            <div class="flex items-center space-x-2">
                <input type="checkbox" onclick="toggleItem(this)" class="hidden">
                <i class="fas fa-check-circle text-gray-400 cursor-pointer" onclick="toggleItem(this)"></i>
                <span>${inputElement.value}</span>
            </div>
            <i class="fas fa-trash text-red-500 cursor-pointer" onclick="removeItem(this)"></i>
        `;
        
        categoryList.appendChild(li);
        inputElement.value = "";
    }
}
function toggleItem(element) {
    let checkbox = element.previousElementSibling;
    let checkIcon = element;
    let span = checkIcon.nextElementSibling;

    if (checkIcon.classList.contains("text-gray-400")) {
        checkIcon.classList.remove("text-gray-400");
        checkIcon.classList.add("text-green-500");
        span.classList.add("line-through", "text-gray-400");
    } else {
        checkIcon.classList.remove("text-green-500");
        checkIcon.classList.add("text-gray-400");
        span.classList.remove("line-through", "text-gray-400");
    }
}



function removeItem(trashIcon) {
    trashIcon.parentElement.remove();
}

function removeCategory(trashIcon) {
    trashIcon.parentElement.parentElement.remove();
}