document.getElementById("findtab").addEventListener("click", function(){ openTab('find')});
document.getElementById("addtab").addEventListener("click", function(){ openTab('add')});
document.getElementById("settingstab").addEventListener("click", function(){openTab('settings')});
document.getElementById("edittab").addEventListener("click", function(){openTab('edit')});

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
    var darkmode =  JSON.parse(localStorage.getItem("dark"));
    if (darkmode === null)
    {
      darkmode = false; 
      localStorage.setItem("dark", darkmode.toString());
    }
    var checkbox = document.getElementById("dark-mode");
    checkbox.checked = darkmode; 
    DarkMode(JSON.parse(darkmode));
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

document.getElementById("dark-mode").addEventListener("click", function(){ 
  var checkbox = document.getElementById("dark-mode");
  if (checkbox.checked == true)
  {  
    DarkMode(true);
    return;
  } 
  DarkMode(false);
});

function DarkMode(isDark)
{ 
  var body = document.body;
  localStorage.setItem("dark", isDark.toString());
  alert(localStorage.getItem("dark"));  
  if (isDark)
  {
    body.classList.add('dark');  
    return;
  }
  body.classList.remove('dark');  
}