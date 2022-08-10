public class CustomWalletHandler {
    
    
    @AuraEnabled(cacheable=true)
    public static Wallet__c getWalletInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, balance__c From Wallet__c WHERE OwnerId =: userID LIMIT 1];
    }
    
    
    @AuraEnabled(cacheable=true)
    public static Card__c getCardInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Card_no__c, total_spend__c From Card__c WHERE OwnerId =: userID LIMIT 1];
    }
    
    
    //update my wallet and pals wallet
    @AuraEnabled(cacheable=false)
    public static Wallet__c updateMyWallet(String Palid, Double Amount){
        String userId = UserInfo.getUserId();
        
        Wallet__c uppalswallet = [SELECT Id, balance__c From Wallet__c WHERE OwnerId =: Palid];
        uppalswallet.balance__c = uppalswallet.balance__c + Amount;
        
        Wallet__c upmywallet = [SELECT Id, balance__c From Wallet__c WHERE OwnerId =: userId];
        upmywallet.balance__c = upmywallet.balance__c - Amount;
        try{
            update upmywallet;
            update uppalswallet;
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
        return uppalswallet;
	}
    
}