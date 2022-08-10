@isTest
public class BillsTest {

    @isTest
    public static void testBill(){
        String s = 'a0I5i000000CLWqEAO';
        Double b = 200.0;
       System.debug(Bills.updateBills(s, b));
    }
}