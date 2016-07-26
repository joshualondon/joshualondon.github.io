$(document).ready(function() {

    // Init noteable work owl carousel
	$('.fyz-showoff').owlCarousel({
	    items: 1,
	    singleItem: true,
	    autoPlay: true,
	    stopOnHover: true
    });

	/**
	*	Waypoints
	*/
	// bring in the laptop & phone images
	$('.nm-feature').waypoint(function(direction) {
		$('.nm-feature .showoff').toggleClass('get-fancy');
	}, {offset: '80%'});

	// push the laptop & phone aside a bit
	$('.nm-feature').waypoint(function(direction) {
		$('.nm-feature .showoff').toggleClass('less-fancy');
	}, {offset: '40%'});

	// bring in the feature description
	$('.nm-feature').waypoint(function(direction) {
		$('.nm-feature .feature-desc').toggleClass('is-visible');
	}, {offset: '30%'});

	/**
	*	I know there's a much more elegant way of doing this.
	*	@@refactor
	*/
	function jobReset() {
		$('.job-desc').removeClass('is-visible');
	}

	$('.nm').on('click', function() {
		jobReset();
		$('.job-nm').addClass('is-visible');
	});

	$('.mbl').on('click', function() {
		jobReset();
		$('.job-mbl').addClass('is-visible');
	});

	$('.fedex').on('click', function() {
		jobReset();
		$('.job-fedex').addClass('is-visible');
	});

	$('.entech').on('click', function() {
		jobReset();
		$('.job-entech').addClass('is-visible');
	});

	$('.jvlnet').on('click', function() {
		jobReset();
		$('.job-jvlnet').addClass('is-visible');
	});

	/**
	*	Cue Stuart
	*	Completely unnecessary but having a little fun
	*/
	$('.cue-stuart').on('click', function(e) {
		e.preventDefault();
		$('.stuart').addClass('dance').removeClass('done');

		setTimeout(function() {
			$('.stuart').removeClass('dance').addClass('done');
		}, 4000);
	});

	var contentSections = $('article'),
		navigationItems = $('.primary-nav a');

	updateNavigation();
	$(window).on('scroll', function() {
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //smooth scroll to second section
    $('.see-more').on('click', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .hamburger').on('click', function() {
    	$('.touch .primary-nav').toggleClass('open');
    });

    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch .primary-nav a').on('click', function() {
    	$('.touch .primary-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function() {
			$this = $(this);
			var activeSection = $('.primary-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if (($this.offset().top - $(window).height()/2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop())) {
				navigationItems.eq(activeSection).addClass('is-active');
			} else {
				navigationItems.eq(activeSection).removeClass('is-active');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}










	// Data object: RSS feed URL, number of entries to return, result format, API version
	   var pocket = {
	     q: 'https://getpocket.com/users/joshua.london/feed/all',
	     num: 12,
	     output: 'json' ,
	     v: '1.0'
	   };

	   var codePen = {
		   q: 'http://codepen.io/joshualondon/public/feed/',
		   num: 12,
		   output: 'json',
		   v: '1.0'
	   };

	   // AJAX call to Google Feed API which converts ATOM/RSS feed to JSON
	   $.ajax({
	     url:'http://ajax.googleapis.com/ajax/services/feed/load',
	     type : "GET",
	     dataType : "jsonp",
	     data: pocket,
	     success: function (json) {

	       var feed = json.responseData.feed;
	       if(!feed) return;
	       var entries = feed.entries;
	       if(!entries) return;

	       var html = '';
	       var publishedDate = new Array();

	       for (var i=0; i<entries.length; i++) {

	         publishedDate = entries[i].publishedDate.split(' ');

	         html += '<li>';
	         html += '<h4><a href="'+ entries[i].link +'">'+ entries[i].title +'</a></h4>' +
	           '<p>'+ entries[i].contentSnippet +'</p>';
	         html += '<p>' + publishedDate[2] + ' ' + publishedDate[1] + ', ' + publishedDate[3] + '</p>';
	         html += '</li>';
	       };

	       $('#pocket-feed > ul').html(html);
	     }
	   });

	   $.ajax({
	     url:'http://ajax.googleapis.com/ajax/services/feed/load',
	     type : "GET",
	     dataType : "jsonp",
	     data: codePen,
	     success: function (json) {

	  	 var feed = json.responseData.feed;
	  	 if(!feed) return;
	  	 var entries = feed.entries;
	  	 if(!entries) return;

	  	 var html = '';
	  	 var publishedDate = new Array();

	  	 for (var i=0; i<entries.length; i++) {

	  	   publishedDate = entries[i].publishedDate.split(' ');

	  	   html += '<li>';
	  	   html += '<h4><a href="'+ entries[i].link +'">'+ entries[i].title +'</a></h4>' +
	  		 '<p>'+ entries[i].contentSnippet +'</p>';
	  	   html += '<p>' + publishedDate[2] + ' ' + publishedDate[1] + ', ' + publishedDate[3] + '</p>';
	  	   html += '</li>';
	  	 };

	  	 $('#codepen-feed > ul').html(html);
	     }
	   });




});
