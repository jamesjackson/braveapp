var data;

function reqListener () {
  data =  JSON.parse(this.responseText);
  var userName = document.querySelector('.user--name');
  var userPoints = document.querySelector('.user--points');
  var userPhoto = document.querySelector('.user--photo');

  // user profile
  userName.innerHTML = data.user;
  userPoints.innerHTML = 'Total Points:' + data.points;
  userPhoto.innerHTML = '<img src="http://' + data.photo + '" />';
}

//points
function redeemPoints (n) {
  var userPoints = document.querySelector('.user--points');
  data.points -= n;
  userPoints.innerHTML = 'Total Points:' + data.points;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/user");
oReq.send();
