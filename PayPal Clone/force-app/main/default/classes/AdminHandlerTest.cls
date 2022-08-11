@isTest
public class AdminHandlerTest {

    @isTest
    public static void acctest(){
        AdminHandler.getUserInfo();
        AdminHandler.forAdminBills();
    }
    
    
    @isTest
    public static void deltest(){
        Bills__c bills = new Bills__c(amount__c = 5000);
        insert bills;
        AdminHandler.updateTheBill(bills.Id);
        
    }
    
    
    @isTest
    public static void wallettest(){
        CustomWalletHandler.getWalletInfo();
       // CustomWalletHandler.getCardInfo();
    }
    
    @isTest
    public static void palstest(){
        PalsHandler.getPalsData('user');
    }
    
	@isTest
    public static void billTest(){
        Bills.insertPB('Juan', 200);
    }    
    
    @isTest
    public static void myacctest(){
        MyAccount.getAccountInfo();
    }
    
    @isTest
    public static void wallettriggertest(){
        Wallet__c wallet = new Wallet__c();
        wallet.balance__c = 10;
        insert wallet;
        
        Card__c cards = new Card__c();
        cards.total_spend__c = 10;
        insert cards;
    }
    
    @isTest
    public static void pbtest(){
        Bills__c bil = new Bills__c();
        bil.amount__c = 15000;
        bil.successful__c = false;
        insert bil;
        Bills__c bills = [Select Id, Name, successful__c from Bills__c Where Id=:bil.Id];
        bills.successful__c = true;
        update bills;
    }
      
    @isTest
    public static void updatecard(){
        Bills__c bil = new Bills__c();
        bil.amount__c = 10000;
        bil.successful__c = false;
        insert bil;
        Double n = 200;
        Bills.updateBills(bil.Id, n);
    }
    
    @isTest
	public static void card(){
    Card__c c = new Card__c(total_spend__c = 100);
    insert c;

    UpdateMyCard.updateCard(200);

    c = [SELECT total_spend__c FROM Card__c WHERE Id = :c.Id];
    System.assertEquals(200, c.total_spend__c);
	}
    
    @isTest
    public static void amount(){
        Wallet__c w = new Wallet__c();
        w.balance__c = 10;
        insert w;
        
        updateWallets.updateMyWallet(200);
        
        w = [SELECT Id, balance__c From Wallet__c where Id =:w.Id];
        
        System.assertEquals(200, w.balance__c);
            
    }
        
        
}