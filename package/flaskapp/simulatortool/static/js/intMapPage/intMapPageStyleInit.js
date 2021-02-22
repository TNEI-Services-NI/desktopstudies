function initialisePage() {

    // alert($(window).width());

    if($(window).width() > 812){
        // $("#pcBody").show();
        $('#page-content-wrapper-pc').show();
        $('#mapPC').attr('id', 'map');
        $("#sidebar").show();
        $('#headCont').css('margin-left',"20px");
        $('#featureCont').css('margin-left',"20px");
        $('#footer').show();

    }
    else {
        if(window.orientation != 0){
            $('#turn').css('display','flex');
            $('#page-content-wrapper-mobile').css('display','none');

        }else{
            $('#turn').css('display','none');
            $('#page-content-wrapper-mobile').css('display','flex');
        }
        $( window ).on( "orientationchange", function( event ) {
            if(window.orientation != 0){
                $('#turn').css('display','flex');
                $('#page-content-wrapper-mobile').css('display','none');
                location.reload();

            }else{
                $('#turn').css('display','none');
                $('#page-content-wrapper-mobile').css('display','flex');
                location.reload();
            }
          });
        $('#page-content-wrapper-mobile').show();
        $('#mapMobile').css('z-index',"0");
        $('#mapMobile').attr('id', 'map');

        $('#genAreaChart').hide();
        $('#menuIcon').show();
        $('#logoImg0').show();
        $('#logoImg').hide();


        window.onscroll = function (e) {  
            $("#sidebar").hide();
        } 
        // $('#footer').css('margin-left',"0px");
        // $('#footer_text').css('font-size',"3.3vw");

        $("#sidebar").css('z-index',"1");
        $("#sidebar").css('margin-top',"7vh");
        $("#sidebar").css('height',"100%");
        $('#menuIcon').css('height',"4.3vh");
        $('#menuIcon').css('margin-left',"1vh");
        $('#menuIcon').css('width',"4.3vh");
        $('#nav').css('height',"7vh");
        $("#nav").css('z-index',"2");
        $('#navbar').css('margin-left',"15vw");
        $('#navbar').text("GB Generation Mix");
        // $('#page-content-wrapper-mobile').css('margin-top',"8.5vh");
        
        $('#footer').css('display','none');

        if($(window).width() <= 320){
            
        }

        $('h4').addClass("mobileH4");

        $("#menuIcon").on("click",function(){
            if($("#sidebar").css("display") == "none")
            {
                $("#sidebar").show();
            } else {
                $("#sidebar").hide();
            }
            
            });

    }
    // alert(screen.orientation.type);
    $("#nav").show();
    
    
}
 
    