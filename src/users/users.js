 const users = [
  {
    id: 1,
    name: "john",
    role: "developer",
    salary: 4500    
  },
  {
    id: 2,
    name: "nick",
    role: "developer",
    salary: 4000    
  },
  {
    id: 3,
    name: "arun",
    role: "manager",
    salary: 5000
  },
  {
    id: 4,
    name: "wick",
    role: "CTO",
    salary: 5500    
  },
  {
    id: 5,
    name: "nilesh",
    role: "VP",
    salary: 4700    
  },
  {
    id: 6,
    name: "max",
    role: "Sr,manager",
    salary: 4900    
  },
  {
    id: 7,
    name: "sam",
    role: "developer",
    salary: 6500    
  },
  {
    id: 8,
    name: "vaibhav",
    role: "CEO",
    salary: 8500    
  }
]

const reports = [
  {
     role: "developer",
     superviser: "manager"     
  },
  {
    role: "manager",
    superviser: "Sr,manager"
  },
  {
    role: "Sr,manager",
    superviser: "CTO"
  },
  {
    role: "VP",
    superviser: "CEO"
  },
  {
   role: "sr,developer",
   superviser: "manager"
  }
]


module.exports = {users, reports}