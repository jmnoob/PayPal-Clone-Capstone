import { api, LightningElement, track, wire } from 'lwc';
import getUserInfo from '@salesforce/apex/CarHandler.getUserInfo';
import getId from '@salesforce/apex/CarHandler.getCarModel';
import getRec from '@salesforce/apex/CarHandler.getCarModelDetail';
import carmodelapiname from '@salesforce/schema/Car_Model__c';
import CAR_PN from '@salesforce/schema/Car_Model__c.Production_Number__c';
import CAR_MODEL from '@salesforce/schema/Car_Model__c.Car_Models__c';
import CAR_STAGE from '@salesforce/schema/Car_Model__c.Car_Stage__c';
import CAR from '@salesforce/schema/Car_Model__c.Cars__c';
import MODEL_COLOR from '@salesforce/schema/Car_Model__c.Model_Color__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const col= [
    {
        label:'Car number',
        fieldName:'Records',
        type: 'url',
        typeAttributes:{
            label:{
                fieldName: 'CarNumber'
            }
        }
    },
    {
        label: 'Car Model',
        fieldName: 'CarModel',
        type: 'text'
    },
    {
        label: 'Car Status',
        fieldName: 'CarStatus',
        type: 'text'
    },
    {
        label: 'Car',
        fieldName: 'Car',
        type: 'text'
    },
    {
        label: 'Car Color',
        fieldName: 'CarColor',
        type: 'text'
    },
    {
        label: 'Production Number',
        fieldName: 'CarPN',
        type: 'text'
    }
]


export default class carsManagement extends LightningElement {
   
    carModelNumber = carmodelapiname;
    carPN  = CAR_PN;
    carModel = CAR_MODEL;
    carStage = CAR_STAGE;
    car = CAR;
    color = MODEL_COLOR;
    recordsIds;

    result;
    carCols = col;

    @track isSA;
    @track isQA;
    @track isSE;

    @wire(getUserInfo,{})
    userData({ error, data }) {
        if(data) {
            if(data.Profile.Name === "System Administrator") {    
                this.isSA = true;
                this.isSE = true;
                this.getRecent();
            }
        }if(data) {
            if(data.Profile.Name === "Quality Analysts") {    
                this.isQA = true;
            }
        }if(data) {
            if(data.Profile.Name === "Sales Executive") {    
                this.isSE = true;
            }
        }
        else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

    handleSuccess(e){
        this.carPN = e.target.value;

        this.getData();
    }

    getData(){
        getId({'Pnumber': this.carPN}).then(result=>{
            this.recordsIds = result.Id;
            console.log(this.recordsIds);
        })
        if(this.recordId !== null){
            this.dispatchEvent(new ShowToastEvent({
                    title: "SUCCESS!",
                    message: "New record has been created.",
                   variant: "success",
                }),  
           );    
         }
    } 


    getRecent(){
        getRec().then(res =>{
            
            if(res){
                let finalCarData=[];
                res.foreach(row =>{
                    let carData = {};
                    carData.Id = row.Id;
                    carData.CarNumber = row.Name;
                    carData.CarModel = row.Car_Models__c;
                    carData.CarStatus = row.Car_Stage__c;
                    carData.Car = row.Cars__r.Name;
                    carData.CarColor = row.Model_Color__c;
                    carData.CarPN = row.Production_Number__c;
                    carData.Records = 'https://trainngs-dev-ed.lightning.force.com/lightning/r/Car_Model__c/'+row.Id+'/view';
                    finalCarData.push(carData);
                })
                this.result = finalCarData;
                console.log(this.result);   
            }
        }).catch(err =>{
            this.error=err;
        })
    }


    

    

}