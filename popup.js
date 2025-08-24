

document.getElementById("addaccount").addEventListener("click", function ()
{
  var userID = document.getElementById("useridadd").value;
  var username = document.getElementById("usernameadd").value; 
  var email = document.getElementById("emailadd").value; 
  var country = document.getElementById("countryadd").value;
  var paymentmethod = document.getElementById("paymentmethodadd").selectedOptions; 

  AddUser(userID, username, email, country, paymentmethod);
});

document.getElementById("edit-user").addEventListener("click", function(){
  tabcontent = document.getElementsByClassName("edit-user-form"); 
    tabcontent[0].style.display = "block"; 
});

async function AddUser(userID, username, email, country, paymentmethod)
{
  const serializer = new XMLSerializer(); 

  const xmlString = localStorage.getItem("usersXml");
  if (xmlString === null)
  {
    alert("load data from local file");
    const response = await fetch('data/users.xml');
      if (!response.ok)
      {
        alert("could not read xml file");
      }
      const xmlString = await response.text();  
      alert(xmlString);
      localStorage.setItem("usersXml", xmlString);
  }
  var parser = new DOMParser();
  xmlDoc = parser.parseFromString(xmlString, "text/xml"); 
  alert("serialize to string" + serializer.serializeToString(xmlDoc));
  
  //check the user doesnt already exist (userid or username) 
  //add the user to the users.xml 
  var userElement = xmlDoc.createElement('User');

  var userIdElement = xmlDoc.createElement('UserID');
  userIdElement.textContent = userID;
  userElement.appendChild(userIdElement);

  var usernameElement = xmlDoc.createElement('UserName');
  usernameElement.textContent = username;
  userElement.appendChild(usernameElement);

  var emailElement = xmlDoc.createElement('Email');
  emailElement.textContent = email; 
  userElement.appendChild(emailElement);

  var countryElement = xmlDoc.createElement('CountryID');
  countryElement.textContent = country;
  userElement.appendChild(countryElement);

  var paymentMethodsElement = xmlDoc.createElement('PaymentMethods');
  var paymentMethodElement = xmlDoc.createElement('PaymentMethod'); 
  for (var i = 0; i < paymentMethod.length; i++)
  {
    paymentMethodElement.textContent = paymentmethod[i]; 
    paymentMethodsElement.appendChild(paymentMethodElement);
    userElement.appendChild(paymentMethodsElement);
  }
  alert("Elements created");

  var users = xmlDoc.querySelector('Users');
  users.appendChild(userElement); 
  alert("User Appended");
 
  var updatedXmlString = serializer.serializeToString(xmlDoc);

  //save file to chrome local storage
  localStorage.setItem("usersXml", updatedXmlString);
  alert("User added successfully");
}

async function UserExists(userID, username, email)
{
  //if user id exists return true 
  //if userid ! exist but username does, return true
  //if username ! exist but email does, return alert asking if user is sure 
}

