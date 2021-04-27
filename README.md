# bug-tracker-api
A simple bug tracker/lister api developed with node, express and mongodb for educational and sample purposes.

# How to Setup the Server
1. Start mongodb server
2.	Clone the repository
3.	Enter command: **`npm install`**
4.	Create **config** folder in the project root directory
5.	Create **dev.env** file inside the config folder
6.	Inside the *dev.env* file, enter the environment variables.

a.	MONGODB_URL - The URL of the mongodb server running on the machine.

    mongodb:// 		- The protocol.
    127.0.0.1:27017	- The URL of the mongodb server and its port number.
    /bugtracker		- The name of the database
b.	PORT – The port number which will be used to host the backend server.

c.	JWT_SECRET – Secret key used for user authentication and creation of the Token.

7.	Start the server by entering the command: **`npm run dev`**

