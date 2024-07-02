const cds = require('@sap/cds');
const { fetchData } = require('./controller/Fetchdata');
const { updateProcessedRecords } = require('./controller/UpdateRecords');
const { submitFilledForm } = require('./controller/SubmitFilledForm');
const { scheduleJob } = require('./cronjob/scheduler');
const { triggerWorkflowAndUpdateStatus } = require('./controller/triggerWorkflow'); // Import new controller

module.exports = cds.service.impl(async function () {
  this.on('fetchData', async () => {
    try {
      const result = await fetchData();
      return result;
    } catch (error) {
      console.error('Error in fetchData action:', error);
      return 'Error occurred while sending prefilled forms';
    }
  });

  this.on('scheduledJob', async () => {
    try {
      const result = await fetchData();
      return result;
    } catch (error) {
      console.error('Error in scheduled job:', error);
      throw error;
    }
  });

  this.on('updateProcessedRecords', async (req) => {
    try {
      const { processedRecords } = req.data;
      const result = await updateProcessedRecords(processedRecords);
      return result;
    } catch (error) {
      console.error('Error in updateProcessedRecords action:', error);
      throw error;
    }
  });

  this.on('submitFilledForm', async (req) => {
    try {
      const { filledForm } = req.data;
      const result = await submitFilledForm(filledForm);
      return result;
    } catch (error) {
      console.error('Error in submitFilledForm action:', error);
      throw error;
    }
  });

  this.on('triggerWorkflowAndUpdateStatus', async () => { // New action
    try {
      const result = await triggerWorkflowAndUpdateStatus();
      return result;
    } catch (error) {
      console.error('Error in triggerWorkflowAndUpdateStatus action:', error);
      throw error;
    }
  });

  await scheduleJob();
});
