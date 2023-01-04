var inputfield = document.getElementById("inputfield");
var listsection = document.getElementById("listsection");
var row = listsection.querySelector(".row");
var tasklist;
var ID = -1;
var unactivestar = document.getElementsByClassName("unactivestar");
var activestar = document.getElementsByClassName("activestar");
var taskstate = document.getElementsByClassName("completed");

if(localStorage.getItem("Tasks") == null){
    /*the array will start from zero*/
    tasklist = [];
}
else{
    /*the array will take the data from localstorage then display them */
    tasklist = JSON.parse(localStorage.getItem("Tasks"));

    displayTasks();
}
function addTask (index){
    
    if(ID >= 0){
        tasklist[ID] = inputfield.value;
        ID = -1;
    }
    else{
        if(inputfield.value != ""){
            tasklist.push(inputfield.value);
            
        }
        else{
            alert("the field is empty. please enter a task");
        }
    }
    localStorage.setItem("Tasks" , JSON.stringify(tasklist));
    inputfield.value = "";
    displayTasks();
    
   
}
function displayTasks (){
    var htmlContent = "";
    for(var i = 0 ; i<tasklist.length ; i++){
        htmlContent += `<div class="col-xl-12">
    <div class="task bg-white d-flex align-items-center justify-content-between mt-3">
        <button onclick="completeTask(${i})"><i class="completed fa-regular fa-circle-check"></i></button>
        <p>${tasklist[i]}</p>
        <div class="manipulate ml-auto">
            <button onclick="editTask(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
            <button onclick="deleteTask(${i})"><i class="fa-regular fa-trash-can"></i></button>
            <button onclick="importanceLevel(${i})"><i class="unactivestar fa-regular fa-star"></i><i class="activestar fa-solid fa-star"></i></button>
        </div>
    </div>
    </div>`
    }
    row.innerHTML = htmlContent;
}

function editTask(index){
    
    inputfield.value = tasklist[index];
    ID = index
}
function deleteTask(index){
    tasklist.splice(index , 1);
    localStorage.Tasks = JSON.stringify(tasklist);
    displayTasks();
}

function importanceLevel (index){
    
    if(activestar[index].style.opacity == "1"){
        activestar[index].style.opacity = "0"
    }
    else{
        activestar[index].style.opacity = "1";
    }
}

var taskname = document.getElementsByTagName('p');
function completeTask (index){
    if(taskstate[index].style.opacity == "1"){
        taskstate[index].style.backgroundColor = "transparent";

        taskstate[index].style.opacity = "0.4";

        taskname[index].style.textDecoration = "none";
    }
    else{
        taskstate[index].classList.toggle("completed-task-icon")
        
        taskname[index].classList.toggle("completed-task-text");
    }
}
