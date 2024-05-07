export class Customer{
    constructor(customerCode,
                customerName,
                gender,
                joinDate,
                level,
                totalPoints,
                dob,
                addressLine1,
                addressLine2,
                addressLine3,
                addressLine4,
                addressLine5,
                contactNumber,
                email,
                recentPurchaseDateAndTime){
        this.customerCode = customerCode;
        this.customerName = customerName;
        this.gender = gender;
        this.joinDate = joinDate;
        this.level = level;
        this.totalPoints = totalPoints;
        this.dob = dob;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.addressLine5 = addressLine5;
        this.contactNumber = contactNumber;
        this.email = email;
        this.recentPurchaseDateAndTime = recentPurchaseDateAndTime;
    }
}