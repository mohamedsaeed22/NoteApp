let input = document.querySelector(".input");
let add = document.querySelector(".add");
let wrapper = document.querySelector(".wrapper");
let deleteAll = document.querySelector(".deleteAll");

let arr = [];
if (window.localStorage.getItem("tasks")) {
  arr = JSON.parse(window.localStorage.getItem("tasks"));
  arr.forEach((task) => {
    addOneTask(task);
  });
} else {
  console.log("Not Found Data at local storage");
}

add.onclick = function () {
  addTaskToLocal();
};

deleteAll.onclick = function () {
  window.localStorage.clear();
  arr = [];
  wrapper.innerHTML = "";
};

function addTaskToLocal() {
  if (input.value !== "") {
    let obj = {
      id: Date.now(),
      task: input.value,
    };
    arr.unshift(obj);
    window.localStorage.setItem("tasks", JSON.stringify(arr));
    addOneTask(obj);
  }
  input.value = "";
}

function addOneTask(obj) {
  let tasks = document.createElement("div");
  let myP = document.createElement("p");
  let myBtn = document.createElement("button");
  let myBtnText = document.createTextNode("delete");
  let myText = document.createTextNode(obj.task);
  tasks.classList.add("tasks-container");
  myP.appendChild(myText);
  myBtn.appendChild(myBtnText);
  tasks.appendChild(myP);
  tasks.appendChild(myBtn);
  wrapper.prepend(tasks);
  myBtn.addEventListener("click", function (e) {
    removeTask(obj);
    wrapper.removeChild(tasks);
  });
}

function removeTask(obj) {
  let new_arr = arr.filter((el) => {
    return el != obj;
  });
  arr = new_arr;
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}
