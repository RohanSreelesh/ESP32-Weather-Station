# ESP32-Weather-Station
## Description

This project utilizes an ESP32 microcontroller and a DHT22 sensor to record temperature and humidity data, which is then sent to an AWS IoT MQTT broker using the publisher-subscriber model. A server subscribes to the MQTT broker and stores the received data in an SQLite database. The system then generates graphs displaying the temperature and humidity data for the current day, the previous day, and the past week.

[![2023-05-05-19-11-41-Untitled-2-png-Photos.png](https://i.postimg.cc/Kzt64Zm9/2023-05-05-19-11-41-Untitled-2-png-Photos.png)](https://postimg.cc/R6VsDx6f)

## Features

* Records temperature and humidity data using an ESP32 microcontroller and DHT22 sensor
* Sends data to the AWS IOT MQTT broker using the publisher-subscriber model
* Generates graphs showing temperature and humidity data from today, yesterday, and the last week using Chart.js
* Allows for remote monitoring of temperature and humidity data through the web server

## Images
[![IMG-0478.jpg](https://i.postimg.cc/KY5YHCRW/IMG-0478.jpg)](https://postimg.cc/KKRFKq77)
[![2023-05-05-19-22-54-Home-Mozilla-Firefox.png](https://i.postimg.cc/BZX7nTCj/2023-05-05-19-22-54-Home-Mozilla-Firefox.png)](https://postimg.cc/XX6k2ymW)
[![2023-05-05-19-17-44-Temperature-and-Humidity-Chart-Mozilla-Firefox.png](https://i.postimg.cc/k4hb6dwb/2023-05-05-19-17-44-Temperature-and-Humidity-Chart-Mozilla-Firefox.png)](https://postimg.cc/Q91tww28)
[![2023-05-05-19-20-58-Temperature-and-Humidity-Chart-Mozilla-Firefox.png](https://i.postimg.cc/44qcXsYC/2023-05-05-19-20-58-Temperature-and-Humidity-Chart-Mozilla-Firefox.png)](https://postimg.cc/7b1hVv1X)


## Acknowledgements
https://how2electronics.com/connecting-esp32-to-amazon-aws-iot-core-using-mqtt/
