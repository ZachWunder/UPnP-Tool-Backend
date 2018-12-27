# UPnP Tool Backend Documentation

## What is this?

The backend for the UPnP-Tool.

## Setup

1. Clone repository
2. Move to directory, then run "npm install"
3. To start development environment, run "npm start"

## Routes:

- GET /getDevices
	- Returns: Array of Device Info Objects
	- Device Info Object: URL, Name, MACAddress etc..
- GET /getDeviceServices/URL
	- Returns:  Array of service objects from device at URL
- GET /getDeviceActions/SCPDURL
	- Returns: Array of action objects from device at SCPDURL
