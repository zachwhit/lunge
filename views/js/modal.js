

// Get the modal
var modal = document.getElementById("myModal");

// Get the button and content for advanced search modal
var advSearchBtn = document.getElementById("advSearch");
var advSearchModal = document.getElementById("advSearchModal");

// Get the button and content for sign in modal 
var signInBtn = document.getElementById("signInButton");
var loginBoxModal = document.getElementById("loginBoxModal")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the Advanced Search button, open the modal
advSearchBtn.onclick = function() {
  modal.style.display = "block";
  advSearchModal.style.display = "block";
}

// When the user clicks on the Sign In/Register button, open the modal
signInBtn.onclick = function() {
  modal.style.display = "block";
  loginBoxModal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  advSearchModal.style.display = "none";
  loginBoxModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    advSearchModal.style.display = "none";
    loginBoxModal.style.display = "none";
  }
}