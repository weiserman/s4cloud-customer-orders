namespace com.sap;

using { ProductMasterA2X } from '../srv/external/ProductMasterA2X.cds';
using { SalesOrderA2X } from '../srv/external/SalesOrderA2X.cds';

@cds.persistence.skip
entity S4Orders as
    projection on SalesOrderA2X.A_SalesOrder
    {
        SalesOrder as salesOrder,
        SoldToParty as customerId,
        SalesOrderDate as salesOrderDate,
        TotalNetAmount as totalAmount,
        OverallDeliveryStatus as status
    };

@cds.persistence.skip
entity S4Products as
    projection on ProductMasterA2X.A_Product
    {
        Product as product,
        ProductType as productType,
        CreationDate as createdDate,
        ProductGroup as productGroup,
        to_Description.ProductDescription as description
    };
