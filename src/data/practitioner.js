export const mockPractitioners = [
  {
    id: "p001",
    name: "Thabo",
    surname: "Mokoena",
    gender: "Male",
    email: "thabo@example.com",
    password: "password123",
    jobTitle: "Psychologist",
    idNumber: "8001015009087",
    hpcsa: "HPC123456",
    placesOfWork: ["City Hospital"],
    mentalHealth: true,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 4 },
      { date: "2024-05-02", hours: 8, patients: 6 },
      { date: "2024-05-03", hours: 4, patients: 3 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Follow up with patient John Smith on anxiety therapy." },
      { date: "2024-05-29", text: "Submit weekly treatment report for Wellness Center." },
      { date: "2024-05-30", text: "Review CBT notes for new mental health support group." },
    ],
    appointments: [
      { time: "09:00 AM", patient: "Mr. Smith" },
      { time: "10:30 AM", patient: "Mrs. Johnson" },
      { time: "01:00 PM", patient: "Miss Williams" },
      { time: "02:15 PM", patient: "Dr. Brown" },
    ],
    cpd: [
      { date: "2024-04-20", title: "Webinar on Anxiety Disorders" },
      { date: "2024-04-25", title: "Trauma-Informed Care Training" },
      { date: "2024-05-10", title: "Mindfulness in Therapy Workshop" },
    ]
  },
  {
    id: "p002",
    name: "Lerato",
    surname: "Ngcobo",
    gender: "Female",
    email: "lerato@example.com",
    password: "securepass",
    jobTitle: "General Practitioner",
    idNumber: "9002026009088",
    hpcsa: "HPC654321",
    placesOfWork: ["Sunrise Clinic"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 7, patients: 5 },
      { date: "2024-05-02", hours: 7, patients: 5 },
      { date: "2024-05-03", hours: 5, patients: 4 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Order medical supplies." },
      { date: "2024-05-29", text: "Attend staff meeting." },
    ],
    appointments: [
      { time: "10:00 AM", patient: "Mr. Adams" },
      { time: "11:30 AM", patient: "Ms. Peters" },
    ],
    cpd: [
      { date: "2024-04-18", title: "Chronic Disease Management CPD" },
      { date: "2024-04-30", title: "Ethics in General Practice" },
    ]
  },
  {
    id: "p003",
    name: "Katlego",
    surname: "Seno",
    gender: "Female",
    email: "Katlego4@example.com",
    password: "securepass",
    jobTitle: "Physiotherapist",
    idNumber: "9404180648083",
    hpcsa: "HPC654321",
    placesOfWork: ["Heal fast academic hospital"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 5, patients: 7 },
      { date: "2024-05-02", hours: 6, patients: 6 },
      { date: "2024-05-03", hours: 6, patients: 5 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Prepare therapy materials." },
      { date: "2024-05-29", text: "Check patient feedback forms." },
    ],
    appointments: [
      { time: "08:30 AM", patient: "Mr. Thompson" },
      { time: "10:00 AM", patient: "Ms. Lee" },
    ],
    cpd: [
      { date: "2024-03-22", title: "Rehabilitation Techniques Seminar" },
      { date: "2024-05-05", title: "Post-Surgical Physio Care Workshop" },
    ]
  },
  {
    id: "p004",
    name: "Bongani",
    surname: "Msimanga",
    gender: "Male",
    email: "BonganiM@example.com",
    password: "securepass",
    jobTitle: "Audiologist",
    idNumber: "8205046534083",
    hpsa: "HPC654321",
    placesOfWork: ["Heal fast academic hospital"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 4 },
      { date: "2024-05-02", hours: 7, patients: 5 },
      { date: "2024-05-03", hours: 5, patients: 4 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Calibrate new audiometer." },
    ],
    appointments: [
      { time: "09:00 AM", patient: "Mr. Roberts" },
      { time: "11:00 AM", patient: "Mrs. Green" },
    ],
    cpd: [
      { date: "2024-04-10", title: "Hearing Aid Fitting Certification" },
    ]
  },
  {
    id: "p005",
    name: "Keitumetse",
    surname: "Moloi",
    gender: "Female",
    email: "Moloi76@example.com",
    password: "securepass",
    jobTitle: "Speech therapist",
    idNumber: "9604038754086",
    hpsa: "HPC654321",
    placesOfWork: ["Sunrise Clinic"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 5 },
      { date: "2024-05-02", hours: 6, patients: 4 },
      { date: "2024-05-03", hours: 7, patients: 5 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Update therapy plans." },
    ],
    appointments: [
      { time: "08:45 AM", patient: "Mr. Jacob" },
      { time: "10:15 AM", patient: "Ms. Brown" },
    ],
    cpd: [
      { date: "2024-05-01", title: "Speech Therapy for Children" },
      { date: "2024-05-12", title: "New Strategies in Language Development" },
    ]
  },
  {
    id: "p006",
    name: "Moses",
    surname: "Ngwenya",
    gender: "Male",
    email: "MosesNgwenya76@example.com",
    password: "securepass",
    jobTitle: "Dietitian",
    idNumber: "0103080548076",
    hpsa: "HPC654321",
    placesOfWork: ["Noma Hospital"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 7, patients: 5 },
      { date: "2024-05-02", hours: 8, patients: 6 },
      { date: "2024-05-03", hours: 6, patients: 5 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Prepare nutrition workshop." },
    ],
    appointments: [
      { time: "09:30 AM", patient: "Mrs. Clark" },
      { time: "11:00 AM", patient: "Mr. Lewis" },
    ],
    cpd: [
      { date: "2024-04-15", title: "Advanced Nutritional Counseling" },
    ]
  },
  {
    id: "p007",
    name: "Kate",
    surname: "May",
    gender: "Female",
    email: "KateMill@example.com",
    password: "securepass",
    jobTitle: "Optometrist",
    idNumber: "0103080548076",
    hpsa: "HPC654321",
    placesOfWork: ["Noma Hospital"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 6 },
      { date: "2024-05-02", hours: 6, patients: 5 },
      { date: "2024-05-03", hours: 7, patients: 7 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Check eye exam equipment." },
    ],
    appointments: [
      { time: "10:00 AM", patient: "Mr. Daniels" },
      { time: "12:00 PM", patient: "Ms. Harris" },
    ],
    cpd: [
      { date: "2024-04-28", title: "Modern Refraction Techniques" },
    ]
  },
  {
    id: "p008",
    name: "Léane",
    surname: "Van Der Holf",
    gender: "Female",
    email: "LéaneVD@example.com",
    password: "securepass",
    jobTitle: "Oral hygienist",
    idNumber: "8905040548076",
    hpsa: "HPC654321",
    placesOfWork: ["Sunshine Clinic"],
    mentalHealth: false,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 7 },
      { date: "2024-05-02", hours: 5, patients: 6 },
      { date: "2024-05-03", hours: 6, patients: 5 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Restock hygiene supplies." },
    ],
    appointments: [
      { time: "09:00 AM", patient: "Mrs. White" },
      { time: "10:30 AM", patient: "Mr. Black" },
    ],
     cpd: [
      { date: "2024-03-18", title: "Dental Hygiene CPD Workshop" },
    ]
  },
  {
    id: "p009",
    name: "Neo",
    surname: "Nkosi",
    gender: "Male",
    email: "Neo6@example.com",
    password: "securepass",
    jobTitle: "Psychologist",
    idNumber: "86101678054807",
    hpsa: "HPC654321",
    placesOfWork: ["Noma Hospital"],
    mentalHealth: true,
    workSummary: [
      { date: "2024-05-01", hours: 7, patients: 5 },
      { date: "2024-05-02", hours: 6, patients: 4 },
      { date: "2024-05-03", hours: 7, patients: 6 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Prepare group therapy session." },
      { date: "2024-05-29", text: "Review patient progress notes." },
    ],
    appointments: [
      { time: "09:00 AM", patient: "Ms. Turner" },
      { time: "11:00 AM", patient: "Mr. Wilson" },
    ],
    cpd: [
      { date: "2024-05-02", title: "Psychological Assessment Tools" },
      { date: "2024-05-11", title: "Suicide Prevention in Therapy" },
    ]
  },
  {
    id: "p010",
    name: "Keith",
    surname: "Wale",
    gender: "Female",
    email: "WaleK@example.com",
    password: "securepass",
    jobTitle: "Social Worker",
    idNumber: "0103080548076",
    hpsa: "HPC654321",
    placesOfWork: ["Noma Hospital"],
    mentalHealth: true,
    workSummary: [
      { date: "2024-05-01", hours: 6, patients: 5 },
      { date: "2024-05-02", hours: 7, patients: 6 },
      { date: "2024-05-03", hours: 6, patients: 5 },
    ],
    reminders: [
      { date: "2024-05-28", text: "Attend community outreach meeting." },
    ],
    appointments: [
      { time: "08:30 AM", patient: "Mrs. Evans" },
      { time: "10:00 AM", patient: "Mr. Harris" },
    ],
    cpd: [
      { date: "2024-04-14", title: "Social Work Case Study CPD" },
    ]
  }
];
