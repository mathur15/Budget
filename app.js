var budgetController = (function(){
          var x = 23
          var add = function(a){
          return x + a 
          }
          return{
                //this is a way of making private functions
                // and variables because of the closure created
                //By doing this we provide a sort of public acces
                //to stuff we want to give access to. 
                publicTest:function(b){
                    return (add(b))
                }
          }
})() 

var UIController = (function(){
    //some code
})()

/*The reason the arguments are different from the original
to prevent changing the name of the varibale in the function
and only make those changes on the otuside.  */
var appController = (function(budgerCtrl,UICtrl){
    //some code
    var z = budgerCtrl.publicTest(5);

    return{
        anotherPublicMethod: function(){
            console.log(z)
        }
    }
})(budgetController,UIController);