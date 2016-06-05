function reqListener () {
  var data =  JSON.parse(this.responseText);
  var userName = document.querySelector('.user--name');
  var userPoints = document.querySelector('.user--points');
  var userPhoto = document.querySelector('.user--photo');

  userName.innerHTML = data.user;
  userPoints.innerHTML = 'Total Points:' + data.points;
  userPhoto.innerHTML = '<img src="http://' + data.photo + '" />';
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/user");
oReq.send();
