const cds = require("@sap/cds");

module.exports = async (srv) => {
  const { MappingCustomers, S4SalesOrders, NorthwindCustomers } =
    srv.entities;

  // connect to S/4HANA
  const S4_Service = await cds.connect.to("SalesOrderA2X");

  srv.on("READ", S4SalesOrders, async (req) => {
    // await delay(5000);
    // return [];
    let orders = await S4_Service.send({
      query: SELECT.from(S4SalesOrders)
        .columns(
          "salesOrder",
          "customerId",
          "salesOrderDate",
          "totalAmount",
          "status"
        )
        .limit(10),
      headers: {
        apikey: process.env.apikey,
        Accept: "application/json",
      },
    });

    orders.$count = orders.length;
    return orders;
  });
};
