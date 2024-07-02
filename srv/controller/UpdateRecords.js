const cds = require('@sap/cds');

module.exports = {
  updateProcessedRecords
};

async function updateProcessedRecords(processedRecords) {
  const db = await cds.connect.to('db');
  const { ProcessAutomation } = db.entities;

  try {
    for (const record of processedRecords) {
      await db.update(ProcessAutomation)
        .set({ Savings: record.Savings })
        .where({ PONumber: record.PONumber });
    }
    return 'Processed records updated successfully';
  } catch (error) {
    console.error('Error updating processed records:', error);
    throw error;
  }
}