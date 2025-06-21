const mockUsers = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    gender: "Male",
    dob: "1990-05-14",
    email: "john.doe@example.com",
    residence: "12345",
    idNumber: "12345678901234",
    password: "Strong@123", // Matches validation: >=6 chars, upper, lower, number, symbol
  },
  {
    id: 2,
    name: "Jane",
    surname: "Smith",
    gender: "Female",
    dob: "1985-10-30",
    email: "jane.smith@example.com",
    residence: "67890",
    idNumber: "98765432109876",
    password: "Password1!", // Valid format
  },
  {
    id: 3,
    name: "Alex",
    surname: "Taylor",
    gender: "Other",
    dob: "2000-01-01",
    email: "alex.taylor@example.com",
    residence: "45678",
    idNumber: "12312312312312",
    password: "AlexT@2024", 
  }
];

export default mockUsers;
