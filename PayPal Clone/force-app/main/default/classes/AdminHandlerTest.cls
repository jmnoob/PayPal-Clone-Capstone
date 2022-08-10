@isTest
public class AdminHandlerTest {

    @isTest
    public static void acctest(){
        System.debug(AdminHandler.getUserInfo());
    }
    
    @isTest
    public static void acctest2(){
        System.debug(AdminHandler.forAdminBills());
    }
    
     @isTest
    public static void acctest3(){
        String bill = 'a0I5i000000CLWqEAO';
        System.debug(AdminHandler.updateTheBill(bill));
    }
}