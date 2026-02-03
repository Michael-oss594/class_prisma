require("dotenv").config();
const { prisma } = require("../lib/prisma");

async function main() {
  console.log("Starting seed...");

  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password123",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password123",
    },
    {
      name: "Alice Williams",
      email: "alice.williams@example.com",
      password: "password123",
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      password: "password123",
    },
    {
      name: "Diana Davis",
      email: "diana.davis@example.com",
      password: "password123",
    },
    {
      name: "Eve Martinez",
      email: "eve.martinez@example.com",
      password: "password123",
    },
    {
      name: "Frank Garcia",
      email: "frank.garcia@example.com",
      password: "password123",
    },
    {
      name: "Grace Wilson",
      email: "grace.wilson@example.com",
      password: "password123",
    },
    {
      name: "Henry Taylor",
      email: "henry.taylor@example.com",
      password: "password123",
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    });
    console.log(`Created user: ${user.name} (${user.email})`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });