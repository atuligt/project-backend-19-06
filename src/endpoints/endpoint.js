const express = require("express");
const route = express.Router();
require("dotenv").config();
const usersData = require("../users/users");



route.get("/Find_max_number_of_direct_reports", async (req, res) => {
  try {
    const users = usersData.users;
    const reports = usersData.reports;

    const directReportsCount = {};

    reports.forEach((report) => {
      directReportsCount[report.role] = {
        count: 0,
        roleName: report.role, // Store the name of the role
      };
    });

    // Count direct reports for each manager
    users.forEach((user) => {
      if (user.role === "developer") {
        const supervisorRole = findSupervisor(user.role);
        if (supervisorRole && directReportsCount[supervisorRole]) {
          directReportsCount[supervisorRole].count++;
        }
      }
    });

    // Find the maximum number of direct reports
    let maxDirectReports = 0;
    let maxReportsRole = null;

    Object.values(directReportsCount).forEach((roleInfo) => {
      if (roleInfo.count > maxDirectReports) {
        maxDirectReports = roleInfo.count;
        maxReportsRole = roleInfo.roleName;
      }
    });

    console.log(
      `Maximum number of reports (${maxDirectReports}) is for role '${maxReportsRole}'.`
    );

    function findSupervisor(role) {
      const report = reports.find((report) => report.role === role);
      return report ? report.superviser : null;
    }

    res.json(maxDirectReports);


  } catch (error) {
    console.log(error);
  }
});

route.get("/Find_common_manager", (req,res) => {
  try {
    const reports = usersData.reports;
    const obj = {};
    reports.forEach((element) => {
      if (obj.hasOwnProperty(element.superviser)) {
        obj[element.superviser] = [...obj[element.superviser], element.role];
      } else {
        obj[element.superviser] = [element.role];
      }
    });
    const users = usersData.users;
    console.log(obj);

    function findLowestCommonAncestor(node1, node2) {
      // Helper function to perform DFS and find ancestors of a node
      function findAncestors(node, ancestors = []) {
        for (const parent in obj) {
          if (obj[parent].includes(node)) {
            ancestors.push(parent);
            findAncestors(parent, ancestors);
          }
        }
        return ancestors;
      }

      const ancestors1 = findAncestors(node1);
      const ancestors2 = findAncestors(node2);

      // Find the lowest common ancestor
      let lca = null;
      for (let i = 0; i < ancestors1.length; i++) {
        if (ancestors2.includes(ancestors1[i])) {
          lca = ancestors1[i];
          break;
        }
      }

      return lca;
    }


    const role1 = "developer";
    const role2 = "sr,developer";
    const lowestCommonAncestor = findLowestCommonAncestor(role1, role2);
    console.log(lowestCommonAncestor);
    res.json(lowestCommonAncestor);
  } catch (error) {
    console.log(error);
  }
});


route.get("/get-employess-reporting-to-manager", (req, res)=>{
  try {
    
    const reports = usersData.reports;
    const users = usersData.users;
   


function getUsersReportingToManager() {

  const managerRole = "manager";

  const reportingUsers = users.filter(user => {
    const report = reports.find(report => report.role === user.role);
    return report && report.superviser === managerRole;
  });

  return reportingUsers;
}

const usersReportingToManager = getUsersReportingToManager();
console.log("Users reporting to the manager:");
console.log(usersReportingToManager);
res.json(usersReportingToManager);


  } catch (error) {
    console.log(error);
  }
})


module.exports = route;
