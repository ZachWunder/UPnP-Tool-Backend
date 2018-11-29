# UPnP Tool Backend Documentation

## What is this?

The backend for the UPnP-Tool.

## Setup

Clone repository, then run "npm start" to launch.

## Routes:

- GET /getDevices
	- Returns: Array of Device Info Objects
	- Device Info Object: URL, Name, MACAddress etc..
- GET /getDeviceServices/URL
	- Returns:  Array of service objects from device at URL
- GET /getDeviceActions/SCPDURL
	- Returns: Array of action objects from device at SCPDURL
