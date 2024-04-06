# Everything about our App

Begin by going into the esp32-control-app directory. From here you can use the command npm start.
This will create a localhost webpage with our app, that can be run locally. From here you can use
any of the buttons, the only current functioning button is the play button. By clicking the play button
it will send a signal to the microcontroller.

In the homepage.js file under components, you may need to adjust lines:

const response = await axios.get('http://192.168.0.102/play');
const response = await axios.get(`http://192.168.0.102/${command}`);

To the ip of the MC given in the Arduino File.



# Everything about our Microcontroller

To have the app work properly you need to set up and initalize the ESP32C3 correctly using the Arduino IDE,
perferablly. The file to run for the microcontroller in Ardunio is also located in this folder under the name
'sketch_mar4b.ino'. After running it by clicking upload in the Ardunio IDE, you can go to the 
tools tab on the top and open the Serial monitor. In this terminal you can see the 'Play' button sending signals 
to the microcontroller via WiFi.

The current Ardunio file is programmed to send positive and negative singals to GPIO port 2 on the MC but will
need to be adjusted in the future for specific needs. For the Arduinio File to run properly put in the same WiFi
creditials that yo uare using for the app.

# Running everything together

Simply run the Arduino IDE and keep it open, this will allow the microcontroller to recieve signals via WiFi.
Run the 'npm start' command in the esp32-control-app' directory to open a localhost page with out app.
Now the two can communictate and work together!