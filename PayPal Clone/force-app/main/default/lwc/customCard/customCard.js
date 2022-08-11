import { LightningElement, wire } from 'lwc';
import getCardInfo from '@salesforce/apex/CustomWalletHandler.getCardInfo';
import card from '@salesforce/schema/Card__c';
import cardName from '@salesforce/schema/Card__c.Name__c';
import cardNo from '@salesforce/schema/Card__c.Card_no__c';
import cardCvv from '@salesforce/schema/Card__c.cvv__c';
import cardExp from '@salesforce/schema/Card__c.expiry_date__c';


export default class CustomCard extends LightningElement {

    value;
    objectName = card;
    fields = [cardName, cardNo, cardCvv, cardExp];
    getCardId;
    record;
    isHaveCard = false;


    @wire (getCardInfo,{})
    walletData({error, data}){
        if(data){
            this.value = data.Card_no__c;
            console.log(this.value);
            this.getCardId = data.Id;
            this.isHaveCard = true;
        }
        else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }
    
}