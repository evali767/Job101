# Job101

Job101 is an all-in-one platform dedicated to making job searching easier.


## Key Features
| Feature | Description |
|---------|-------------|
| **Application Tracking** | Dashboard to monitor all job applications |
| **Note-Taking** | Record important details and interview prep for each opportunity |
| **Google Calendar Sync** | Scheduling of interviews and deadlines |
| **Built-In Job Search** | Discover new job opportunities |  

<br />  

This project is a React-based web application with [Firebase](https://console.firebase.google.com/?pli=1) integration. Google Calendar and job searching functionality are implemented using [Google Calendar API](https://developers.google.com/workspace/calendar/api/guides/overview) and [Adzuna API](https://developer.adzuna.com/). 


## Setup

Clone the repository:
```
git clone https://github.com/evali767/Job101.git
cd Job101
```
Navigate to project directory:
```
cd Job101
```
Install dependencies:
```
npm install
```
Set up environment variables:
1. Create a .env file in the root directory
2. Obtain API Keys:
    - [Google Calendar](https://developers.google.com/workspace/calendar/api/guides/overview)
    - [Adzuna](https://developer.adzuna.com/)
    - [Firebase](https://console.firebase.google.com/?pli=1)
3. Update ```.env``` file with your credentials:
    ```
    REACT_APP_APP_KEY=
    REACT_APP_APP_ID=

    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
    ```

Run the app:
```
npm start
```

