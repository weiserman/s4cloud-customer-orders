const cds = require("@sap/cds");

module.exports = async (srv) => {
  // Get the external services
  const S4_Orders_Service = await cds.connect.to("SalesOrderA2X");
  const S4_Products_Service = await cds.connect.to("ProductMasterA2X");

  // Handle Sales Service
  if (srv.name === "OrdersService") {
    srv.on("READ", "S4Orders", async (req) => {
      let orders = await S4_Orders_Service.send({
        query: SELECT.from("API_SALES_ORDER_SRV.A_SalesOrder")
          .columns(
            "SalesOrder as salesOrder",
            "SoldToParty as customerId",
            "SalesOrderDate as salesOrderDate",
            "TotalNetAmount as totalAmount",
            "OverallDeliveryStatus as status"
          )
          .limit(100),
        headers: {
          apikey: process.env.apikey,
          Accept: "application/json",
        },
      });

      orders.$count = orders.length;
      return orders;
    });
  }

  // Handle Product Service
  if (srv.name === "ProductsService") {
    srv.on("READ", "S4Products", async (req) => {
      let products = await S4_Products_Service.send({
        query: SELECT.from("API_PRODUCT_SRV.A_Product")
          .columns(
            "Product as product",
            "ProductType as productType",
            "CreationDate as createdDate",
            "ProductGroup as productGroup"
          )
          .limit(100),
        headers: {
          apikey: process.env.apikey,
          Accept: "application/json",
        },
      });
      products.$count = products.length;
      return products;
    });
  }
};