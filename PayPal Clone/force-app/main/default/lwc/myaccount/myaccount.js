import { LightningElement, wire } from 'lwc';
import myAccount from '@salesforce/apex/MyAccount.getAccountInfo';

export default class Myaccount extends LightningElement {

    haveData;
    accId = false;

    @wire (myAccount)
    accounts({error, data}){
        if(data){
            this.accId = data.Id;
            this.haveData = true;
        }else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

}