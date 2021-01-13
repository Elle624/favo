# Favo - Turing Mod 3 Group Project

### [Favo]()
### [Favo - Repo](https://github.com/Elle624/favo)
### [Favo - API](https://github.com/Elle624/favo-api)

### [Link To Our Project Description](https://frontend.turing.io/projects/module-3/stretch.html)

---

<img width="1080" alt="welcome-page" src="https://user-images.githubusercontent.com/66269306/104394365-b8493380-5503-11eb-8bc1-54f2a5427d6d.png">

## Table of Contents

* [Project Overview](#project-overview)
* [Goals](#goals)
* [Technologies And Tools](#technologies-and-tools)
* [Setup](#setup)
* [Challenges](#challenges)
* [Wins](#wins)
* [ScreenShots and Demos](#screenshots-and-demos)
* [Roadmap](#roadmap)
* [Credits](#credits)

## Project Overview

Favo is an idea for the "Stretch" project of the MOD 3 at Turing School where we have to show our ability to learn a new technology in a short period of time.
Favo is aimed to build community making volunteering a fun experience, where people can contribute time, resources, or skills to help each other.

* Strech technology - Cypress

## Goals

Our goal was to create a fully functional and responsive website using Cypress as a new testing technology.
Manage time and plan out MVP that is possible to accomplish in a very tight deadline and still deliver our idea to the audience.

## Technologies And Tools

* React
* Express
* CSS/Scss/Sass
* Cypress
* Adobe XD
* GitHub Project Board

## Setup

Clone down this repo and [API](https://github.com/Elle624/favo-api), after setting up API install the library dependencies for this repo. 
Run this command inside the repo folder:

```bash
npm install
```

To verify that it is setup correctly, run in your terminal for repo:

```bash
npm start
```

Go to `http://localhost:3000/`

## Challenges

* trying to whittle down our broad idea into feasible pieces
* improve UI but also stick to MVP under the tight time frame
* use different environment for our application (test and development)
* finding a suitable solution to reach our MVP when we reached dead ends

## Wins

* Great teamwork experience!
* Implement a new testing library within the timeframe allotted, and still product high quality code with tech such as React hooks. 
* Building out our own back-end and deploy
* Improved UI accessibility including Mobile Responsive Design
* Being able to have productive discussions without sacrificing friendships
* Team work!Not settling on solutions or fixes that only fixed the problem. We continuously strived to find the BEST solution available

## ScreenShots and Demos

---

### Welcome Page

<details>
  <summary>Under the Hood</summary>

Welcome page is designed to invite users to our website and provide a small description about our idea.

</details>

---

### Main Page

<img width="800" alt="main-page" src="https://user-images.githubusercontent.com/66269306/104394230-6bfdf380-5503-11eb-84c5-e218fea43ad5.png">

<details>
  <summary>Under the Hood</summary>

The main page consists of two parts:

* User's Profile
* All upcoming events

User's profile has the following elements:

* Profile picture
* User name
* Rating
* Total hours volunteered
* Upcomings jobs

Sidebar can be hidden

![hiding-sidebar](https://media.giphy.com/media/V0IqXzgmbXQHo3Y6bI/giphy.gif)

Note: Right now rating is just an image. In the future it suppose to reflect user's updated rating after completed volunteered job

Upcoming jobs are interactive and redirect users to a single event page where they can see detailed information about the event

Postings's page has the following elelemts and funtionality:

Elements:

* List of the events with the open positions that contain:
  * Event name
  * Organization Name
  * Date
  * Number of open positions

Functionality:

* Search by keyword
* Filter by available categories
* Sort by date in ascending/descending order

Every Event can be clicked by user and redirected to the single event page to get more details about the chosen event.

![postings](https://media.giphy.com/media/rd1hAn1HIhtaxAtSpO/giphy.gif)

</details>

---

### Single Event Page

<img width="800" alt="main-page" src="https://user-images.githubusercontent.com/66269306/104394498-fb0b0b80-5503-11eb-88c6-bdfb9c83eca7.png">

<details>
  <summary>Under the Hood</summary>

This page includes the following details:

* Event Name
* Event description
* Location
* Duration
* Category
* Organization name
* Date
* List of open positions:
  * Position name
  * Open spots

On this page users are able to choose a position they would like to sign up for. By clicking on "Sign me up!" button, users accept the job and no longer able to sign up for this event again. The change reflects on the open spots number and the list of the upcoming jobs on the user profile.

![signing-up](https://media.giphy.com/media/Vr8DjFDg62sHQwCo7P/giphy.gif)

</details>

---

## Roadmap

* In the future every user can be a volunteer and an organizer of events
* Every user can leave feedback for another user by leaving a review or giving a star rating
* Organizers have an access to all signed up volunteers when the event starts
* Organizers can check in and check out volunteers. By doing so, the volunteered hours get registered on the volunteer profile
* Be able to login on the website by
* Solve security issue

## Credits

<img src="https://avatars1.githubusercontent.com/u/67164959?s=460&u=310e4e6d6122c9344036dfc4d06e39bcc7dd876b&v=4" alt="styling wizard"
 width="150" height="auto" />\

**Cooper Terrones**
[GitHub Profile](https://github.com/coopterrones)

<img src="https://avatars2.githubusercontent.com/u/68085997?s=460&u=a632625a079a0ed8f6f0d7adb4820e82a0d24d48&v=4" alt="wonder woman"
 width="150" height="auto" />\

**Elle Li**
[GitHub Profile](https://github.com/Elle624)

<img src="https://avatars0.githubusercontent.com/u/66269306?s=400&u=b59f8ccc1002269319d952aa028ee270629b2ead&v=4" alt="Olga Morgan"
 width="150" height="auto" />\

**Olga Morgan**
[GitHub Profile](https://github.com/scripka)
