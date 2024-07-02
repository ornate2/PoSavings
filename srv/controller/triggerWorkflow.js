const cds = require("@sap/cds");
const axios = require("axios");

module.exports = {
    triggerWorkflowAndUpdateStatus
};

async function triggerWorkflowAndUpdateStatus() {
    const db = await cds.connect.to("db");
    const { ProcessAutomation } = db.entities;

    try {
        // Fetch data from local database (substitute for OData service)
        const records = await db.read(ProcessAutomation).columns('PONumber', 'Savings');

        for (const record of records) {
            // Call Workflow API for each record
            try {
                const workflowResponse = await callWorkflowAPI(record);
                console.log('Workflow triggered:', workflowResponse);

                // Update status in the database
                await db.update(ProcessAutomation).set({ TriggerStatus: 'Success' }).where({ PONumber: record.PONumber });
            } catch (err) {
                console.error('Error triggering workflow for record:', record.PONumber, err);

                // Update status in the database
                await db.update(ProcessAutomation).set({ TriggerStatus: 'Failed' }).where({ PONumber: record.PONumber });
            }
        }

        return "Workflow triggered and status updated for applicable records.";
    } catch (error) {
        console.error('Error processing records:', error);
        throw error;
    }
}

// Mock function to simulate workflow API call
async function callWorkflowAPI(record) {
    console.log('Calling workflow API for record:', record);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate API response
    return { status: 'success', data: record };
}
