
# Train Scheduler Basic

A train schedule application that incorporates Firebase to host arrival and departure data. This app will retrieve and manipulate this information with Moment.js. It will also provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

**When adding trains, administrators should be able to submit the following:**

:white_check_mark: Train Name

:white_check_mark: Destination

:white_check_mark: First Train Time -- in military time

:white_check_mark: Frequency -- in minutes

:white_check_mark: Code this app to calculate when the next train will arrive; this should be relative to the current time.

:white_check_mark: Users from many different machines must be able to view same train times.

## :open_file_folder: Files
```
Train-Scheduler-Basic
├─ .git
├─ assets
│  ├─ css
│  │  └─ style.css
│  ├─ javascript
│  │  └─ main.js
│  └─ videos
│     └─ subway.mp4
├─ index.html
└─ README.md
```

## Technologies
- Bootstrap
- Google Fonts
- Fontawesome
- JavaScript
  - jQuery
  - Momentjs
- Firebase

## Install
To clone this project to your device, type the `code` below to your git bash:
```bash
git clone https://github.com/itshally/Train-Scheduler-Basic.git
```

Then in the path `assets/javascript/main.js`, make sure to configure the lines 2-10 with your own **Firebase SDK Snippet**. You can find it under your project's **settings**.
```javascript
var  firebaseConfig  =  {
	
	/**
	* This part is auto filled
	* It includes apiKey, authDomain, databaseURL, projectId, storageBucket,
	* messagingSenderId, and appId
	**/
	
};
```
Then on the left sidebar of your project's firebase, click the **Database**. For this project, I'm using the **Realtime Database**.

Once you clicked it, go to the **Rules** and configure the code into this:
```javascript
"rules": {
    ".read": true,
    ".write": true
 }
```

## Usage
I'm deploying it with Github Pages. 
Here is a guide for deploying it to Github Pages if ever you encountered some problems: 
:point_right: [How to effortlessly create a website for free with GitHub Pages (...)](https://towardsdatascience.com/how-to-create-a-free-github-pages-website-53743d7524e1)

## Screenshots
![Under Construction Image](https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_960_720.png)

## Demo
Click this [live preview](https://itshally.github.io/Train-Scheduler-Basic/) to see this page.

## Author
[@itshally](https://itshally.github.io/)
