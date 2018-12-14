const dgram = require("dgram"); // dgram is UDP

// M-SEARCH for 2 seconds then close. Return all found devices
const discoverDevices = () => {
    return new Promise(function(resolve, reject) {
        try {
            const socket = dgram.createSocket("udp4");

            const msearch = new Buffer(
                "M-SEARCH * HTTP/1.1\r\n" +
                    "HOST:239.255.255.250:1900\r\n" +
                    "ST:upnp:rootdevice\r\n" +
                    "MX:2\r\n" +
                    'MAN:"ssdp:discover"\r\n' +
                    "\r\n"
            );

            let devices = [];

            socket.on("listening", () => {
                socket.addMembership("239.255.255.250");
                socket.send(
                    msearch,
                    0,
                    msearch.length,
                    1900,
                    "239.255.255.250"
                );
            });
            socket.on("message", message => {
                devices.push(message.toString());
            });
            socket.bind(1900);

            setTimeout(() => {
                socket.removeAllListeners();
                socket.close();
                if (devices.length > 0) {
                    resolve(devices);
                } else {
                    reject("No devices found");
                }
            }, 2500);
        } catch (e) {
            reject(e);
        }
    });
};

// Parse device location from msearch
// RETURNS: Array of device URL's
const getDeviceURLs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const devices = await discoverDevices();
            let locations = [];

            for (let device of devices) {
                let deviceInfo = device.split("\r\n");
                for (let infoLine of deviceInfo) {
                    if (infoLine.substring(0, 8) === "LOCATION") {
                        // Push only the URL of LOCATION
                        locations.push(infoLine.substring(10));
                    }
                }
            }
            resolve(locations);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = getDeviceURLs;
