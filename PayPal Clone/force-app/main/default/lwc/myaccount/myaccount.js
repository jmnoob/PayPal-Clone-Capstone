import { LightningElement, wire } from 'lwc';
import myAccount from '@salesforce/apex/MyAccount.getAccountInfo';

export default class Myaccount extends LightningElement {

    haveData;
    accId = false;
    record;
    @wire (myAccount)
    accounts({error, data}){
        if(data){
            this.record= data;
            this.accId = this.record[0].Id;
            this.haveData = true;
        }else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

}