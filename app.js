
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
        exp : [],
        inc: [], 
       },
       totals:{
         exp : 0,
         inc : 0
       }
    }
    return{
        addItem: function(type,des,val){
            var newItem;
            //for the first item
            if(allData.allItems[type].length ===0){
                id = 0
            }
            else{
                //retrieve last id and add one to it
                id = allData.allItems[type][allData.allItems[type].length-1].id + 1
            }
            //'exp'  and 'inc' are part of the data input
            if(type ==='exp'){
                newItem = new Expense(id,des,val)
            }
            else{
                newItem = new Income(id,des,val)
            }

            allData.allItems[type].push(newItem)
            return newItem
        },
        testing:function(){
            console.log(allData)
        }
    }
})() 


var UIController = (function(){
    //keep track of the classes 
    var DOMstrings = {
        inputType: '.add__type',
        description: '.add__description',
        value: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expense__list'
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
        addListItem:function(obj,type){
            var html,newHTML,elemet;
            // Create html string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>'+
            '<div class="right clearfix"><div class="item__value">+%num_value%</div><button class="item__delete--btn">'+
            '<i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DOMstrings.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>'+
            '<div class="right clearfix"><div class="item__value">-%num_value%</div><div class="item__percentage">21%</div>'+
            '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
            '</div></div></div>'
            }
            console.log(element)
            console.log(html)
            //replace the placeholder text with data
            newHTML = html.replace('%id%',obj.id)
            newHTML = newHTML.replace("%description%",obj.description)
            newHTML = newHTML.replace("%num_value%",obj.value)
            console.log(newHTML)
            //Insert the html into the DOM
            //see documentation for insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML)

        },
        getDOMstrings: function(){
            return DOMstrings
        }
    } 

})()


/*The reason the arguments are different from the original
to prevent changing the name of the varibale in the function
and only make those changes on the otuside.  */
var appController = (function(budgetCtrl,UICtrl){
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
        var input,newItem;
        //get input field data
        input = UICtrl.getInputData()
        //console.log(input)
        //add item to data structure in budgetController data structure
        newItem = budgetCtrl.addItem(input.type,input.description,input.num_value)
        //add item to UI
        UICtrl.addListItem(newItem,input.type)
        //calculate budget

        //Display budget on the UI
    }
    return(
        {
            init:function(){
                console.log("Application begun")
                setupEventListeners();
            }
        }
    )
   
})(budgetController,UIController);

appController.init()