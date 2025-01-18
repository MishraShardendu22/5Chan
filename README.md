# [5-Chan](https://5-chan-shardendu-mishra.vercel.app)


A feedback platform where users can share and receive feedback in a safe and structured manner. Non-logged-in users can leave feedback for others, while logged-in users can receive feedback after a verification process using OTP (One-Time Password) during signup.

## Live Demo
Check out the live demo of the project [5-Chan](https://5-chan-shardendu-mishra.vercel.app)

## Features
- **Non-Logged-In Users:** Can provide feedback for other users.
- **Logged-In Users:** Can receive feedback after completing OTP verification during signup.
- **OTP Verification:** Ensures that only verified users can receive feedback.
- **Username Management:** If a logged-in user is not verified, their username can be taken away.
  
## Tech Stack
The platform is built using the following technologies:
- **Frontend:** 
  - Next.js
  - React
  - Tailwind CSS
  - Embla Carousel (for showcasing feedback)
- **Backend:**
  - NodeMailer (for OTP-based email verification)
  - Gemini API (for integration with LLM)
  - ZOD (as a Schema Validation Library)
- **Testing:**
  - Postman (for API testing)

## Setup Instructions

### Prerequisites
Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Postman](https://www.postman.com/) (for API testing)
  
### Steps to Run the Application Locally

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/5-chan.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 5-chan
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory and configure the following environment variables:
     - `NEXT_PUBLIC_API_URL` - API endpoint URL
     - `NEXT_PUBLIC_GEMINI_API_KEY` - Gemini API key for LLM integration
     - `NODEMAILER_USER` - Your NodeMailer email account
     - `NODEMAILER_PASS` - Password for NodeMailer account

5. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the app on `http://localhost:3000`.

6. Open the app in your browser and test the functionality.

## How It Works

- **Feedback Mechanism:** 
  - Users can provide feedback on other users' profiles, even if they are not logged in.
  - Logged-in users can view feedback only after confirming their identity via OTP.

- **OTP Verification Process:**
  - Upon signup, users will receive an OTP email.
  - If the user fails to verify their email, their username will be temporarily removed until verified.

- **LLM Integration:** 
  - The Gemini API integrates a Language Learning Model to provide an interactive and personalized feedback experience.

## Contributing

We welcome contributions! If you want to contribute to this project, please fork the repository and create a pull request with a detailed description of the changes. Make sure to follow the project's coding standards.


Thanks for checking out 5-Chan. We hope you enjoy using it!
