let m = "";
const instanceIndex = '1';

if (args[1].value) {
  m = args[1].value[0];
  declare(`InternetGatewayDevice.LANDevice.1.WLANConfiguration.${instanceIndex}.BeaconType`, null, { value: m });
}
else {
  let ssid1 = declare(`InternetGatewayDevice.LANDevice.1.WLANConfiguration.${instanceIndex}.BeaconType`, { value: Date.now() });
  if (ssid1.size && ssid1.value[0]) {
    m = ssid1.value[0];
  } else {
    // TR-181 TP-Link
    let tr181 = declare(`Device.WiFi.AccessPoint.${instanceIndex}.Security.ModeEnabled`, { value: Date.now() });
    if (tr181.size && tr181.value[0]) {
      m = tr181.value[0];
    }
  }
}

return { writable: true, value: [m, "xsd:string"] };