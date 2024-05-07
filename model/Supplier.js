export class Supplier{
    constructor(supplierCode,
                supplierName,
                category,
                addressLine1,
                addressLine2,
                addressLine3,
                addressLine4,
                addressLine5,
                addressLine6,
                contactNumber1,
                contactNumber2,
                email){
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
        this.category = category;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.addressLine5 = addressLine5;
        this.addressLine6 = addressLine6;
        this.contactNumber1 = contactNumber1;
        this.contactNumber2 = contactNumber2;
        this.email = email;
    }
}