import { api, LightningElement, track, wire } from 'lwc';
import getWalletInfo from '@salesforce/apex/CustomWalletHandler.getWalletInfo';
import { NavigationMixin } from "lightning/navigation";
import getCardInfo from '@salesforce/apex/CustomWalletHandler.getCardInfo';

export default class CustomWallet extends NavigationMixin (LightningElement) {

    value;
    totalpsend;
    cardId;
    getId;
    isUser = true;

    @wire (getWalletInfo)
    walletData({error, data}){ //data is record Id
        if(data){
            this.getId = data.Id;
            console.log(data);
            this.isUser = false;
        }else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }


    handleShowModal() {
        const modal = this.template.querySelector("c-addmoney");
        modal.show();
        getCardInfo().then(result =>{
            this.value = result.Card_no__c;
            this.totalpsend = result.total_spend__c;
            this.cardId = result.Id;
            console.log(this.value);
            modal.getcardnumber = this.value;
            modal.total = this.totalpsend;
            modal.cardIds = this.cardId;
        })
        
      }




}