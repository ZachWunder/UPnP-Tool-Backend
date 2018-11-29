# UPnP Tool Backend Documentation

## Routes:

- GET /getDevices
	- Returns: Array of Device Info Objects
	- Device Info Object: URL, Name, MACAddress etc..
- GET /getDeviceServices/URL
	- Returns:  Array of service objects from device at URL
- GET /getDeviceActions/SCPDURL
	- Returns: Array of action objects from device at SCPDURL
