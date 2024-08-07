# NetMediaHub
NetMediaHub is a social media network web app built in vanilla JavaScript. Through this web app, you can create an account, puplish posts, write comments, add tags to your post, edit or delete posts and you have your own profile to manage it.

## Technologies
I have used vanilla JavaScript to build it and used API to make more interactive. API is provided by Tarmeez acadamy, you can reach it <a href="https://documenter.getpostman.com/view/4696539/2s83zjqN3F">here</a>.I also used Tailwind CSS and Flowbite library to layout pages in awesome design. Axios is also used to ease API requests.

## Snapshots
<img src='./assets/Snapshots/landingDark.jpg'>
<img src='./assets/Snapshots/login.png'>
<img src='./assets/Snapshots/registerDark.png'>
<img src='./assets/Snapshots/homeDark.jpg'>
<img src='./assets/Snapshots/postDark.jpg'>
<img src='./assets/Snapshots/profileDark.jpg'>


## Installation
In this project, i've used Axios, Tailwind, and Flowbite. So, make sure to install them by following the next steps. First you have make sure that Node.js is already installed in your device and NPM will be installed by default with it.

**Clone the Repository**
```bash
git clone https://github.com/abdulazimRabie/NetMediaHub.git
```

**Install Dependencies**
```bash
npm install
```

**Build Tailwind CSS**
```bash
npx tailwindcss -i ./src/styles.css -o ./src/output.css
```

**To watch for changes**
```bash
npx tailwindcss -i ./src/styles.css -o ./src/output.css --watch
```

**Run project**
`alt` + `l` + `o` Use Live Server extension to run it locally.

### Known issues (Work in progress)
- When user puplish more than two post the post option [delete-edit] button get duplicated and you have to refresh the page.
- Thers is a problem with post modal, you have to go back and return to the page to be able to open the post modal to write new post
