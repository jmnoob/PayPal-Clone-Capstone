trigger cardset on Card__c (before insert) {
    for(Card__c cards: Trigger.New){
        cards.total_spend__c = 0;
    }
}