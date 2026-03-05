let result = '';

function getParameterValue(keys) {
    for (let key of keys) {
        let d = declare(key, { path: Date.now() - (120 * 1000), value: Date.now() });
        for (let item of d) {
            if ((item.value && item.value[0] == "PPPoE_Bridged") || (item.value && item.value[0] == "IP_Bridged")) {
                return "✅";
            }
        }
    }

    return "❌";
}

// Check TR-098 first
let tr098Wan = declare("InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig.WANAccessType", { value: 1 });
if (tr098Wan.size && tr098Wan.value && tr098Wan.value[0] && tr098Wan.value[0] != "Ethernet") {
    let keys = [
        'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.*.WANPPPConnection.*.ConnectionType',
        'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.*.WANIPConnection.*.ConnectionType'
    ];

    result = getParameterValue(keys);
} else {
    // TR-181 TP-Link — check if any IP.Interface has bridge mode
    let tpConnTypes = declare("Device.IP.Interface.*.X_TP_ConnType", { value: Date.now() });
    let hasBridge = false;
    for (let item of tpConnTypes) {
        if (item.value && (item.value[0] === "Bridge" || item.value[0] === "bridge")) {
            hasBridge = true;
            break;
        }
    }
    if (hasBridge) {
        result = "✅";
    } else if (tpConnTypes.size) {
        result = "❌";
    } else {
        result = "❓";
    }
}

return { writable: false, value: [result, "xsd:string"] };