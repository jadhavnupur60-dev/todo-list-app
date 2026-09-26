// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Get saved tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
displayTasks();


// Add task when button is clicked
addButton.addEventListener("click", addTask);


// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a task
function addTask() {

    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Save tasks
    saveTasks();

    // Display tasks
    displayTasks();

    // Clear input
    taskInput.value = "";

    // Put cursor back into input
    taskInput.focus();
}


// Function to display tasks
function displayTasks() {

    // Clear existing list
    taskList.innerHTML = "";

    // Display every task
    tasks.forEach(function(task) {

        // Create list item
        const li = document.createElement("li");

        li.classList.add("task-item");

        // Add completed class
        if (task.completed) {
            li.classList.add("completed");
        }

        // Create left section
        const leftSection = document.createElement("div");

        leftSection.classList.add("task-left");

        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        // Complete/uncomplete task
        checkbox.addEventListener("change", function() {

            toggleComplete(task.id);

        });


        // Create task text
        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Create complete button
        const completeButton = document.createElement("button");

        completeButton.classList.add("complete-button");

        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";


        completeButton.addEventListener("click", function() {

            toggleComplete(task.id);

        });


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add elements
        leftSection.appendChild(checkbox);

        leftSection.appendChild(span);

        li.appendChild(leftSection);

        li.appendChild(completeButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });
}


// Function to complete/uncomplete task
function toggleComplete(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    displayTasks();
}


// Function to delete task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    displayTasks();
}


// Function to save tasks
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}