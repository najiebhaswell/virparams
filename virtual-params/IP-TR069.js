// Try TR-098 first, then TR-181 — avoid declaring non-existent paths
let param = null;
let manufacturer = declare("DeviceID.Manufacturer", { value: 1 }).value[0];

if (manufacturer === "TP-Link") {
    let tr181 = declare("Device.ManagementServer.ConnectionRequestURL", { value: Date.now() });
    if (tr181.size && tr181.value && tr181.value[0]) {
        param = tr181.value[0];
    }
} else {
    let tr098 = declare("InternetGatewayDevice.ManagementServer.ConnectionRequestURL", { value: Date.now() });
    if (tr098.size && tr098.value && tr098.value[0]) {
        param = tr098.value[0];
    } else {
        let tr181 = declare("Device.ManagementServer.ConnectionRequestURL", { value: Date.now() });
        if (tr181.size && tr181.value && tr181.value[0]) {
            param = tr181.value[0];
        }
    }
}

if (param) {
    let address = param.match(/http?:\/\/([\d.]+)(?::\d+)?/);
    if (address && address[1]) {
        return { writable: false, value: [address[1], "xsd:string"] };
    }
}

return { writable: false, value: ["N/A", "xsd:string"] };