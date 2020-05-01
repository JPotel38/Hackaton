 var order = document.getElementById("button")

var total = order.dataset.total;
 
 
 
 
 $("#declencheur").click(
     function(){
        alert("Votre Commande de " + total + "€ a été validée !")
        
     }
 )