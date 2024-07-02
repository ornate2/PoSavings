const cds = require("@sap/cds");

module.exports = {
    fetchData
};

async function fetchData() {
    const db = await cds.connect.to("db");
    const { ProcessAutomation } = db.entities;

    try {
        const result = await db.read(ProcessAutomation).columns('PONumber', 'Savings');
        console.log("Fetched Result!!", result);

        const newRecords = result.filter(record => record.PONumber && record.Savings);
        
        if (newRecords.length > 0) {
            console.log("something went wrong!")
        }

        return "Prefilled forms checked and sent if applicable";
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}