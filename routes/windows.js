let express = require("express");
let router = express.Router();

const { Software, validateSoftwareArray } = require("../models/software");
const { ipAddress, validateIPArray } = require("../models/ip");
const { macAddress, validateMACArray } = require("../models/mac");
const { adminLocal, validateAdminArray } = require("../models/admin-local");
const { service, validateServicesArray } = require("../models/service");
const { firewall, validateFirewallArray } = require("../models/firewall");

function getDate() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let today = month.toString() + "-" + day.toString() + "-" + year.toString();
  return today;
}

const parseDate = date => {
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6, 8);
  date = month.concat("-", day, "-", year);
  return date;
};

router.get("/", async (req, res) => {
  res.send("Welcome to Windows fools!");
});

router.post("/local-admin/:computer", async (req, res) => {
  let admins = req.body;
  let hostname = req.params.computer;
  hostname = hostname.toLowerCase();

  let arrayResult = validateAdminArray(admins);

  if (!arrayResult.error) {
    let adminsToAdd = new adminLocal({
      hostname: hostname,
      dateAdded: getDate(),
      adminCount: Object.keys(admins).length,
      admins: admins
    });

    try {
      let admins = await adminsToAdd.save();
      console.log(admins);
      res.send(admins);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(arrayResult.error);
  }
});

router.post("/firewall/:computer", async (req, res) => {
  let firewalls = req.body;
  let hostname = req.params.computer;
  hostname = hostname.toLowerCase();

  // 0 = Disabled
  // 1 = Enabled 

  firewalls.forEach(firewall => {
    if (firewall.Enabled == 0) {
      firewall.Enabled = false;
    } else if (firewall.Enabled == 1) {
      firewall.Enabled = true;
    } else {
      firewall.Enabled = "Unknown";
    }
  });

  let arrayResult = validateFirewallArray(firewalls);

  if (!arrayResult.error) {
    // res.send("The firewall was clean");

    let firewallToAdd = new firewall({
      hostname: hostname,
      dateAdded: getDate(),
      firewalls: firewalls
    });

    try {
      let firewalls = await firewallToAdd.save();
      res.send(firewalls);
    } catch (error) {
      res.send(error);
    }
  } else {
    // console.log(arrayResult.error);
    res.send(arrayResult.error);
  }
});

router.post("/ip/:computer", async (req, res) => {
  let ips = req.body;
  let hostname = req.params.computer;
  hostname = hostname.toLowerCase();

  let arrayResult = validateIPArray(ips);

  if (!arrayResult.error) {
    let ipAddressToAdd = new ipAddress({
      hostname: hostname,
      dateAdded: getDate(),
      ips: ips
    });

    try {
      let ips = await ipAddressToAdd.save();
      res.send(ips)
      console.log(ips);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(arrayResult.error);
  }
});

router.post("/mac/:computer", async (req, res) => {
  let macs = req.body;
  let hostname = req.params.computer;
  hostname = hostname.toLowerCase();

  let arrayResult = validateMACArray(macs);

  if (!arrayResult.error) {
    let macAddressToAdd = new macAddress({
      hostname: hostname,
      dateAdded: getDate(),
      macs: macs
    });

    try {
      let macs = await macAddressToAdd.save();
      console.log(macs);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(arrayResult.error);
  }
});

router.post("/service/:computer", async (req, res) => {
  let services = req.body;
  let hostname = req.params.computer;
  hostname = hostname.toLowerCase();

  services.forEach(service => {
    if (service.Status == 1) {
      service.Status = "Stopped";
    } else if (service.Status == 4) {
      service.Status = "Started";
    } else {
      service.Status = "Unknown";
    }
  });

  let arrayResult = validateServicesArray(services);

  if (!arrayResult.error) {
    let serviceToAdd = new service({
      hostname: hostname,
      dateAdded: getDate(),
      serviceCount: Object.keys(services).length,
      services: services
    });

    try {
      let services = await serviceToAdd.save();
      res.send(services);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    res.send(arrayResult.error);
  }
});

router.post("/software/:computer", async (req, res) => {
  let softwares = req.body;

  softwares.forEach(software => {
    if (software.InstallDate == null) {
      software.InstallDate = "2000-01-01 01:00:00.000";
    }
    software.InstallDate = parseDate(software.InstallDate);
  });

  let arrayResult = validateSoftwareArray(softwares);

  if (!arrayResult.error) {
    let hostname = req.params.computer;
    hostname = hostname.toLowerCase();

    try {
      let softwareToAdd = new Software({
        hostname: hostname,
        dateAdded: getDate(),
        software: softwares
      });

      let softwareResult = await softwareToAdd.save();
      console.log(softwareResult);
      res.send(softwareResult);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send(arrayResult.error);
  }
});

module.exports = router;
