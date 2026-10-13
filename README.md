# Brahmaverse AI

A full-stack project with a React frontend designed from a provided Figma reference and a REST API for a customer relationship management (CRM) system. The frontend and backend are deployed separately and are not currently connected to each other.

## Project Overview

- **Frontend:** React, TypeScript, and Tailwind CSS. The UI follows the supplied mobile app design, with a focus on a pixel-perfect implementation.
- **Backend:** Node.js, Express, and MongoDB. Provides employee registration and login, public enquiry submission, and counselor lead management APIs secured with JWT where required.

## Frontend Snapshots

<img width="468" height="906" alt="image" src="https://github.com/user-attachments/assets/e81502e5-3276-477c-ada9-f569d79d66c8" />
<img width="465" height="906" alt="image" src="https://github.com/user-attachments/assets/96320c94-bcbe-4ef9-91af-9e97eb42c474" />
<img width="465" height="907" alt="image" src="https://github.com/user-attachments/assets/db2f7a20-bd2b-4860-a980-0861bff95d5d" />
<img width="465" height="907" alt="image" src="https://github.com/user-attachments/assets/c018cc2d-488c-4436-ba7b-f179c66f36f2" />

## Deployments

- **Frontend:** [https://brahmaverse-ai-1.onrender.com/](https://brahmaverse-ai-1.onrender.com/)
- **Backend:** [https://brahmaverse-ai-tugv.onrender.com/](https://brahmaverse-ai-tugv.onrender.com/)

## Project Structure

```text
Brahmaverse-AI/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Enquiry.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── enquiry.js
│   ├── index.js
│   ├── package.json
│   └── test_endpoints.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── NumPad.tsx
│   │   ├── pages/
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── OtpPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── SignUpPage.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

To create a production build, run `npm run build` from the `frontend` directory.

## Backend Setup

```bash
cd backend
npm install
```

Create a `backend/.env` file with your MongoDB connection string and a secret for signing JWTs:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the API with `npm run dev` for development or `npm start` for production. Run the endpoint tests with `npm test`.

## API Endpoints

Use the backend deployment URL as the base URL in production, or `http://localhost:3000` for local development. Protected endpoints require `Authorization: Bearer <token>` from employee registration or login.

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/health` | Check API health. | Public |
| `POST` | `/api/auth/register` | Register an employee and return a JWT. | Public |
| `POST` | `/api/auth/login` | Log in an employee and return a JWT. | Public |
| `POST` | `/api/enquiries/public` | Submit a prospective client's enquiry. | Public |
| `GET` | `/api/enquiries/unclaimed` | List enquiries available for counselors to claim. | JWT required |
| `PATCH` | `/api/enquiries/:id/claim` | Claim an enquiry for the authenticated counselor. | JWT required |
| `GET` | `/api/enquiries/claimed` | List enquiries claimed by the authenticated counselor. | JWT required |

The API also accepts `POST /api/enquiries` for enquiry submission, `GET /api/enquiries/public` for unclaimed enquiries, `POST /api/enquiries/:id/claim` for claiming, and `GET /api/enquiries/my-leads` for the counselor's claimed enquiries.
