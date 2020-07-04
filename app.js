var budgetController = (function(){
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1
    };
    Expense.prototype.calculatePercent = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round(this.value/totalIncome * 100)
        }
        else{
            this.percentage = -1
        }
        
    }
    Expense.prototype.getPercent = function(){
        return this.percentage
    }
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
       },
       budget:0,
       percentage:-1
    }
    var calculateTotal = function(type){
        var sum = 0;
        allData.allItems[type].forEach(function(curr){
            sum+=curr.value
        })
        allData.totals[type] = sum
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
        },
        calculateBudget:function(){
            //calculate total income and expenses
            calculateTotal('inc')
            calculateTotal('exp')

            //the budget left
            allData.budget = allData.totals['inc'] - allData.totals['exp']
            //calculate percentage
            if(allData.totals['inc'] > 0){
                allData.percentage = Math.round((allData.totals['exp']/allData.totals['inc'])*100)
            }
            else{
                //otherwise it would be infinity
                allData.percentage = -1
            }
        },
        calculatePercent: function(){
            allData.allItems['exp'].forEach(function(curr){
                 curr.calculatePercent(allData.totals['inc'])
            })
        },
        getPercentages: function(){
            var allPercentage = allData.allItems['exp'].map(function(curr){
                return curr.getPercent()
            })
            return allPercentage
        },
        getBudget:function(){
            return {
                budget:allData.budget,
                percent:allData.percentage,
                totalInc:allData.totals['inc'],
                totalExp:allData.totals['exp']
            }
        },
        deleteItem : function(type,id){
            var ids = allData.allItems[type].map(function(current){
                return current.id
            })//returns an array of ids
            //console.log(ids)
            index = ids.indexOf(id)//find position of that id
            if(index !== -1){
                //remove of allData
                //starting to point to delete and how many after that
                allData.allItems[type].splice(index,1)
            }
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
        expenseContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        totalIncome:'.budget__income--value',
        totalExpenses:'.budget__expenses--value',
        percentage:'.budget__expenses--percentage',
        container:'.container',
        expense_percent_label:'.item__percentage',
        month: '.budget__title--month'

    }
    function formatNumber(num,type){
        var num_components;
        num = Math.abs(num)
        //Two decimal points
        num = num.toFixed(2)

        //split integer part and decimal
        num_components = num.split('.')
        //incorporate ',' for 1000s
        if(num_components[0].length > 3){
            num_components[0] =  num_components[0].substr(0,num_components[0].length-3) + ',' + num_components[0].substr(num_components[0].length -3,3) 
        }
        return (type === 'exp'? '-' : '+')+ num_components[0] +'.'+ num_components[1]
    }
    return{
        getInputData:function(){
            //type is inc or exp
            //return multiple values
            var data = {
                type: document.querySelector(DOMstrings.inputType).value,
                description:document.querySelector(DOMstrings.description).value,
                num_value:parseFloat(document.querySelector(DOMstrings.value).value)
            }
            return data
        },
        addListItem:function(obj,type){
            //console.log(obj)
            //console.log(type)
            var html,newHTML,elemet;
            // Create html string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>'+
            '<div class="right clearfix"><div class="item__value">%num_value%</div><button class="item__delete--btn">'+
            '<i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                //set the container you want to be a part of - 'exp' or 'inc'
                element = DOMstrings.expenseContainer
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>'+
            '<div class="right clearfix"><div class="item__value">%num_value%</div><div class="item__percentage">21%</div>'+
            '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
            '</div></div></div>'
            }
            //replace the placeholder text with data
            newHTML = html.replace('%id%',obj.id)
            newHTML = newHTML.replace("%description%",obj.description)
            newHTML = newHTML.replace("%num_value%",formatNumber(obj.value,type))
            //Insert the html into the DOM
            //see documentation for insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML)

        },
        deleteListItem: function(selectorId){
            var element;
            element =  document.getElementById(selectorId)
            element.parentNode.removeChild(element)
        },
        getDOMstrings: function(){
            return DOMstrings
        },
        clearFields:function(){
            var fields,fieldsArray;
            //returns a list instead of array
            fields = document.querySelectorAll(DOMstrings.description+', '+DOMstrings.value)
            //convert to array using .slice
            fieldsArray = Array.prototype.slice.call(fields)
            //loop over array
            fieldsArray.forEach(function(curr,index,arr){
                curr.value = ""
            })
            //set the focus on the description field
            fieldsArray[0].focus
            
        },
       displayBudget: function(budgetObj){
            budgetObj.budget > 0?type= 'inc':type = 'exp'
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(budgetObj.budget,type)
            document.querySelector(DOMstrings.totalIncome).textContent = formatNumber(budgetObj.totalInc,'inc')
            document.querySelector(DOMstrings.totalExpenses).textContent = formatNumber(budgetObj.totalExp,'exp')

            if(budgetObj.percent > 0){
                document.querySelector(DOMstrings.percentage).textContent = budgetObj.percent
            }else{
                document.querySelector(DOMstrings.percentage).textContent = '-----'
            }
        },
        displayMonth : function(){
            var now = new Date()
            months = ['January','February','March','April','May','June','July','August','September','October','November','December']
            var year = now.getFullYear()
            var month = now.getMonth()
            console.log(year+' ' + months[month])

            document.querySelector(DOMstrings.month).innerHTML = months[month] + ' ' + year
        },
        displayPercentages:function(allpercentages){
            var fields = document.querySelectorAll(DOMstrings.expense_percent_label)
            //querySelectorAll return a NodeList so it does not include a forEach method like for arrays
            var nodeListForEach = function(list,callback){
                for(var i =0;i<list.length;i++){
                    callback(list[i],i)
                }
            }

            nodeListForEach(fields,function(curr,index){
                if(allpercentages[index] > 0){
                    curr.textContent = allpercentages[index] + '%'
                }
                else{
                    curr.textContent = '---'
                }

            })
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
        UICtrl.displayBudget({
            budget:0,
            totalInc:0,
            totalExp:0,
            percent:0
        })
        //adding global eventlistener not for a specific item
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                //when enter is hit
                ctrlAddItem()
            }
        })
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem)
    }
    var UpdateBudget = function(){
        //calculate Budget
        budgetCtrl.calculateBudget()
        //return the budget
        var budget = budgetCtrl.getBudget()
        //display Budget on the UI
        UICtrl.displayBudget(budget)
    }
    var updatePercentage = function(){
        //calculate percentages
        budgetCtrl.calculatePercent()
        //read them from budgetController
        var percentages = budgetCtrl.getPercentages()
        //console.log(percentages)
        //Update the UI
        UICtrl.displayPercentages(percentages)
    }
    var ctrlAddItem =  function(){
        var input,newItem;
        //get input field data
        input = UICtrl.getInputData()
        console.log(input)
        //check input
        if(input.description !== "" && !isNaN(input.num_value) && input.num_value > 0){
            //add item to data structure in budgetController data structure
            newItem = budgetCtrl.addItem(input.type,input.description,input.num_value)
            //add item to UI
            UICtrl.addListItem(newItem,input.type)
            UICtrl.clearFields()

            //calculate and update budget
            UpdateBudget()
            updatePercentage()

        }
    }
    var ctrlDeleteItem = function(event){
        //console.log(event.target)--gives us the HTML where the event was
        //triggered in the child element within the selected DOM elements
        //console.log(event.target.parentNode)
        //each parentNode moves up a level, use according to how many levels to move up
        var itemId,idNum,splitId,type;
        itemId = event.target.parentNode.parentNode.parentNode.id;
        if(itemId){
            //sample id: inc-1
            splitId = itemId.split('-')
            type = splitId[0]
            idNum = parseInt(splitId[1])
            budgetCtrl.deleteItem(type,idNum)
            UICtrl.deleteListItem(itemId)
            UpdateBudget()
        }
        //budgetCtrl.testing()
    }
    return(
        {
            init:function(){
                console.log("Application begun")
                UICtrl.displayMonth()
                setupEventListeners();
            }
        }
    )
   
})(budgetController,UIController);

appController.init()