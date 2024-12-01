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

## Local Setup Instructions
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

## Deployment Setup Instructions (VPS)
# Prerequisites
- Ensure you have a VPS and a domain or public IP address.
- Install Python, Node.js, and Nginx.

# Steps
1. Clone the repository:
```bash
git clone https://github.com/username/form-web.git
```
2. Modify configuration files:
   1. Update the backend server to bind to all interfaces:
      - Open `run.py` and replace:
        ```python
        app.run(host='0.0.0.0', port=5000)
        ```
   2. Update the frontend API endpoint:
      - Open frontend/src/components/Form.js and update the domain or IP address to your own.
3. Setup Python backend:
   1. Install `virtualenv` and create a virtual environment:
      ```bash
      sudo pip3 install virtualenv
      virtualenv env
      source env/bin/activate
      ```
   2. Install backend dependencies:
      ```bash
      pip3 install flask gunicorn
      ```
   3. Create a systemd service file for the backend:
      - Create service file:
        ```bash
        sudo nano /etc/systemd/system/app.service
        ```
      - Paste the following:
        ```bash
        [Unit]
        Description=Gunicorn instance to serve form-web
        After=network.target

        [Service]
        User=your-user
        Group=www-data
        WorkingDirectory=/home/your-user/form-web/backend
        Environment="PATH=/home/your-user/form-web/backend/venv/bin"
        ExecStart=/home/your-user/form-web/backend/venv/bin/gunicorn --workers 3 --bind unix:app.sock -m 007 run:app

        [Install]
        WantedBy=multi-user.target
        ```
   5. Start and enable the backend service:
      ```bash
      sudo systemctl start app
      sudo systemctl enable app
      ```
5. Build and deploy the frontend:
   1. Build the React frontend:
      ```bash
      cd frontend
      npm run build
      ```
   2. Copy the build files to the web server directory:
      ```bash
      sudo cp -r build/* /var/www/html/
      ```
6. Configure Nginx:
   1. Create a new Nginx configuration file:
      ```bash
      sudo nano /etc/nginx/sites-available/app
      ```
   2. Paste the following:
      ```bash
      server {
          listen 80;
          server_name your-ip-or-domain;

          root /var/www/html;
          index index.html index.htm;

          location / {
              try_files $uri /index.html;
          }

          location /api {
              rewrite ^/api/(.*) /$1 break;
              include proxy_params;
              proxy_pass http://unix:/home/harissabil/form-web/backend/app.sock;
          }
      }
      ```
   3. Enable the site and test the configuration:
      ```bash
      sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
      sudo nginx -t
      ```
   4. Adjust permissions:
      ```bash
      sudo chmod 775 -R /home/your-user/form-web
      ```
   5. Restart Nginx:
      ```bash
      sudo systemctl restart nginx
      ```
The application should now be accessible via your VPS's domain or IP address.
