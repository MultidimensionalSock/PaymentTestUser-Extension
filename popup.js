



document.getElementById("edit-user").addEventListener("click", function(){
  tabcontent = document.getElementsByClassName("edit-user-form"); 
    tabcontent[0].style.display = "block"; 
});



async function UserExists(userID, username, email)
{
  //if user id exists return true 
  //if userid ! exist but username does, return true
  //if username ! exist but email does, return alert asking if user is sure 
}

