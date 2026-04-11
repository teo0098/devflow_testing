import { cleanupE2EData, connectE2EDB, getE2EConnectionInfo, isE2EDBConnected } from "@/tests/config/db-e2e";
import { seed } from "@/tests/seeders/e2e.seeder";

const globalSetup = async () => {
  console.log("Starting E2E tests global setup");

  try {
    await connectE2EDB();

    const connectionInfo = getE2EConnectionInfo();
    console.log("E2E Database Connection Info: ", connectionInfo);

    if (!isE2EDBConnected()) {
      throw new Error("Failed to establish a stable E2E database connection");
    }

    await cleanupE2EData();

    const seedData = await seed();

    console.log("E2E global setup completed successfully");
    console.log(`Created ${Object.keys(seedData.users).length} test users`);
    console.log(`Created ${Object.keys(seedData.questions).length} test questions`);
  } catch (error) {
    console.error("E2E global setup failed: ", error);
    process.exit(1);
  }
};

export default globalSetup;
