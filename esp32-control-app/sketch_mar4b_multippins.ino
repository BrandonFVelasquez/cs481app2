#include <WiFi.h>

const char* ssid = "WifiName";     // Replace with your Wi-Fi network SSID
const char* password = "WifiPassword"; // Replace with your Wi-Fi network password
WiFiServer server(80);

bool pinState2 = LOW; // Track the state of GPIO 2
bool pinState3 = LOW; // Track the state of GPIO 3
bool pinState6 = LOW; // Track the state of GPIO 6
bool pinState7 = LOW; // Track the state of GPIO 7

void setup() {
  Serial.begin(115200);
  
  // Set GPIO pins as outputs
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  
  // Initialize GPIO pins to LOW
  digitalWrite(2, pinState2);
  digitalWrite(3, pinState3);
  digitalWrite(6, pinState6);
  digitalWrite(7, pinState7);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP()); // Print the local IP address
  
  // Start the server
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New Client.");
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        if (c == '\n') {
          if (currentLine.length() == 0) {
            // Respond to HTTP request
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            client.println();
            break;
          } else { 
            currentLine = "";
          }
        } else if (c != '\r') { 
          currentLine += c; 
        }

        // Handle GPIO control commands
        if (currentLine.endsWith("GET /togglePin2")) {
          pinState2 = !pinState2; // Toggle the state
          digitalWrite(2, pinState2); // Apply the new state
          Serial.println(pinState2 ? "GPIO 2 set HIGH" : "GPIO 2 set LOW");
        }
        if (currentLine.endsWith("GET /togglePin3")) {
          pinState3 = !pinState3; // Toggle the state
          digitalWrite(3, pinState3); // Apply the new state
          Serial.println(pinState3 ? "GPIO 3 set HIGH" : "GPIO 3 set LOW");
        }
        if (currentLine.endsWith("GET /togglePin6")) {
          pinState6 = !pinState6; // Toggle the state
          digitalWrite(6, pinState6); // Apply the new state
          Serial.println(pinState6 ? "GPIO 6 set HIGH" : "GPIO 6 set LOW");
        }
        if (currentLine.endsWith("GET /togglePin7")) {
          pinState7 = !pinState7; // Toggle the state
          digitalWrite(7, pinState7); // Apply the new state
          Serial.println(pinState7 ? "GPIO 7 set HIGH" : "GPIO 7 set LOW");
        }
      }
    }
    client.stop();
    Serial.println("Client Disconnected.");
  }
}
