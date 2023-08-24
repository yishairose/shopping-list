//Select all items in DOM
const form = document.querySelector('#item-form');
const filter = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const listItems = itemList.querySelectorAll('li');
const clearAllBtn = document.querySelector('#clear');
//Create submit new li functionality
//Push Item to array
//Populate DOM with array items
let itemsArray = [];
function clearDOM() {

    Array.from(itemList.children).forEach(item => {
        itemList.removeChild(item);
    })
}
function populateDom(array) {
    clearDOM();
    array.forEach((item, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', index);
        const liTextNode = document.createTextNode(item);
        li.appendChild(liTextNode);
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('remove-item', 'btn-link', 'text-red');
        const faIcon = document.createElement('i');
        faIcon.classList.add('fa-solid', 'fa-xmark');
        deleteBtn.appendChild(faIcon);
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    })
}
function newListItem(e) {
    e.preventDefault();
    const formData = new FormData(form)
    const newItem = formData.get('item');
    e.target.reset()
    itemsArray.push(newItem);
    populateDom(itemsArray);
    saveTolocalStorage();
}
form.addEventListener('submit', newListItem);
//Delete items functionality
function removeItem(e) {
    if (e.target.classList.contains('fa-xmark')) {
        const deletedIndex = e.target.parentElement.parentElement.getAttribute('data-index');
        itemsArray.splice(deletedIndex, 1);
        populateDom(itemsArray);
        saveTolocalStorage();
    }
}
itemList.addEventListener('click', removeItem);
//Clear all Items
clearAllBtn.addEventListener('click', () => {
    clearDOM();
    itemsArray.length = 0;
    saveTolocalStorage();
})
//Local storage functionality
function saveTolocalStorage() {
    localStorage.setItem('items', JSON.stringify(itemsArray))
}

window.addEventListener('load', () => {
    itemsArray = JSON.parse(localStorage.getItem('items'));
    console.log(itemsArray);
    populateDom(itemsArray);
})

//Filter functionality 
function filterList(e) {
    let filterValue = e.target.value;
    const filteredList = itemsArray.filter((item => {
        return item.includes(filterValue);
    }))

    populateDom(filteredList);

}
filter.addEventListener('input', filterList);

