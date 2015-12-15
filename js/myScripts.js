/*====================================================================================================
JAVASCRIPT FOR TREEHOUSE PHOTO GALLERY PROJECT
======================================================================================================*/

"use strict";

var width = window.innerWidth;
var height = window.innerHeight;

/*==============================
LIGHTBOX 
==============================*/

var pic = document.getElementsByClassName("pic");
var lightbox = document.getElementsByClassName("lightbox");
var lightboxPic = document.getElementsByClassName("lightboxPic");
var caption = document.getElementsByClassName("caption");

var bigPics = ["photos/01.jpg", "photos/02.jpg", "photos/03.jpg", "photos/04.jpg", "photos/05.jpg", "photos/06.jpg", "photos/07.jpg", "photos/08.jpg", "photos/09.jpg", "photos/10.jpg", "photos/11.jpg", "photos/12.jpg"];

// MAKE IMAGES CLICKABLE, OPEN LIGHTBOX AND SET OPTIONS
for (var i = 0; i < pic.length; i++) {
	pic[i].addEventListener("click", function(id){
		id = this.id;
		lightbox[0].style.display = "block";
		
		// MAKE LIGHTBOX OPEN IN WINDOW INSTEAD OF TOP OF DOCUMENT IN CASE OF USER SCROLL - ACOUNTS FOR CORSS-BROWSER 
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			lightbox[0].style.top = document.documentElement.scrollTop + "px";
		} else if (navigator.userAgent.indexOf("AppleWebKit") > 0 || navigator.userAgent.indexOf("Trident") > 0) {
			lightbox[0].style.top = window.pageYOffset + "px";
		}
		
		// ADD CAPTION TO PIC
		for (var j = 0; j < pic.length; j++) {
			if (j == id) {
				caption[j].style.display = "block";
				lightboxPic[0].style.background = "url('" + bigPics[j] + "')";
				counter = j;
			}
		}
	});
}

// CLOSE LIGHTBOX
var closeLightbox = document.getElementsByClassName("closeLightbox");

closeLightbox[0].onclick = function() {
	lightbox[0].style.display = "none";
	for (var i = 0; i < caption.length; i++) {
		caption[i].style.display = "none";
	}
};

/*======================================================
ARROWS - CYCLE THROUGH PHOTOS AND SUBTITLE IN LIGHTBOX
=======================================================*/

var arrowLeft = document.getElementsByClassName("arrowLeft");
var arrowRight = document.getElementsByClassName("arrowRight");

var counter;

// PREVIOUS ARROW - SCROLL BACKWARDS THROUGH IMAGES AND SUBTITLES
arrowLeft[0].onclick = function() {
	if (counter == 0) {
		lightboxPic[0].style.background = "url('" + bigPics[bigPics.length - 1] + "')";
		counter = bigPics.length - 1;
		caption[0].style.display = "none";
		caption[counter].style.display = "block";
	} else {
		lightboxPic[0].style.background = "url('" + bigPics[counter - 1] + "')";
		caption[counter].style.display = "none";
		counter -= 1;
		caption[counter].style.display = "block";
	}
};

// NEXT ARROW - SCROLL FORWARDS THROUGH IMAGES AND SUBTITLES
arrowRight[0].onclick = function() {
	if (counter == bigPics.length - 1) {
		lightboxPic[0].style.background = "url('" + bigPics[0] + "')";
		caption[counter].style.display = "none";
		counter = 0;
		caption[0].style.display = "block";
	} else {
		lightboxPic[0].style.background = "url('" + bigPics[counter + 1] + "')";
		caption[counter + 1].style.display = "block";
		caption[counter].style.display = "none";
		counter += 1;
	}
};

// KEYBOARD ARROWS TO SCROLL THROUGH LIGHTBOX IMAGES AND SUBTITLE
document.onkeydown = function(e) {
	e = e || window.event;
	if (e.keyCode == "37") {
		if (counter == 0) {
			lightboxPic[0].style.background = "url('" + bigPics[bigPics.length - 1] + "')";
			counter = bigPics.length - 1;
			caption[0].style.display = "none";
			caption[counter].style.display = "block";
		} else {
			lightboxPic[0].style.background = "url('" + bigPics[counter - 1] + "')";
			caption[counter].style.display = "none";
			counter -= 1;
			caption[counter].style.display = "block";
		}	
	} else if (e.keyCode == "39") {
		if (counter == bigPics.length - 1) {
			lightboxPic[0].style.background = "url('" + bigPics[0] + "')";
			caption[counter].style.display = "none";
			counter = 0;
			caption[0].style.display = "block";
		} else {
			lightboxPic[0].style.background = "url('" + bigPics[counter + 1] + "')";
			caption[counter + 1].style.display = "block";
			caption[counter].style.display = "none";
			counter += 1;
		}
	}
};


/*================================
SEARCH
=================================*/

var input = document.getElementsByTagName("input");

// SEARCH CAPTIONS THAT MATCH INPUT, CHANGE ALL NON-MATCHING PICS GREY AND HIGHLIGHT ALL MATCHING PICS
function cerch(key) {
	var entry = new RegExp(key, "gi");
	
	for (var i = 0; i < caption.length; i++) {
		var success = caption[i].textContent.match(entry);
		
		if (success === null) {
			pic[i].style.webkitFilter = "grayscale(1)";
			pic[i].style.filter = "grayscale(1)";
			pic[i].style.opacity = "0.5";
		} else {
			pic[i].style.webkitFilter = "grayscale(0) drop-shadow(10px 10px 10px rgba(50,50,50,.5))";
			pic[i].style.filter = "grayscale(0) drop-shadow(10px 10px 10px rgba(50,50,50,.5))";
			pic[i].style.opacity = "1";
		}
	}  
};

// CALL SEARCH FUNCTION WITH EVERY ENTRY INTO THE INPUT
input[0].oninput = function() {
	cerch(input[0].value)
	// DISCARD HIGHLIGHTING IF INPUT FIELD IS EMPTIED
	if (input[0].value == null || input[0].value == "") {
		for (var i = 0; i < caption.length; i++) {
			pic[i].style.webkitFilter = "none";
			pic[i].style.filter = "none";
			pic[i].style.opacity = "1";
		}
	}
};

