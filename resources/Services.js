const xmlParser = require("xml2json");
const fetch = require("node-fetch");

const getDeviceBodyByURL = require("./deviceInfo").getDeviceBodyByURL;

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
    getDeviceServices: getDeviceServices,
    getServiceActions: getServiceActions
}
