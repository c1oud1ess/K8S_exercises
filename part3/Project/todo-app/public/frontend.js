const geturl = "http://localhost:8081/todos"
const posturl = "http://localhost:8081/todo"

function postTodo() {
    const inputStr = document.getElementById("input-todos").value;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() {
        getTodos();
    };
    xmlHttp.open("POST", posturl);
    xmlHttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({"content": inputStr}));
    console.log(JSON.stringify({"content": inputStr}));
}

function getTodos() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE) {
            const todos = JSON.parse(xmlHttp.responseText);
            const list = document.getElementById("list");
            list.innerHTML = "";
            todos.forEach(function (todo) {
                const listItem = document.createElement("li");
                listItem.innerText = todo.content; 
                list.appendChild(listItem);
            });
        }
    };
    xmlHttp.open("GET", geturl, true);
    xmlHttp.send();
}



window.onload = function() {  
    getTodos(); 
};