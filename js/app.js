'use strict';
let min= 1;
let max = 500;
let form = document.getElementById('form');
let table = document.getElementById('table');
let bookList = [];
function Books(BookName, BookPrice) {
    this.BookName = BookName;
    this.BookPrice = BookPrice;
    bookList.push(this);
    SaveToLocalStoarge()
}

function SaveToLocalStoarge() {
    let obj = JSON.stringify(bookList);
    localStorage.setItem('book', obj);
}

function LoadFromLoaclStoarge() {
    let strObj = localStorage.getItem('book');
    let normalObj = JSON.parse(strObj);
    if (normalObj !== null) {
        for (let i = 0; i < normalObj.length; i++) {
            new Books(normalObj[i].BookName, normalObj[i].BookPrice);
            render();
        }

    }
}


function getRandomPages(){
    return Math.floor(Math.random()*(max-min+1)+min);
}
let h3El = document.getElementById('total');
let thead = document.createElement('thead');
let trEl= document.createElement('tr');
let thEl = document.createElement('th');
function tableHeader(){
    trEl= document.createElement('tr');
    thEl = document.createElement('th');
    thEl.textContent = 'Book Name' ;
    trEl.appendChild(thEl);
    thEl = document.createElement('th');
    thEl.textContent = 'Book Pages';
    trEl.appendChild(thEl);
    thEl = document.createElement('th');
    thEl.textContent = 'Price' ;
    trEl.appendChild(thEl);
    thead.appendChild(trEl);
    table.appendChild(thead);
    h3El = document.getElementById('total');
    h3El.textContent= 'Total: ' + 0;
}
tableHeader();
let tdEl = document.createElement('td');
let tbody = document.createElement('tbody');
// let tfoot = document.createElement('tfoot');
let total = 0;

function render(){
    total = 0;
    for(let i=0;i<bookList.length;i++){
    trEl= document.createElement('tr');
    tdEl = document.createElement('td');
    tdEl.textContent = bookList[i].BookName;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    let bookPages = getRandomPages();
    tdEl.textContent = bookPages;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = bookList[i].BookPrice;
    total += Number(bookList[i].BookPrice);
    trEl.appendChild(tdEl);
    }
    tbody.appendChild(trEl);

    table.appendChild(tbody);
    h3El = document.getElementById('total');
    h3El.textContent= 'Total: ' + total;
    SaveToLocalStoarge();
}
function handl(event){
    event.preventDefault();
    let Bookname = event.target.bookname.value;
    let Bookprice = event.target.select.value;
    new Books(Bookname,Bookprice);
    render();
}
form.addEventListener('submit',handl);
LoadFromLoaclStoarge();