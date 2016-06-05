var data;
var userPoints = document.querySelector('.user--points');

function reqListener () {
  data = JSON.parse(this.responseText);

  if (window.location.href.indexOf("profile") != -1) {
    buildProfile();
  }
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
function redeemPoints (rewardCost, reward, n) {
  var answer = window.confirm('Are you sure you want to redeem ' + reward + ' for ' + rewardCost + ' points?');
    if (answer) {
      checkCode(code);
    }
    else {
      alert ("No Points Were Used.")
  }
}

// check code for accuracy
function checkCode(code) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // get updated data and update points
      var updatedData = JSON.parse(xhttp.responseText);
      updatePoints(updatedData.points);
    }
    else if (xhttp.readyState == 4 && (xhttp.status == 432 || xhttp.status == 500)) {
      alert('Sorry! That code was not found.');
    }
  };
  xhttp.open("POST", "/earnPoints", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({"code": code }));
}

// earn points
function updatePoints(n) {
  data.points = n;
  alert('Your points have been updated');
  userPoints.innerHTML = 'Total Points:' + data.points;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/user");
oReq.send();
