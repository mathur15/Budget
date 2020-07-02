
var budgetController = (function(){
    var Expense = function(id,description,value){
            this.id = id;
            this.description = description;
            this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    //storing all expenses

    var allData = {
       allItems:{
        expenses : [],
        incomes : [], 
       },
       totals:{
         expenses : 0,
         incomes: 0
       }
    }
})() 


var UIController = (function(){
    //keep track of the classes 
    var DOMstrings = {
        inputType: '.add__type',
        description: '.add__description',
        value: '.add__value',
        inputBtn: '.add__btn'
    }
    return{
        getInputData:function(){
            //type is inc or exp
            //return multiple values
            var data = {
                type: document.querySelector(DOMstrings.inputType).value,
                description:document.querySelector(DOMstrings.description).value,
                num_value: document.querySelector(DOMstrings.value).value
            }
            return data
        },
        getDOMstrings: function(){
            return DOMstrings
        }
    } 

})()


/*The reason the arguments are different from the original
to prevent changing the name of the varibale in the function
and only make those changes on the otuside.  */
var appController = (function(budgerCtrl,UICtrl){
    //some code
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings()
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        //adding global eventlistener not for a specific item
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                //when enter is hit
                ctrlAddItem()
            }
        })
    }
    var ctrlAddItem =  function(){
        var input = UICtrl.getInputData()
        //console.log(input)

    }
    return(
        {
            init:function(){
                setupEventListeners();
            }
        }
    )
   
})(budgetController,UIController);

appController.init()