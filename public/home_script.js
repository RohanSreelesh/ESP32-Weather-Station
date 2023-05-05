
function getStats(){
  //make get request to /statistics
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = "/statistics";
    }
  }
  xhttp.open("GET", "/statistics", true);
  xhttp.send();

};

function main(){
  //on click event for the submit button
  let statsButton = document.querySelector(".stats");

  statsButton.addEventListener("click", function() {
    getStats();
  });
}

function updateData(url, elementId) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      console.log(res.result);
      document.getElementById(elementId).innerHTML = res.result;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


setInterval(function() {
  updateData("/temperature", "temperature");
}, 15000);

setInterval(function() {
  updateData("/humidity", "humidity");
}, 15000);
