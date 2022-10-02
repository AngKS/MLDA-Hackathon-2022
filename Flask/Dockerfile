
FROM python:latest
#update the packages installed in the image
RUN apt-get update -y
# Make a app directory to contain our application
RUN mkdir /app
# Copy every files and folder into the app folder
COPY . /app
# Change our working directory to app fold
WORKDIR /app
# Install all the packages needed to run our web app
RUN pip install -r requirements.txt
# Add every files and folder into the app folder 
ADD . /app
# Expose port 5000 for http communication
EXPOSE 5000
# Run gunicorn web server and binds it to the port
# CMD gunicorn --bind 0.0.0.0:5000 app:app
CMD gunicorn --bind 0.0.0.0:$PORT app:app

