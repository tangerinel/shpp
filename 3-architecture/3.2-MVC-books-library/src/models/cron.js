import cron from "cron";
import { performBackup, deleteSoftDeletedRecords } from "./database.js";

// Create a cron job for performing backup every day at midnight (00:00)
const backupJob = new cron.CronJob("0 0 * * *", () => {
  performBackup();
});

// Create a cron job for deleting soft deleted records every day at 2 PM (14:00)
const deleteJob = new cron.CronJob("44 12 * * *", async () => {
  deleteSoftDeletedRecords();
});

// Start the cron jobs
const startCron = () => {
  backupJob.start();
  deleteJob.start();
};

export { startCron };
