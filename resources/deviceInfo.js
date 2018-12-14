const xmlParser = require("xml2json");
const fetch = require("node-fetch");

const getDeviceURLs = require("./deviceDiscovery");

const getAllDeviceBody = () => {
    return new Promise(async function(resolve, reject) {
        try {
            const urls = await getDeviceURLs();

            let devices = [];

            for (let url of urls) {
                let res = await fetch(url);
                let toText = await res.text();
                let body = xmlParser.toJson(toText, { object: true });
                let device = body.root.device;
                device["url"] = url.substring(0, url.lastIndexOf("/"));
                device["setupURL"] = url;

                devices.push(device);
            }
            resolve(devices);
        } catch (e) {
            reject(e);
        }
    });
};

const getDeviceBodyByURL = url => {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await fetch(url);
            let toText = await res.text();
            let body = xmlParser.toJson(toText, { object: true });
            let device = body.root.device;

            resolve(device);
        } catch (e) {
            reject(e);
        }
    });
};

//RETURNS: Array of Device Objects
const getAllDeviceInfo = () => {
    return new Promise(async function(resolve, reject) {
        try {
            const devices = await getAllDeviceBody();

            let deviceInfo = [];

            for (let device of devices) {
                deviceInfo.push({
                    MACAddress: device.macAddress,
                    SerialNumber: device.serialNumber,
                    FirmwareVersion: device.firmwareVersion,
                    UDN: device.UDN,
                    DeviceType: device.deviceType,
                    Name: device.friendlyName,
                    URL: device.url,
                    SetupURL: device.setupURL
                });
            }
            resolve(deviceInfo);
        } catch (e) {
            reject(e);
        }
    });
};

const getDeviceServices = URL => {
    return new Promise(async function(resolve, reject) {
        try {
            const device = await getDeviceBodyByURL(URL);

            let services = [];
            for (let service of device.serviceList.service) {
                let baseURL = URL.substring(0, URL.lastIndexOf("/"));
                service["BaseURL"] = baseURL;
                service["SCPDURL"] = baseURL + service.SCPDURL;

                services.push(service);
            }

            resolve(services);
        } catch (e) {
            reject(e);
        }
    });
};

const getServiceActions = SCPDURL => {
    return new Promise(async function(resolve, reject) {
        try {
            let SCPD = await fetch(SCPDURL);
            let toText = await SCPD.text();
            let body = xmlParser.toJson(toText, { object: true });
            let actionList = body.scpd.actionList.action;
            let serviceStateTable = body.scpd.serviceStateTable.stateVariable;
            let data = {
                actionList: actionList,
                serviceStateTable: serviceStateTable
            };
            resolve(actionList);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllDeviceInfo: getAllDeviceInfo,
    getDeviceServices: getDeviceServices,
    getServiceActions: getServiceActions
}
