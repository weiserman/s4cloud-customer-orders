using {com.sap as my} from '../db/schema';

@path: '/service/fromABAPtoCAPSvcs'
service SalesService {

    @readonly
    entity MappingCustomers   as projection on my.MappingCustomers;

    @readonly
    entity S4SalesOrders      as projection on my.S4SalesOrders;
}

annotate SalesService with @requires: ['authenticated-user'];
