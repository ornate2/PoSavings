const cds = require('@sap/cds');

module.exports = {
  submitFilledForm
};

async function submitFilledForm(filledForm) {
  const db = await cds.connect.to('db');
  const { ProcessAutomation } = db.entities;

  try {
    const { PONumber, BuyerDetails, Comments } = filledForm;

    await db.update(ProcessAutomation)
      .set({ BuyerDetails, Comments })
      .where({ PONumber });

    console.log(`Form submitted successfully for PO Number: ${PONumber}`);
    return `Form submitted successfully for PO Number: ${PONumber}`;
  } catch (error) {
    console.error('Error submitting filled form:', error);
    throw error;
  }
}