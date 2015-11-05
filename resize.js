$(window).ready(function(){
	$('#images img').fadeTo(0,0);
});
// execute this function as soon as the window is done loading
$(window).load(function(){
	// The currently chosen image
	var chosenImage = 0;
	// Just a helper function to generate random numbers
	randomNum = function(range){
		return  Math.floor(Math.random() * range);
	}
	// fill the '#images' div with divs. in this case, 15
	for(var i=0; i<15; i++){
		$('#images').append('<div>');
	}
	function createImages(){
		$('#images img').each(function(){
			// attr = change attribute. data-name = data attribute for your choice.
			// Store the original size in the html tag
			$(this).attr('data-height', $(this).height());
			$(this).attr('data-width', $(this).width());
			// Store the current scale
			$(this).attr('data-scale', 1);
			// Display the original size
			$(this).text($(this).width()+' x '+$(this).height());
		});		
	};
	// Change the scale of an element.
	function changeScale(element, scale){
		element = $(element);
		element.attr('data-scale', scale);
		element.width(scale*element.attr('data-width'));
		element.height(scale*element.attr('data-height'));
		return element;
	}
	createImages();
	var stopPositions = [];
	// Make the images transparent before they are positioned.
	$('#images img').stop().fadeTo(0,0);
	function positionImages(){
		// an array that holds the positions of the stops
		stopPositions = [];
		// goes over each image, sets it's size, and arranges the images from the left to the right.
		// the counter for the position from left of the images
		var leftPos =0;
		$('#images div').each(function(){
			stopPositions.push(leftPos);
			$(this).css('left', leftPos);
			leftPos += $(this).outerWidth()+24;
		});
		// *** fade in after positioning
		$('#images img').stop().fadeTo(300,1);
	};
	function resizeImages(){
		// Find the tallest image
		var maxImageHeight = 0;
		$('#images img').each(function(){
			if ($(this).attr('data-height')>maxImageHeight) {
				maxImageHeight = $(this).attr('data-height');
			}
		});
		// If it is too tall:
		if (maxImageHeight+180 > $(window).height()){
			var wantedHeight = $(window).height()-230;
			// calculate the wanted scale:
			var wantedScale = wantedHeight/maxImageHeight;
			wantedScale = Math.min(wantedScale,1);
			// change scale for all images:
			$('#images img').each(function(){
				changeScale(this, wantedScale);
			});
		// if it is not too tall just set the scale to 1 for all images:
		} else {
			$('#images img').each(function(){
				changeScale(this, 1);
			});			
		}
	}
	
resizeImages();
	positionImages();
	// Show the window height and current scale in the #info div:
	function showInfo(){
		$('#info').html('');
		$('#info').append('window height: ');
		$('#info').append($(window).height());
		$('#info').append(' // scale: ');
		// round it to two decimals:
		var scale = $('#images img').eq(0).attr('data-scale');
		scale *= 100;
		scale = Math.round(scale)/ 100;
		$('#info').append(scale);
	}
	showInfo();
	// this function happens when the window resizes:
	$(window).resize(function(){
		resizeImages();
		positionImages();
		showInfo();
	});
	// a click function - what happens when clicking the right button
	$('#rightcontrol').click(function(){
		// if it is not the rightmost image
		if ($('#images img').length>chosenImage){
			// animates the image to the correct location
			$('#images').animate({
				'left': -stopPositions[chosenImage+1]
			},200);
			// changes the variable that holds the chosen image
			chosenImage +=1;
		}
	});
	// same for the left button.
	$('#leftcontrol').click(function(){
		if (0<chosenImage){
			$('#images').animate({
				'left': -stopPositions[chosenImage-1]
			},200);
			chosenImage -=1;
		}
	});
})
