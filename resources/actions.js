const soapRequest = require("easy-soap-request");

const sendAction = (controlURL, serviceType, actionName, paramList) => {
    return new Promise(async function(resolve, reject) {
        try {
            const headers = {
                "user-agent": "UPnPTool",
                "Content-Type": "text/xml;charset=UTF-8",
                soapAction: serviceType + "#" + actionName
            };
            console.log(paramList);

            if (paramList.length > 1) {
                const parameters = paramList.map(param => {
                    return `<${param.argName}>${param.argValue}</${
                        param.argName
                    }>\n`;
                });
            } else if (paramList.length === 1) {
                const parameters = `<${paramList.argName}>${
                    paramList.argValue
                }</${paramList.argName}>`;
            } else {
                const parameters = "";
            }

            let xmlParamString = "";
            if (parameters.length) {
                parameters.forEach(xmlParameter => {
                    xmlParamString += xmlParameter;
                });
            }

            const xml = `<s:Envelope
                            xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
                            s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                            <soapenv:Body>
                                <u:${actionName} xmlns:u=${serviceType}>
                                    ${xmlParamString}
                                </u:actionName>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

            const { response } = await soapRequest(controlURL, headers, xml);
            const { body, statusCode } = response;
            console.log(statusCode);
            console.log(body);
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = sendAction;
