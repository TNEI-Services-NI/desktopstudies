function initialisePage() {

    if($(window).width() > 812){

        $("#sidebar").show();
        // $('#page-content-wrapper').css('margin-left',"230px");
        // $("#sidebar").css('margin-top',"0px");
        

    }
    else {
        // if(screen.orientation.type != "portrait-primary"){
        if(window.orientation != 0){
            $('#turn').css('display','flex');
            $('#page-content-wrapper').css('display','none');

        }else{
            $('#turn').css('display','none');
        }
        $( window ).on( "orientationchange", function( event ) {
            // if(screen.orientation.type != "portrait-primary"){
            if(window.orientation != 0){
                $('#turn').css('display','flex');
                $('#page-content-wrapper').css('display','none');
                location.reload();

            }else{
                $('#turn').css('display','none');
                $('#page-content-wrapper').css('display','flex');
                location.reload();
            }
          });


        window.onscroll = function (e) {  
            $("#sidebar").hide();
        } 
        $('#feat4').hide();

        $('#menuIcon').show();
        $('#logoImg0').show();
        $('#logoImg').hide();


        $('#footer').css('margin-left',"0px");
        $('footer_text').css('font-size',"1vw");
        
        $("#sidebar").css('margin-top',"7vh");
        $("#sidebar").css('height',"100%");
        $('#menuIcon').css('height',"4.3vh");
        $('#menuIcon').css('margin-left',"1vh");
        $('#menuIcon').css('width',"4.3vh");
        $('#nav').css('height',"7vh");

        $('#navbar').text("Current Grid Status");
        $('#page-content-wrapper').css('margin-top',"9vh");


        $('h4').addClass("mobileH4");

        $("#menuIcon").on("click",function(){
            if($("#sidebar").css("display") == "none")
            {
                $("#sidebar").show();
            } else {
                $("#sidebar").hide();
            }

            });

        if($(window).width() > 320){
            $('#navbar').css('margin-left',"15vw");
        }
        else {

            $('#logoImg0').css('margin-left',"5vw");

            $('#navbar').css('margin-left',"12vw");
        }
    }

    $("#nav").show();
        // if(window.orientation != 0){
        //     $('#turn').css('display','block');
        //     $('#page-content-wrapper-pc').css('display','none');
        //     $('#nav').css('display','none');
        //     $('#footer').css('display','none');
            

        // }else{
        //     $('#turn').css('display','none');
        //     $('#page-content-wrapper-pc').css('display','flex');
        //     $('#nav').css('display','flex');
        //     $('#footer').css('display','flex');
        // }
        // $( window ).on( "orientationchange", function( event ) {
        //     // if(screen.orientation.type != "portrait-primary"){
        //     if(window.orientation != 0){
        //         $('#turn').css('display','block');
        //         $('#page-content-wrapper-pc').css('display','none');
        //         $('#nav').css('display','none');
        //         $('#footer').css('display','none');

        //         location.reload();

        //     }else{
        //         $('#turn').css('display','none');
        //         $('#page-content-wrapper-pc').css('display','flex');
        //         $('#nav').css('display','flex');
        //         $('#footer').css('display','flex');
        //         location.reload();
        //     }
        //   });
          
        
    //     $('#feat4').hide();
            
    //     $('#menuIcon').show();
    //     $('#logoImg0').show();
    //     $('#logoImg').hide();


    //     $('#footer').css('margin-left',"0px");
    //     $('#footer_text').css('font-size',"3.3vw");

        
    //     $("#sidebar").css('margin-top',"7vh");
    //     $("#sidebar").css('height',"100%");
    //     $('#menuIcon').css('height',"4.3vh");
    //     $('#menuIcon').css('margin-left',"1vh");
    //     $('#menuIcon').css('width',"4.3vh");
    //     $('#nav').css('height',"7vh");
        
    //     $('#navbar').text("Current Grid Status");
    //     $('#page-content-wrapper-pc').css('margin-top',"8.5vh");
        

    //     $('h4').addClass("mobileH4");

    //     $("#menuIcon").on("click",function(){
    //         if($("#sidebar").css("display") == "none")
    //         {
    //             $("#sidebar").show();
    //         } else {
    //             $("#sidebar").hide();
    //         }
            
    //         });

    //     if($(window).width() > 320){
    //         $('#navbar').css('margin-left',"15vw");
    //     }
    //     else {
            
    //         $('#logoImg0').css('margin-left',"5vw");
    
    //         $('#navbar').css('margin-left',"12vw");
    //     }
    // }
    
    // $("#nav").show();
}
 
    