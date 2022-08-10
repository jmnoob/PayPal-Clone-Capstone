public class updateWallets {
    
    
    @AuraEnabled(cacheable=false)
    public static Wallet__c updateMyWallet(Double Amount){
       	String userId = UserInfo.getUserId();
        Wallet__c upmywallet = [SELECT Id, balance__c From Wallet__c Where OwnerId =:userId];
        upmywallet.balance__c = upmywallet.balance__c + Amount;
        try{
            update upmywallet;
            UpdateMyCard.updateCard(Amount);
           
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
        return upmywallet;
	}
    
    @AuraEnabled(cacheable=false)
    public static Wallet__c deductMyWallet(Double Amount){
           
        String userId = UserInfo.getUserId();
        Wallet__c upmywallet = [SELECT Id, balance__c From Wallet__c Where OwnerId =:userId];
        upmywallet.balance__c = upmywallet.balance__c - Amount;
        try{
            update upmywallet;
           
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
        return upmywallet;
	}
    
    
}