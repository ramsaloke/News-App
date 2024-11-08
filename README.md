
# React News App

A simple React app that fetches and displays the latest news headlines and articles using the NewsAPI. The app allows users to search for news articles by keyword and view detailed information by clicking on news cards. It’s built with React and styled using custom CSS.

Features:

Display top news headlines from the US.
Search news articles based on a keyword query.
Responsive layout for different screen sizes.
Fallback image and description handling if data is missing.
Click on a news card to open the full article.

Technologies Used:

React: JavaScript library for building user interfaces.
Vite: A fast development server and build tool.
NewsAPI: Provides news data for fetching top headlines and articles.
CSS: Custom styling for the application.
Setup Instructions
Clone this repository to your local machine:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd news-app
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open your browser and visit http://localhost:3000 to see the app in action.

Environment Variables
You need to create a .env file in the root directory with your NewsAPI key:

env
Copy code
VITE_API_KEY=your-newsapi-key

License:
This project is open-source and available under the MIT License.
