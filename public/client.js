document.getElementById("gen-btn").addEventListener("click", function() { 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.response);
      document.getElementById("resultsContainer").innerHTML = xhr.response;
    } else {
      console.log("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
});

