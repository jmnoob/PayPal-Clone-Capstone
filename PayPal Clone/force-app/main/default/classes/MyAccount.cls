public class MyAccount {
	
    @AuraEnabled(cacheable=true)
    public static Uuser__c getAccountInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Email__c, Name, mobile_number__c From Uuser__c WHERE OwnerId =: userID LIMIT 1];
    }
}