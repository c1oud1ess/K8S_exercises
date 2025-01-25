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
    xmlHttp.send(JSON.stringify({"value": inputStr}));
    console.log(JSON.stringify({"value": inputStr}));
}

function getTodos() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === XMLHttpRequest.DONE) {
            const todos = xmlHttp.responseText.slice(1, -1);
            const todosArray = todos.split(',');
            const list = document.getElementById("list");
            list.innerHTML = "";
            todosArray.forEach(function(item) {
                const listItem = document.createElement("li");
                listItem.innerText = item.slice(1, -1);
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