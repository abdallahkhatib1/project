var comments = [];

function postComment() {
    var comment = document.getElementById("WritingComment").value;
    var postTime = new Date().getTime();

    var commentElement = document.createElement("div");
    commentElement.className = "comment";

    var profilePicture = document.createElement("img");
    profilePicture.src = "1.jpg"; 
    profilePicture.className = "profilePhoto";
  
    var ProfileName = document.createElement("div");
    ProfileName.className = "profilename";
    ProfileName.innerHTML = "<strong>frances guerrero </strong><br>" + comment + " <span class='time' data-post-time='" + postTime + "'>" + getTimeElapsed(postTime);
  
    var likeSection = document.createElement("div");
    likeSection.className = "like-section";
    likeSection.innerHTML = "<span class='like-button' onclick='toggleLike(this)'>Like</span> <span class='like-count'>0</span>";
    ProfileName.appendChild(likeSection);

    commentElement.appendChild(profilePicture);
    commentElement.appendChild(ProfileName);
  
    comments.push(commentElement);
  
    document.getElementById("WritingComment").value = "";
  
    updateCommentsDisplay();
  }
  

function updateCommentsDisplay() {
  var commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = "";

  var visibleComments = comments.slice(0, 2); 
  for (var i = 0; i < visibleComments.length; i++) {
    commentsContainer.appendChild(visibleComments[i]);
  }

  var loadMoreButton = document.getElementById("loadMore");
  if (comments.length > visibleComments.length) {
    loadMoreButton.style.display = "block";
  } else {
    loadMoreButton.style.display = "none";
  }
}

function loadMoreComments() {
  var commentsContainer = document.getElementById("commentsContainer");
  var remainingComments = comments.slice(commentsContainer.children.length, commentsContainer.children.length + 2);

  for (var i = 0; i < remainingComments.length; i++) {
    commentsContainer.appendChild(remainingComments[i]);
  }

  var loadMoreButton = document.getElementById("loadMore");
  if (commentsContainer.children.length === comments.length) {
    loadMoreButton.style.display = "none";
  }
}

function updateTimes() {
  var commentElements = document.getElementsByClassName("comment");

  for (var i = 0; i < commentElements.length; i++) {
    var timeElement = commentElements[i].querySelector(".time");
    var postTime = parseInt(timeElement.getAttribute("data-post-time"), 10);
    var time = getTimeElapsed(postTime);
    timeElement.textContent =  time ;
  }
}

function getTimeElapsed(postTime) {
  var now = new Date();
  var currentTime = now.getTime();
  var secondsElapsed = Math.floor((currentTime - postTime) / 1000);

  if (secondsElapsed < 60) {
    return secondsElapsed + " sec";
  } else {
    var minutesElapsed = Math.floor(secondsElapsed / 60);
    return minutesElapsed + " min";
  }
}

function toggleLike(likeButton) {
  var likeCounter = likeButton.nextElementSibling;
  var likeCount = parseInt(likeCounter.textContent, 10);

  if (likeButton.classList.contains("liked")) {
    likeCount--;
    likeButton.style.color = "black";
    likeButton.classList.remove("liked");
  } else {
    likeCount++;
    likeButton.style.color = "blue";
    likeButton.classList.add("liked");
  }

  likeCounter.textContent = likeCount;
}

setInterval(updateTimes, 1000);