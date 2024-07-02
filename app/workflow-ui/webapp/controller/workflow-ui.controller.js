sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, ODataModel, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("workflowui.controller.workflow-ui", {

        onInit: function () {
            // Initialize OData Model
            const oModel = new ODataModel("/odata/v4/process-automation/");
            this.getView().setModel(oModel);

            // Load data into the table
            this._loadData();
        },

        _loadData: function () {
            const oTable = this.byId("poTable");
            const oModel = this.getView().getModel();

            // Read data from OData service
            oModel.read("/ProcessAutomations", {
                success: function (oData) {
                    // Create JSONModel and bind data to the table
                    const oJSONModel = new JSONModel(oData.value);
                    oTable.setModel(oJSONModel);
                    oTable.bindItems({
                        path: "/",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{PONumber}" }),
                                new sap.m.Text({ text: "{Savings}" }),
                                new sap.m.Text({ text: "{TriggerStatus}" }) // Ensure TriggerStatus exists in the response
                            ]
                        })
                    });
                },
                error: function (oError) {
                    MessageToast.show("Error loading data.");
                    console.error("Error loading data:", oError);
                }
            });
        },

        onTriggerWorkflow: async function () {
            const oModel = this.getView().getModel();

            try {
                // Call the OData function to trigger workflow
                await oModel.callFunction("/triggerWorkflowAndUpdateStatus", {
                    method: "POST",
                    urlParameters: {} // Add parameters if needed
                });

                // Reload data after the workflow is triggered
                this._loadData();
                MessageToast.show("Workflow triggered and status updated.");
            } catch (error) {
                MessageToast.show("Error triggering workflow.");
                console.error("Error triggering workflow:", error);
            }
        }
    });
});
