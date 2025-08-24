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