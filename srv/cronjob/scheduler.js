const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = {
  scheduleJob
};

async function executeJob() {
  const service = await cds.connect.to('ProcessAutomationService');
  
  try {
    const result = await service.tx().send({
      action: 'triggerWorkflowAndUpdateStatus',
      data: {}
    });
    
    console.log('Workflow triggered and status updated:', result);
  } catch (error) {
    console.error('Error executing job:', error);
  }
}

// Schedule job to run every 20 seconds
async function scheduleJob() {

  cron.schedule('*/20 * * * * *', () => {
    console.log('Running scheduled job...');
    executeJob();
  });

  console.log('Job scheduled to run every 20 seconds!');
}
