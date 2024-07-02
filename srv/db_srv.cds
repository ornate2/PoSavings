using { app.db as db } from '../db/db';

service ProcessAutomationService {
    entity ProcessAutomations as projection on db.ProcessAutomation;
    action fetchData() returns String;
    action submitFilledForm(filledForm: FilledForm) returns String;
    action updateProcessedRecords(processedRecords: ProcessedRecord) returns String;
    action triggerWorkflowAndUpdateStatus() returns String; // New action
}

type FilledForm {
    PONumber: String;
    BuyerDetails: String;
    Comments: String;
}

type ProcessedRecord {
    PONumber: String;
    Savings: Boolean;
}
