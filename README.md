# Setting up
- This project is designed as a raspberry pi project. As such it needs to have data given to it.
- As requested by Dr. Abraham Aldaco, example data and a pdf showing that data have been provided.
- If you run into problems with setting up this data, feel free to reach out to us. 


## Importing data:
- Import data from EXAMPLE_DATABASE.json to MONGO DB database named piData.
- This is will in the necessary data for the website. 
- An example of how it looks in Compass is attached as compass.pdf.


## Adding data: 
- Data is intended to be added using a raspberry pi. On my pi, I have a cron job that runs periodically, gathers the data,
then makes an api call to the backend. (The database is running on the same machine as pi, since we do not have
cloud access in this class.).
- See additional setup for pi set up.
- Data can also be added with the same `/add` api.
- This is done through the form that exists on the website in the Information/Data management page.

## Adding new Plant data
- This data needs to be in a mongodb collection called "plantInfo".
- When adding a new plant, a link to the image for the plant is required. To use a preset image use the link:
- http://127.0.0.1:8081/images/snake.jpeg
- http://127.0.0.1:8081/images/peace.jpeg
- http://127.0.0.1:8081/images/widow.jpeg

## Additional set up
- To add the data on it's own, a cronjob will be needed to gather the data. 
- Assuming your pi has a temperature reader set up, simply direct the cronjob to run however often you want to gather data to the cronjob.py file.
- It will need the same installs as shown in the raspberry pi setup document.
- The cronjob I am using is listed below.
- This runs the job every 30 mintues at hour:05 and hour:35.
- Make sure you set the path to where your file is located.

```cron
0,5 * * * * cd 319stuff/final && /usr/bin/python3 /home/pi/319stuff/final/cronjob.py

```
