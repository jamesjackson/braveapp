var data;
var userPoints = document.querySelector('.user--points');

function reqListener () {
  data =  JSON.parse(this.responseText);
  buildProfile();
}

// build profile
function buildProfile () {
  var userName = document.querySelector('.user--name');
  var userPhoto = document.querySelector('.user--photo');

  // user profile
  userName.innerHTML = data.user;
  userPoints.innerHTML = 'Total Points:' + data.points;
  userPhoto.innerHTML = '<img src="http://' + data.photo + '" />';
};

//points
function redeemPoints (n, reward) {
  var answer = window.confirm('Are you sure you want to redeem ' + reward + ' for ' + n + ' points?');
    if (answer) {
      data.points -= n;
      userPoints.innerHTML = 'Total Points:' + data.points;
    }
    else {
    alert ("No Points Were Charged.")
  }
}

function earnPoints (n) {
  data.points += n;
  userPoints.innerHTML = 'Total Points:' + data.points;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/user");
oReq.send();
