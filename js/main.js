$(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('.nav').addClass('affix');
                console.log("OK");
            } else {
                $('.nav').removeClass('affix');
            }
        });
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

    if($(this).hasClass('active')){
      console.log("Active");
      $("#wrapper").animate({
           left: '-50%'
       });
      $('#mainListDiv').addClass("open");


          $('.navlinks a').onClick(function(){
            console.log("a clicked");
            $("#wrapper").animate({
                 left: '0px'
             });
            $('.navTrigger').removeClass('active');
            $('.navTrigger').removeClass('show_list');
            $('#mainListDiv').removeClass("open");
          });

    }
    if(!$(this).hasClass('active')){
      console.log("Active");
      $("#wrapper").animate({
           left: '0px'
       });
      $('#mainListDiv').removeClass("open");
    }


});

function closeList(){
  if($('.navTrigger').hasClass('active') && $('#mainListDiv').hasClass('show_list open')){
    console.log("Active");
    console.log("a clicked");
      $("#wrapper").animate({
        left: '0px'
        });
      $('.navTrigger').removeClass('active');
      $('#mainListDiv').removeClass("open show_list");

  }
};

$(window).on('resize',_.debounce(function(){
  var win = $(this); //this = window
  if (win.width() >= 1080) {
    console.log(">1080");
    $("#wrapper").animate({
      left: '0px'
      });
    $('.navTrigger').removeClass('active');
    $('#mainListDiv').removeClass("open show_list");
    }
},50));

AOS.init();

var pieChart = function() {
  $('.chart').easyPieChart({
    scaleColor: false,
    lineWidth: 4,
    lineCap: 'butt',
    barColor: '#FF9000',
    trackColor:	"#f5f5f5",
    size: 160,
    animate: 1000
  });
};

$(function() {
  if ($('#skills').length > 0 ) {
    $('#skills').waypoint( function( direction ) {

      if( direction === 'down' && !$(this.element).hasClass('animated') ) {
        setTimeout( pieChart , 400);
        $(this.element).addClass('animated');
      }

    } , { offset: '90%' } );
  }

});
