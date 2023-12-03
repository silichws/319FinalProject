import requests
import json

url = "http://localhost:8081/add"

headers = {
  'Content-Type': 'application/json'
}

#### 
# Follow install steps from in class document
# This is the code that is set as a Cron job to collect data periodically and write the json to a file.
# entries.json will be what the health uses as data
# latest.json is what the home page will use
#
#
####

import time
import board
import adafruit_dht
import subprocess
from datetime import datetime
#Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT22(board.D4)
while True: # Will go until it gets a valid reading to log
	try:
		# Print the values to the serial port
		temperature_c = dhtDevice.temperature
		temperature_f = round(temperature_c * (9 / 5) + 32, 1)
		humidity = dhtDevice.humidity
		
		temp_data = "Temp: "+  str(temperature_f)+ " F | "+ str(humidity) + "%"
		# print(temp_data)

		# print(temp_celsius)
		# print(cpu_temp_f)
		# output to file
		timestamp = datetime.now().strftime("%Y-%b-%d-%H:%M:%S")
		entriesValue = "{\"id\": \"" + timestamp + "\", \"temp\":\"" + str(temperature_f)+ " \",  \"humidity\": \""+ str(humidity) + "\"}," + "\n"

		# with open("cron.txt", "a") as file:
		# 	file.write(entriesValue)
		timestamp = datetime.now().strftime("%Y-%B-%d-%H:%M")
		temp_send = str(temperature_f)
		hum_send = str(humidity) 

		payload = json.dumps({
  			"id": timestamp,
  			"temp": temp_send,
  			"humidity": hum_send
		})
		response = requests.request("POST", url, headers=headers, data=payload)

		 # cron job output gets logged, so I can use this as debugging.
		print(response.text)
		
		break
	except RuntimeError as error:
		# Errors happen fairly often, DHT's are hard to read, just keep going
		# print("Error:", error.args[0], " Trying again")
		continue
print("done");

