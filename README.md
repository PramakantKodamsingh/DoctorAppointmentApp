<h1>Doctor Appointment System</h1>
A MERN stack application that allows users to book doctor appointments and manage their profiles. Doctors receive appointment notifications, and the admin has full control over the system.

<br>
<span style="color:green;">Features</span>
<ul> <li><strong>User-Friendly Interface</strong>: <ul> <li>Any user can register and book appointments.</li> <li>Browse through available doctor profiles with detailed information such as: <ul> <li>Specialization</li> <li>Fees</li> <li>Experience</li> <li>Availability</li> </ul> </li> </ul> </li> <li><strong>Doctor Appointment Scheduling</strong>: <ul> <li>Users can book appointments with their preferred doctor.</li> <li>Real-time availability of doctors is displayed for seamless booking.</li> </ul> </li> <li><strong>Notification System</strong>: <ul> <li>Doctors receive notifications when someone tries to book an appointment.</li> <li>Users get notifications when a doctor confirms their booking.</li> </ul> </li> <li><strong>Admin Panel</strong>: <ul> <li>Admins can manage doctor applications and user data.</li> <li>Admins have the ability to approve/reject doctors and block/unblock users.</li> </ul> </li> </ul> <br>
Tech Stack
<ul> <li><strong>Frontend</strong>: React, HTML, CSS, JavaScript</li> <li><strong>Backend</strong>: Node.js, Express.js</li> <li><strong>Database</strong>: MongoDB</li> <li><strong>Notifications</strong>: Real-time notifications for users and doctors</li> <li><strong>State Management</strong>: React Hooks (<code>useState</code>, <code>useEffect</code>)</li> </ul> <br>
Installation and Setup
To run the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/doctor-appointment-system.git
Navigate to the project directory:

bash
Copy code
cd doctor-appointment-system
Install the dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

env
Copy code
PORT=8080
MONGO_URL=mongodb://localhost:27017/doctorAppointment
Run the backend server:

bash
Copy code
npm run server
Start the frontend:

bash
Copy code
npm run start
Open your browser at:

bash
Copy code
http://localhost:3000
<br>
Admin Panel
Admins can log in at the /admin route to manage the following:

<ul> <li>Review and approve doctor applications</li> <li>Access user and doctor data</li> <li>Block or unblock users if necessary</li> </ul> <br>
Upcoming Features
<ul> <li>Payment integration for appointment bookings</li> <li>Google Calendar sync for automatic scheduling</li> <li>Enhanced admin reporting for better analytics</li> </ul>
