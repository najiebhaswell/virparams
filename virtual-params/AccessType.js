let accesstype = "UNKNOWN";
let now = Date.now();

// Try TR-098 first
let tr098 = declare("InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig.WANAccessType", { path: now, value: now });
if (tr098.size && tr098.value && tr098.value[0]) {
    accesstype = tr098.value[0];
} else {
    // TR-181 TP-Link — check PON mode
    let tpPon = declare("Device.Optical.Interface.1.X_TP_GPON_Config.PonMode", { path: now, value: now });
    if (tpPon.size && tpPon.value && tpPon.value[0]) {
        accesstype = tpPon.value[0]; // Returns "GPON" or "EPON"
    } else {
        // Generic TR-181 optical check
        let optical = declare("Device.Optical.Interface.1.Status", { path: now, value: now });
        if (optical.size && optical.value && optical.value[0] === "Up") {
            accesstype = "PON";
        }
    }
}

return { writable: false, value: [accesstype, "xsd:string"] };