let m = "";
let writable = true;

if (args[1].value) {
  m = args[1].value[0];
  try { declare(`InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPLeaseTime`, null, { value: parseInt(m) }); } catch (e) { }
  try { declare(`Device.DHCPv4.Server.Pool.1.LeaseTime`, null, { value: parseInt(m) }); } catch (e) { }
}
else {
  let paths = [
    `InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPLeaseTime`,
    `Device.DHCPv4.Server.Pool.1.LeaseTime`
  ];
  let seconds = 0;
  let found = false;
  for (let p of paths) {
    let d = declare(p, { value: Date.now() });
    if (d.size && d.value[0] !== undefined) {
      seconds = parseInt(d.value[0]);
      found = true;
      break;
    }
  }
  if (found) {
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    m = `${hours}h ${mins}m (${seconds}s)`;
  } else {
    writable = false;
    m = "N/A";
  }
}

return { writable: writable, value: [m, "xsd:string"] };

