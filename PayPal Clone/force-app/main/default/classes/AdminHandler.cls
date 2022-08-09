public class AdminHandler {
    
    
	
    @AuraEnabled(cacheable=true)
    public static boolean getUserInfo() {
		Id profileId=userinfo.getProfileId();
		String profileName=[Select Id, Name from Profile where Id=:profileId].Name;
        
        if(profileName == 'System Administrator'){
            return true;
        }else{
            return false;
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Bills__c> forAdminBills(){
        List<Bills__c> bills = new List<Bills__c>();
        bills = [SELECT ID, Name, amount__c,location__c,for_user__r.Name, category__c, paid__c, pay_before__c, successful__c,offer_applied__c,Flagged__c from Bills__c ORDER BY Name DESC];
        return bills;
    }
    
    @AuraEnabled(cacheable=false)
    public static Wallet__c updateMyWallet(Double Amount, String ThisBillId, Boolean isPaid, String userName){
       	
        Wallet__c upmywallet = [SELECT Id, balance__c, added_from__c From Wallet__c Where added_from__c =:userName];
        upmywallet.balance__c = upmywallet.balance__c + Amount;
        try{
            if(isPaid){
            update upmywallet;
           	updateTheBill(ThisBillId);
            }else{
                updateTheBill(ThisBillId);
            }
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
        return upmywallet;
	}
    
    @AuraEnabled(cacheable=false)
    public static Bills__c updateTheBill(String BillsId){
        
        Bills__c bills = [SELECT ID, paid__c, successful__c from Bills__c where Id =: BillsId];
        try{
        delete bills; 
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return bills;
    }
    
    
}