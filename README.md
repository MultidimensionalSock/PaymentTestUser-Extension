# User Payments Extension 
The user payment extension can be used to store and search for users by country and payment method to be used for payment testing. 

It was developed to speed up the process of deposit and withdrawal flow testing by having a database of easily searchable users, instead of having to create new users each time. 

The extension has been predominantly tested in Chrome, with spot checks in Firefox. It can be added via uploading the package in Extension Manager with Developer settings enabled. 

This extension is still in Beta. 

## How Privacy is ensured 
This extension runs entirely locally on your browser, data saved to it is in your browsers local storage and is not shared with anyone. Data is stored in XML files (or when in local storage as strings which are then converted to XML for use). Due to this, user data is not stored across browsers, if the extension is removed, the data will be lost. To prevent this, regularly back up your user data by downloading the User XML file in settings, then user data can be restored or shared across browsers/accounts by reuploading it via settings. 