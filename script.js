const lForm = document.getElementById("login__form");
let uname, pwd, message, done;
const button = document.getElementById("btn");
const regexname = /^admin$/;
const regexpwd = /^12345$/;
const modalbox = document.getElementById("staticBackdrop");
const myModal = new bootstrap.Modal("#staticBackdrop");
// setTimeout(() => {
//   myModal.show();
//   console.log("hi");
// }, 0);
lForm.addEventListener("submit", (e) => {
  e.preventDefault();
  uname = document.getElementById("floatingInput").value;
  pwd = document.getElementById("floatingPassword").value;
  console.log(uname);
  console.log(pwd);
  done = false;
  // if (regexname.test(uname) && regexpwd.test(pwd)) {
  //   alert("Login Successfully");
  //   window.location.replace("../main.html");
  // } else {
  //   alert("invalid uname or pwd");
  // }
  // return false;
  validation(uname, pwd, (message, done) => {
    console.log(done);
    if (!done) {
      const modalHead = document.getElementById("staticBackdropLabel");
      const errorMsg = document.getElementById("error__msg");
      const mbtn = document.getElementById("modalbtn");
      modalHead.innerText = "Error";
      modalHead.style.color = "red";
      errorMsg.innerText = message;
      errorMsg.style.color = "red";
      mbtn.style.backgroundColor = "red";
      myModal.show();

      mbtn.addEventListener("click", () => {
        location.reload();
      });
    } else {
      const modalHead = document.getElementById("staticBackdropLabel");
      const errorMsg = document.getElementById("error__msg");
      const mbtn = document.getElementById("modalbtn");
      modalHead.innerText = "Valid credentials";
      modalHead.style.color = "blue";
      errorMsg.innerText = message;
      errorMsg.style.color = "blue";
      mbtn.style.backgroundColor = "blue";
      myModal.show();

      mbtn.addEventListener("click", () => {
        location.replace("main.html");
      });
    }
  });
});

function validation(uname, pwd, callback) {
  if (regexname.test(uname) && regexpwd.test(pwd)) {
    callback("Login successfully", true);
  } else if (uname == "" || pwd == "") {
    callback("Username and Password are mandatory", false);
  } else if (!regexname.test(uname) || !regexpwd.test(pwd)) {
    if (!regexname.test(uname) && !regexpwd.test(pwd))
      callback("Invalid Username and Password", false);
    else if (!regexname.test(uname)) callback("Invalid Username", false);
    else callback("Invalid Password", false);
  }
}