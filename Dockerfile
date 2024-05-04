# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install numpy

# Set default environment variables
ENV GRID_SIZE 5

# Run app.py when the container launches
CMD ["python", "prototype.py"]