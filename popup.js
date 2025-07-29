document.getElementById("findaccount").addEventListener("click", function () 
{
  var countryid = document.getElementById("findcountry").value;
  var paymentmethodid = document.getElementById("findpaymentmethod").value; 
  Search(countryid, paymentmethodid); 
});

document.getElementById("addaccount").addEventListener("click", function ()
{
  var userID = document.getElementById("useridadd").value;
  var username = document.getElementById("usernameadd").value; 
  var email = document.getElementById("emailadd").value; 
  var country = document.getElementById("countryadd").value;
  var paymentmethod = document.getElementById("paymentmethodadd").value; 

  AddUser(userID, username, email, country, paymentmethod);
});

document.getElementById("downloaduserfile").addEventListener("click",function()
{ 
  DownloadUserFile();
});

document.getElementById("userfileupload").addEventListener("click", function(event)
{
  let file = document.getElementById("userfile").files[0]; 
  if (!file)
  {
    alert('no file selected!');
    return;
  }
  UploadUserFile(file);
})

document.getElementById("findtab").addEventListener("click", function(){ openTab('find')});
document.getElementById("addtab").addEventListener("click", function(){ openTab('add')});
document.getElementById("settingstab").addEventListener("click", function(){openTab('settings')});
document.getElementById("edittab").addEventListener("click", function(){openTab('edit')});
document.getElementById("edit-user").addEventListener("click", function(){
  tabcontent = document.getElementsByClassName("edit-user-form"); 
    tabcontent[0].style.display = "block"; 
});

async function UploadUserFile(file)
{ 
  const xmlString = await FileToString(file);
  localStorage.setItem('usersXml', xmlString);
  alert(localStorage.getItem('usersXml'));
}

function FileToString(file)
{
  return new Promise((resolve, reject) => 
  {
    const reader = new FileReader();
    reader.onload = e =>
      resolve(e.target.result);
      reader.onerror = reject;

      reader.readAsText(file)
  });
}

function openTab(tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
}

window.onload =  async function()
{
    LoadPaymentMethods();
    LoadCountries();
}

async function LoadCountries()
{
    var parent = document.getElementsByName("Countries");

    const response = await fetch('data/country.xml');
    if (!response.ok)
    {
        alert("could not read xml file");
    }
    
    const xmlString = await response.text();
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString, "text/xml");
    var xmldata = xmlDoc.getElementsByTagName("Country");

    for (var i = 0; i < xmldata.length; i++)
    {
        var id = xmldata[i].getElementsByTagName("id")[0].textContent;
        var name = xmldata[i].getElementsByTagName("name")[0].textContent;

        parent.forEach(element => {
            var option = document.createElement("option");
            option.innerHTML = name;
            option.value = id;
            element.appendChild(option);
    });
}
}

async function LoadPaymentMethods()
{
    var parent = document.getElementsByName("Payment Method"); 

    const response = await fetch('data/paymentMethods.xml');
    if (!response.ok)
    {
        alert("could not read xml file");
    } 
    
    const xmlString = await response.text();
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString, "text/xml");
    var xmldata = xmlDoc.getElementsByTagName("PaymentMethod");

    for (var i = 0; i < xmldata.length; i++)
    {
        var id = xmldata[i].getElementsByTagName("ID")[0].textContent;
        var name = xmldata[i].getElementsByTagName("Name")[0].textContent;

        parent.forEach(element => {
            var option = document.createElement("option");
            option.innerHTML = name;
            option.value = id;
            element.appendChild(option);
    });
}
}

async function Search(countryID = 0, PaymentMethodID = 0)
{
  var parent = document.getElementById("SearchUserTable");
  for (var k = 1; k < parent.children.length; k++)
  {
    parent.removeChild(parent.children[k]);
  }
  //get XML doc
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

  var users = xmlDoc.getElementsByTagName("User");
  alert(users.length);
  for (var i = 0; i < users.length; i++)
  { 
    var cmatch = false; 
    var pmmatch = false; 

    if (users[i].getElementsByTagName("CountryID")[0].textContent == countryID || countryID == 0)
    { 
      cmatch = true;
    }

    var paymentMethods = users[i].getElementsByTagName("PaymentMethod");
    for (var j = 0; j < paymentMethods.length; j++)
    {
      if (paymentMethods[j].textContent == PaymentMethodID)
      {
        pmmatch = true; 
      }
    };
    if (PaymentMethodID == 0){ pmmatch = true;}
    if (cmatch && pmmatch)
    {
      alert("user found!"); 

      var userDetails = document.createElement("tr");
      var useriddetails = document.createElement("td");
      useriddetails.innerHTML = users[i].getElementsByTagName("UserID")[0].textContent;
      userDetails.appendChild(useriddetails);

      var usernamedetails = document.createElement("td");
      usernamedetails.innerHTML = users[i].getElementsByTagName("UserName")[0].textContent;
      userDetails.appendChild(usernamedetails);

      var emaildetails = document.createElement("td");
      emaildetails.innerHTML = users[i].getElementsByTagName("Email")[0].textContent;
      userDetails.appendChild(emaildetails);
      
      parent.appendChild(userDetails);
    } 
  };
  document.getElementById("SearchUserTable").style.display = "block"; 
}

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
  paymentMethodElement.textContent = paymentmethod; 
  paymentMethodsElement.appendChild(paymentMethodElement);
  userElement.appendChild(paymentMethodsElement);
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

async function DownloadUserFile()
{
  const blob = new Blob([localStorage.getItem('usersXml')], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'users.xml';
  link.click();
}