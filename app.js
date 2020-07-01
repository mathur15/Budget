var budgetController = (function(){
       
})() 



var UIController = (function(){
    //some code
})()


/*The reason the arguments are different from the original
to prevent changing the name of the varibale in the function
and only make those changes on the otuside.  */
var appController = (function(budgerCtrl,UICtrl){
    //some code
    var ctrlAddItem =  function(){

    }
    document.querySelector(".add_btn").addEventListener('click',function(){
        ctrlAddItem()
    })
    //adding global eventlistener not for a specific item
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13){
            ctrlAddItem()
        }
    })
   
})(budgetController,UIController);