$("#declencheur").click(
    function(){
        $("body").prepend('<div class="container-fluid d-flex flex-column align-items-center" id="apparaitre"><div id="tempo" class="col xs-12 col-md-10 col-lg-8  d-flex flex-column  text-center mt-5 "  style="background-color: white;"><h4>Votre commande Paris/Lille, Paris/Bordeaux a bien était prise en compte.</h4><a id="croix" href="/homepage"><button  class="btn btn-danger">Retour</button></a></div></div>')
        $('#cacher').hide()
        $("#croix").click(
            function(){

                $('#apparaitre').remove()
                $('#cacher').show()
            });
        
    }
)