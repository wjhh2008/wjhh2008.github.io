$.ajax({
    url: "pdf/",
    success: function(data){
           $(data).find("a:contains(.pdf)").each(function(){
                       // will loop through 
                       var images = $(this).attr("href");
                       $('<p></p>').html(images).appendTo('a div of your choice')

                    });
             }
});
