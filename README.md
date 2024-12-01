# Form-Web
A fullstack responsive form application built with Flask (backend) and React (frontend) using Material-UI.

## Features
- Responsive form design (web, tablet, mobile).
- Form validation (frontend and backend).
- Next screen displays submitted data.
- API integration for form submission.

## Tech Stack
- **Frontend**: React, Material-UI
- **Backend**: Flask (Python)

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/username/form-web.git
```
2. Setup the backend:
```bash
cd form-web/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask flask-cors
flask run
```
3. Setup the frontend:
```bash
cd ../frontend
npm install
npm start
```