// logging out session
const logout = document.querySelector("#logout");
const modalbox = document.getElementById("staticBackdrop");
const myModal = new bootstrap.Modal("#staticBackdrop");
logout.addEventListener("click", () => {
  const modalHead = document.getElementById("staticBackdropLabel");
  const errorMsg = document.getElementById("error__msg");
  const mbtn = document.getElementById("modalbtn");
  modalHead.innerText = "Logging out";
  modalHead.style.color = "green";
  errorMsg.innerText = "See you soo...........!";
  errorMsg.style.color = "green";
  mbtn.style.backgroundColor = "green";
  myModal.show();

  mbtn.addEventListener("click", () => {
    location.replace("index.html");
  });
});
// end of logging out

// create table of todo

let table = `<th scope="col" class="border  border-danger">ID</th>
            <th scope="col" class="border  border-danger">Todo-tasks</th>
            <th scope="col" class="border  border-danger">Completed</th>`;

let todoTable = document.querySelector("#todoTable");
const todo = document.querySelector("#todo");
const tHead = document.createElement("thead");
tHead.classList.add("fs-4", "table-dark", "lh-lg");
const headRow = document.createElement("tr");
headRow.classList.add("text-light");
headRow.innerHTML = table;
tHead.append(headRow);
// todoTable.append(Thead);

let addContent = function (response, todoTable) {
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-group-divider", "fs-5", "lh-lg");

  let checkBox = ``;
  let content = ``;
  for (i = 0; i < 30; i++) {
    if (response[i].completed) {
      checkBox = ` <input class="form-check-input disabledFieldsetCheck" type="checkbox"  checked disabled>`;
    } else {
      checkBox = ` <input class="form-check-input fieldToCheck" type="checkbox">`;
    }
    content += `<tr ">
                    <th scope="row" scope="col" class="border border-danger">${response[i].id}</th>
                    <td class="text-start border border-danger">${response[i].title}</td>
                    <td scope="col" class="border border-danger">${checkBox}</td>
                </tr>`;
  }
  tBody.innerHTML = content;
  todoTable.append(tHead);
  todoTable.append(tBody);
};
// end of table

// checked count
function checkBoxValidation() {
  const enabledCheck = document.querySelectorAll(".fieldToCheck");
  // let checkCount = 0;
  let checkEvent = { checkCount: 0, uncheck: true };
  for (let i = 0; i < enabledCheck.length; i++) {
    enabledCheck[i].addEventListener("click", () => {
      let promise = new Promise((resolve, reject) => {
        if (enabledCheck[i].checked) {
          checkEvent.checkCount++;
          checkEvent.uncheck = false;
          resolve(checkEvent);
          // if (checkCount == 5) {
          //   alert(" Congrats. 5 Tasks have been Successfully Completed");
          // }
        } else {
          if (checkEvent.checkCount > 0) {
            checkEvent.checkCount--;
            checkEvent.uncheck = true;
            resolve(checkEvent);
          } else {
            reject("Error:some error occured");
          }
        }
      });
      promise.then((checkEvent) => {
        if (checkEvent.checkCount == 5 && !checkEvent.uncheck) {
          const modalHead = document.getElementById("staticBackdropLabel");
          const errorMsg = document.getElementById("error__msg");
          const mbtn = document.getElementById("modalbtn");
          modalHead.innerText = "Todo Success";
          modalHead.style.color = "green";
          errorMsg.innerText =
            "Congrats. 5 Tasks have been Successfully Completed";
          errorMsg.style.color = "green";
          mbtn.style.backgroundColor = "green";
          myModal.show();
        }
      });
    });
  }
}
// end of checked count
let dataPull = false;
todo.addEventListener("click", () => {
  if (!dataPull) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);

        addContent(response, todoTable);
        checkBoxValidation();
      }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
    dataPull = true;
  }
});