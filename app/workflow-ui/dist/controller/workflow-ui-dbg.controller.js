sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/m/MessageToast"
], function (Controller, ODataModel, MessageToast) {
    "use strict";

    return Controller.extend("workflowui.controller.Main", {

        onInit: function () {
            // Initialize the OData V4 model
            const oModel = new ODataModel("/odata/v4/process-automation/");
            this.getView().setModel(oModel);

            // Bind the table to the OData model
            this._loadData();
        },

        _loadData: function () {
            const oTable = this.byId("poTable");
            const oModel = this.getView().getModel();

            // Read data from OData V4 service
            oModel.read("/ProcessAutomations", {
                success: function (oData) {
                    // Assuming oData has a property "value" which is an array of items
                    oTable.setModel(new sap.ui.model.json.JSONModel(oData));
                    oTable.bindItems({
                        path: "/value",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{PONumber}" }),
                                new sap.m.Text({ text: "{Savings}" }),
                                new sap.m.Text({ text: "{TriggerStatus}" })
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
                    urlParameters: {}
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
