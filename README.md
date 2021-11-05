# Introduction
The purpose of this repository is to convert CSV files uploaded in a certain folder in my Dropbox account and convert them to markdown files. 
Ideally, I'd like to host this project in Heroku or some similar service which receives a webhook notification whenever a CSV is uploaded to the target folder and then run the program to create the markdown file.

# Rationale
I read extensively in the iOS Marvin app and one of the ways to extract Marvin highlights is in CSV format. I exported my highlights to Dropbox and the aim for this project was to convert these highlights to dropbox.
I would like the conversion to happen automatically and for this I'm planning to implement Dropbox webhooks.

# Dropbox Setup
I created the following folder hierarchy in Dropbox:
- Highlights
  - Inbox
  - Processed

I upload my highlights from Marvin to Dropbox in CSV folder. The initial place is Inbox. Once the app runs, it creates a markdown file with the same name in Processed folder and also moves the origianl CSV to the Processed folder, leaving the Inbox empty.  

Also, we need to create an app in Dropbox whose access token will be used in the app. You can crete and configure the app [here](https://www.dropbox.com/developers/apps).
