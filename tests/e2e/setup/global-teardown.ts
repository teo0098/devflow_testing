import { cleanupE2EData, disconnectE2EDB } from "@/tests/config/db-e2e";

const globalTeardown = async () => {
  console.log("Starting E2E test global teardown");

  try {
    await cleanupE2EData();

    await disconnectE2EDB();

    console.log("E2E global teardown completed successfully");
  } catch (error) {
    console.error("E2E global teardown failed: ", error);
  }
};

export default globalTeardown;
