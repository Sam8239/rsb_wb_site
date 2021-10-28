$(function () {
  $(window).scroll(function () {
    var scrolltop = $(this).scrollTop();
    if (scrolltop >= 200) {
      $("#elevator_item").show();
    } else {
      $("#elevator_item").hide();
    }
  });
  $("#elevator").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
  });
  $(".qr").hover(
    function () {
      $(".qr-popup").show();
    },
    function () {
      $(".qr-popup").hide();
    }
  );
});

// slideshow

function slideSwitch() {
  var $active = $("#slideshow IMG.active");

  if ($active.length == 0) $active = $("#slideshow IMG:last");

  var $next = $active.next().length
    ? $active.next()
    : $("#slideshow IMG:first");

  $active.addClass("last-active");

  $next
    .css({ opacity: 0.0 })

    .addClass("active")

    .animate({ opacity: 1.0 }, 1000, function () {
      $active.removeClass("active last-active");
    });
}

$(function () {
  setInterval("slideSwitch()", 5000);
});

var pausecontent = new Array();

pausecontent[0] =
  "The state of Kolkata had always enjoyed a pre-eminent position in the field of Sports. <br /><br />In the early nineties, a downward trend in the standard of sports in different disciplines created a cause of anxiety. Accordingly in the year 1993 a re-organisation of the sports set up was done by merging the Sports. Kolkata had produced many stars of an International repute in all the disciplines recognised in India";

pausecontent[1] =
  "To retain/improve the pristine glory and the pre-eminent position in realm of sports, an independent Department of Sports came into existence in the year 1975.<br /><br /> Kolkata got 2nd Position in 32nd National Games held at Hyderabad in the year 2002 by winning 146 medals (54 Gold, 37 Silver and 55 Bronze). The performance of Kolkata State in the different National Games as well as National Championships held.";

pausecontent[2] =
  " Kolkata got 2nd Position in 32nd National Games held at Hyderabad in the year 2002 by winning 146 medals (54 Gold, 37 Silver and 55 Bronze).<br /><br /> The performance of Kolkata State in the different National Games as well as National Championships held so far speaks of the efforts put in by the Kolkata Sports Department in the development and promotion of sports in the state.. ";

function pausescroller(content, divId, divClass, delay) {
  this.content = content; //message array content

  this.tickerid = divId; //ID of ticker div to display information

  this.delay = delay; //Delay between msg change, in miliseconds.

  this.mouseoverBol = 0; //Boolean to indicate whether mouse is currently over scroller (and pause it if it is)

  this.hiddendivpointer = 1; //index of message array for hidden div

  document.write(
    '<div id="' +
      divId +
      '" class="' +
      divClass +
      '" style="position: relative; overflow: hidden"><div class="innerDiv" style="position: absolute; width: 100%" id="' +
      divId +
      '1">' +
      content[0] +
      '</div><div class="innerDiv" style="position: absolute; width: 100%; visibility: hidden" id="' +
      divId +
      '2">' +
      content[1] +
      "</div></div>"
  );

  var scrollerinstance = this;

  if (window.addEventListener)
    //run onload in DOM2 browsers

    window.addEventListener(
      "load",
      function () {
        scrollerinstance.initialize();
      },
      false
    );
  else if (window.attachEvent)
    //run onload in IE5.5+

    window.attachEvent("onload", function () {
      scrollerinstance.initialize();
    });
  else if (document.getElementById)
    //if legacy DOM browsers, just start scroller after 0.5 sec

    setTimeout(function () {
      scrollerinstance.initialize();
    }, 500);
}

pausescroller.prototype.initialize = function () {
  this.tickerdiv = document.getElementById(this.tickerid);

  this.visiblediv = document.getElementById(this.tickerid + "1");

  this.hiddendiv = document.getElementById(this.tickerid + "2");

  this.visibledivtop = parseInt(pausescroller.getCSSpadding(this.tickerdiv));

  //set width of inner DIVs to outer DIV's width minus padding (padding assumed to be top padding x 2)

  this.visiblediv.style.width = this.hiddendiv.style.width =
    this.tickerdiv.offsetWidth - this.visibledivtop * 2 + "px";

  this.getinline(this.visiblediv, this.hiddendiv);

  this.hiddendiv.style.visibility = "visible";

  var scrollerinstance = this;

  document.getElementById(this.tickerid).onmouseover = function () {
    scrollerinstance.mouseoverBol = 1;
  };

  document.getElementById(this.tickerid).onmouseout = function () {
    scrollerinstance.mouseoverBol = 0;
  };

  if (window.attachEvent)
    //Clean up loose references in IE

    window.attachEvent("onunload", function () {
      scrollerinstance.tickerdiv.onmouseover =
        scrollerinstance.tickerdiv.onmouseout = null;
    });

  setTimeout(function () {
    scrollerinstance.animateup();
  }, this.delay);
};

pausescroller.prototype.animateup = function () {
  var scrollerinstance = this;

  if (parseInt(this.hiddendiv.style.top) > this.visibledivtop + 5) {
    this.visiblediv.style.top = parseInt(this.visiblediv.style.top) - 5 + "px";

    this.hiddendiv.style.top = parseInt(this.hiddendiv.style.top) - 5 + "px";

    setTimeout(function () {
      scrollerinstance.animateup();
    }, 50);
  } else {
    this.getinline(this.hiddendiv, this.visiblediv);

    this.swapdivs();

    setTimeout(function () {
      scrollerinstance.setmessage();
    }, this.delay);
  }
};

pausescroller.prototype.swapdivs = function () {
  var tempcontainer = this.visiblediv;

  this.visiblediv = this.hiddendiv;

  this.hiddendiv = tempcontainer;
};

pausescroller.prototype.getinline = function (div1, div2) {
  div1.style.top = this.visibledivtop + "px";

  div2.style.top =
    Math.max(div1.parentNode.offsetHeight, div1.offsetHeight) + "px";
};

pausescroller.prototype.setmessage = function () {
  var scrollerinstance = this;

  if (this.mouseoverBol == 1)
    //if mouse is currently over scoller, do nothing (pause it)

    setTimeout(function () {
      scrollerinstance.setmessage();
    }, 100);
  else {
    var i = this.hiddendivpointer;

    var ceiling = this.content.length;

    this.hiddendivpointer = i + 1 > ceiling - 1 ? 0 : i + 1;

    this.hiddendiv.innerHTML = this.content[this.hiddendivpointer];

    this.animateup();
  }
};

pausescroller.getCSSpadding = function (tickerobj) {
  //get CSS padding value, if any

  if (tickerobj.currentStyle) return tickerobj.currentStyle["paddingTop"];
  else if (window.getComputedStyle)
    //if DOM2

    return window
      .getComputedStyle(tickerobj, "")
      .getPropertyValue("padding-top");
  else return 0;
};

$(document).ready(function () {
  slideShow();
});

function slideShow() {
  $("#gallery a").css({ opacity: 0.0 });

  $("#gallery a:first").css({ opacity: 1.0 });

  $("#gallery .caption").css({ opacity: 0.7 });

  $("#gallery .caption").css({
    width: $("#gallery a").find("img").css("width"),
  });

  $("#gallery .content")
    .html($("#gallery a:first").find("img").attr("rel"))

    .animate({ opacity: 0.7 }, 400);

  setInterval("gallery()", 6000);
}

function gallery() {
  var current = $("#gallery a.show")
    ? $("#gallery a.show")
    : $("#gallery a:first");

  var next = current.next().length
    ? current.next().hasClass("caption")
      ? $("#gallery a:first")
      : current.next()
    : $("#gallery a:first");

  var caption = next.find("img").attr("rel");

  next
    .css({ opacity: 0.0 })

    .addClass("show")

    .animate({ opacity: 1.0 }, 1000);

  current
    .animate({ opacity: 0.0 }, 1000)

    .removeClass("show");

  $("#gallery .caption")
    .animate({ opacity: 0.0 }, { queue: false, duration: 0 })
    .animate({ height: "1px" }, { queue: true, duration: 300 });

  $("#gallery .caption")
    .animate({ opacity: 0.7 }, 100)
    .animate({ height: "100px" }, 500);

  $("#gallery .content").html(caption);
}
