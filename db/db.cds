namespace  app.db;

entity ProcessAutomation {
    key ID                : UUID;
    CreatingSavingForagainst         : String(255);
    Cluster                          : String(255);
    PONumber                         : String(50);
    POValueWithCurrency              : String(255);
    VendorName                       : String(100);
    VendorCode                       : String(50);
    Category                         : String(100);
    ProjectDescription               : String(255);
    Region                           : String(50);
    SavingStartDate                  : Date;
    SavingEndDate                    : Date;
    LastYearPONo                     : String(50);
    LastYearPOValue                  : String(255);
    LastYearPOCurrency               : String(5);
    Attachment                       : String(255);
    QuotedValuePrevPeriodSpend       : String(255);
    Currency                         : String(5);
    OrderValueRevisedSpendInUSD      : String(255);
    Savings                          : Boolean;
    SavingsPercentage                : String(50);
    SavingType                       : String(50);
    SavingDistributionAcrossQtrs     : String(255);
    BMFValidation                    : String(255);
    YOYSavingFunctionBMApproval      : String(255);
}