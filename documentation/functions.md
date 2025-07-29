| function | Use | Output | Input | 
| UploadUserFile | converts input file to a string and saves it as usersXml in local browser storage | | File | 

# UploadUserFile(file)
Use: converts input file to a string and saves it as usersXml in local browser storage

# FileToString(file)
Use: Converts an input File to a string

# OpenTab(tabName)
Use: takes an input tab name and finds a tabcontent class with that name and sets its display to block, sets all other tabcontent classes to none

# LoadCountries()
Use: loads all countries from extension XML file in the devices storage and adds the ID and value to all html elements with name "Countries" 

# LoadPaymentMethods()
Use: loads all Payment methods from extension XML file in devices storage and adds the ID and value to all HTML elements with the name "Payment Method"

# Search(CountryID = 0, PaymentMethodID = 0)
Use: searches for any users that have the same country ID and/or paymentmethodid and dislays them in a list

# AddUser(userID, username, email, country, paymentmethod)
Use: Adds a new user to the xml file in local browser storage

# UserExists(userID, username, email)
Use: if ID exists returns true 
if ID does not exist but username does then return true 
if username and id dont exist but email does ask use if they want to proceed 

# DownloadUserFile()
Use: downloads the XML file being stored locally in browser to use or import to another extension instance 

Proposed classes: 
* User 
* * Contains functions related to searching for and adding new users 
* * Functions to be moved to user: Search, AddUser, UserExists, EditUser, RemoveUser

* UI 
* * Links functions to the UI and handles AI behaviour seperate from the main functionality 
* * Functions to be move to UI: OpenTab, window.onload, LoadCountries, LoadPaymentMethods

* Utilities
* * Handles common tasks 
* * functions to be moved to utilities: UploadUserFile, FileToString, DownloadUserFile