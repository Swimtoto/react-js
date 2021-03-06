var submitBtn = document.createElement("button");
submitBtn.textContent = "Get Picture";
submitBtn.addEventListener("click", getData);
document.body.appendChild(submitBtn);


function getData() {
  resetData();
  var textBox = "";

  // If the date is correct (ie right format yyyy-dd-mm)
  if (document.getElementById("qDate").value.length !== 0) {
    console.log(document.getElementById("qDate").value);
    textBox = "?date=";
    textBox += document.getElementById("qDate").value;
    textBox += "&api_key=SXPXfC74bFcx0aEKS9C4YRXz1LsTLoRp5FFfHvck";
  }
  else {
   textBox = "?api_key=SXPXfC74bFcx0aEKS9C4YRXz1LsTLoRp5FFfHvck";
  }

  var req = new XMLHttpRequest();
  req.open("GET", "https://api.nasa.gov/planetary/apod" + textBox, true);

  req.addEventListener('load', function() {
    // We check if the request is correct or not
    if (req.status >= 200 && req.status < 400) {
      // We display the content of the request in the console
      console.log(req)

      var response = JSON.parse(req.responseText);
      if (response["media_type"] === "video") {
        var newVideo = document.createElement("iframe");
        newVideo.id = "video";
        newVideo.src = response["url"];
        document.body.insertBefore(newVideo, document.body.firstChild);
      } else {
        document.getElementById('pic').src = response["url"];
      }

      document.getElementById('title').textContent = response["title"];
      document.getElementById('date').textContent = response["date"];
      document.getElementById('explanation').textContent = response["explanation"];
    }
    else {
    	document.getElementById('explanation').textContent = req.responseText;
      document.getElementById('date').textContent = req.status;
    }
  });

  req.send(null);
}

function resetData() {
  document.getElementById('pic').src = "";
  document.getElementById('title').textContent = "";
  document.getElementById('explanation').textContent = "";
  document.getElementById('date').textContent = "";
  if (document.getElementById('video')) {
    var removeMe = document.getElementById('video');
    removeMe.parentNode.removeChild(removeMe);
  }
}
