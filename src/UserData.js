//Find User 

document.getElementById("findaccount").addEventListener("click", function () 
{
  var countryid = document.getElementById("findcountry").value;
  var paymentmethodid = document.getElementById("findpaymentmethod").value; 
  Search(countryid, paymentmethodid); 
});

async function Search(countryID = 0, PaymentMethodID = 0)
{
  var parent = document.getElementById("SearchUserTable");
  for (var k = 1; k < parent.children.length; k++)
  {
    parent.removeChild(parent.children[k]);
  }
   
  GetUserFile();

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

//download User Data
document.getElementById("downloaduserfile").addEventListener("click",function()
{ 
  DownloadUserFile();
});

async function DownloadUserFile()
{
  const blob = new Blob([localStorage.getItem('usersXml')], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'users.xml';
  link.click();
}

//Upload user data 
document.getElementById("userfileupload").addEventListener("click", function(event)
{
  let file = document.getElementById("userfile").files[0]; 
  if (!file)
  {
    alert('no file selected!');
    return;
  }
  UploadUserFile(file);
}); 

async function UploadUserFile(file)
{ 
  const xmlString = await FileToString(file);
  localStorage.setItem('usersXml', xmlString);
  alert(localStorage.getItem('usersXml'));
};

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
};

//Add User
document.getElementById("addaccount").addEventListener("click", function ()
{
  var userID = document.getElementById("useridadd").value;
  var username = document.getElementById("usernameadd").value; 
  var email = document.getElementById("emailadd").value; 
  var country = document.getElementById("countryadd").value;
  var paymentmethod = [];
  for (var option of document.getElementById("paymentmethodadd").options)
  {
    if (option.selected)
    {
      paymentmethod.push(option.value);
    }
  } 

  AddUser(userID, username, email, country, paymentmethod);
});

async function AddUser(userID, username, email, country, paymentmethod)
{
  const serializer = new XMLSerializer(); 
  var xmlDoc = await GetUserFile();

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
  for (var i = 0; i < paymentmethod.length; i++)
  {
    var paymentMethodElement = xmlDoc.createElement('PaymentMethod');
    paymentMethodElement.textContent = paymentmethod[i];
    paymentMethodsElement.appendChild(paymentMethodElement);
  }
  userElement.appendChild(paymentMethodsElement);

  var users = xmlDoc.querySelector('Users');
  users.appendChild(userElement); 
  alert("User Appended");

  var updatedXmlString = serializer.serializeToString(xmlDoc);

  //save file to chrome local storage
  localStorage.setItem("usersXml", updatedXmlString);
  alert("User added successfully");
}

async function GetUserFile()
{
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
  return xmlDoc;
}