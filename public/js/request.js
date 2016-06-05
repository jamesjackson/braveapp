var data;
var userPoints = document.querySelector('.user--points');

function reqListener () {
  data = JSON.parse(this.responseText);

  if (window.location.href.indexOf("profile") != -1) {
    buildProfile();
  }

  if (window.location.href.indexOf("points") != -1) {
    var pointsContainer = document.querySelector('.user--points');
    pointsContainer.innerHTML = 'Total Points: ' + data.points;
  }
}

// build profile
function buildProfile () {
  var userName = document.querySelector('.user--name');
  var userPhoto = document.querySelector('.user--photo');

  // user profile
  userName.innerHTML = data.user;
  userPoints.innerHTML = 'Total Points: ' + data.points;
  userPhoto.innerHTML = '<img src="http://' + data.photo + '" />';
};

//points
function redeemPoints (rewardCost, reward) {
  var answer = window.confirm('Are you sure you want to redeem ' + reward + ' for ' + rewardCost + ' points?');
    if (answer) {
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
      xhttp.open("POST", "/redeemPoints", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({"points": rewardCost }));
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
    else if (xhttp.readyState == 4 && (xhttp.status == 405)) {
      alert('You already entered that code.');
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

var redeemButtons = document.querySelectorAll('.btn--redeem-reward');
var numberPattern = /\d+/g;

[].forEach.call(redeemButtons, function(button) {
  button.addEventListener('click', function(){
    var pointValue = parseInt(button.previousSibling.previousSibling.innerHTML.match(numberPattern));
    var reward = button.previousSibling.parentNode.querySelector('h3').innerHTML;
    if (pointValue <=  data.points) {
      redeemPoints(pointValue, reward);
    } else { alert('Keep volunteering to earn more points!')}
  })
});
