# Collaborative Study Platform

## Live Site

[Live Site URL](https://imaginative-chebakia-1dc907.netlify.app/)

## Admin Credentials

- **Email:** arshakib428@gmail.com
- **Password:** 123@Artcell

---

## Features

1. JWT-based authentication and secure token storage in local storage.
2. Role-based access control for Students, Tutors, and Admins.
3. Responsive design for mobile, tablet, and desktop views.
4. Separate dashboards for Students, Tutors, and Admins with tailored features.
5. Paginated views for efficient data display (e.g., study sessions and user lists).
6. CRUD operations with toast notifications and no default browser alerts.
7. Firebase and MongoDB credentials are securely hidden using environment variables.
8. No lorem ipsum text; all content is meaningful and contextually relevant.
9. Integrated TanStack Query for all GET data fetching functionality.
10. Users redirected to the intended page after login when accessing private routes.

---

## Authentication & Authorization

- **User Registration:** Supports Students, Tutors, and Admins with photo uploads.
- **Social Login:** Google and GitHub integration (defaults to Student role for social logins).
- **Middleware:** Ensures only authorized users access protected routes.

---

## Home Page

- **Sections:**
  - Navbar
  - Banner Section
  - Study Sessions Section
  - Tutor Section
  - Footer
- **Navbar:** Dynamic content based on authentication status (Login/Sign-up or Profile/Logout).
- **Study Sessions Section:**
  - Displays 6 cards with pagination.
  - Buttons for "Ongoing" or "Closed" sessions based on registration period.
  - Read More button redirects users to session details.
- **Session Details:**
  - Title, Tutor, Average Rating, Description, Dates, Duration, Fee, Reviews, and Book Now button.
  - Free sessions booked directly; paid sessions proceed to payment.

---

## Student Dashboard

- **View Booked Sessions:** Detailed session info with review and rating option.
- **Create Notes:** Form for title and description; notes saved to database.
- **Manage Notes:** Update and delete personal notes.
- **View Study Materials:** Access materials by booked sessions with download and external link options.

---

## Tutor Dashboard

- **Create Study Session:** Form with fields for session details (e.g., dates, duration, and description).
- **View All Study Sessions:** Paginated list of tutor's sessions with statuses (Pending, Approved, Rejected).
- **Upload Materials:** Add images and links for approved sessions.
- **View All Materials:** Manage uploaded materials with update and delete options.

---

## Admin Dashboard

- **View All Users:** List of users with search functionality by name or email; update roles.
- **View All Study Sessions:**
  - Approve, reject, update, or delete sessions.
  - Modal for rejection reasons and feedback.
- **View All Materials:** Review and remove inappropriate content.

---

## Challenges

- Integrated TanStack Query for all GET requests.
- Paginated views on two different pages.
- JWT implementation with secure local storage.
- Modal popups for session rejection and feedback collection.

---

## Technology Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase, JWT
- **File Hosting:** ImgBB for image uploads
- **Payment Gateway:** Stripe

---

## How to Run the Project

1. Clone the repository: `git clone https://github.com/username/repository-name.git`
2. Install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
