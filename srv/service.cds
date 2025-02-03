using {com.sap as my} from '../db/schema';

@path: '/cap/services'
service OrdersService {

    @readonly
    entity S4Orders      as projection on my.S4Orders;
}
annotate OrdersService with @requires: ['authenticated-user'];

@path: '/cap/products'
service ProductsService {

    @readonly
    entity S4Products      as projection on my.S4Products;
}
annotate ProductsService with @requires: ['authenticated-user'];
