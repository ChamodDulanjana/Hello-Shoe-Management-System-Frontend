export class Inventory{
    constructor(itemCode,
                itemDescription,
                itemPicture,
                category,
                size,
                supplierCode,
                supplierName,
                quantityOnHand,
                unitPrice_sale,
                unitPrice_buy,
                expectedProfit,
                profitMargin,
                status){
        this.itemCode = itemCode;
        this.itemDescription = itemDescription;
        this.itemPicture = itemPicture;
        this.category = category;
        this.size = size;
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
        this.quantityOnHand = quantityOnHand;
        this.unitPrice_sale = unitPrice_sale;
        this.unitPrice_buy = unitPrice_buy;
        this.expectedProfit = expectedProfit;
        this.profitMargin = profitMargin;
        this.status = status;
    }
}