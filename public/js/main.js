function reqListener () {
  var userName = document.querySelector('.user--name');
  var data = JSON.parse(this.responseText);

  userName.innerHTML = data.user;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/user");
oReq.send();
