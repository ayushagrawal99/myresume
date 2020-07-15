
//   ****************************   smooth scroll   ************************************ 


// 1st we find out in which tag we applied click event. so we traverse in all list anchor tag
var navAnchorTag= document.querySelectorAll('.nav-menu a');
       for(var i=0;i<navAnchorTag.length;i++){
          navAnchorTag[i].addEventListener('click',function(event){
			  // now we stop the previous behaviour on the anchor tags
			  event.preventDefault();
			  
			  // now we find out that on which tag we applied the click event
              var elementId=this.textContent.trim().toLowerCase();
			  var element=document.getElementById(elementId);

			  // for tavel to that page we use setInterval function
              var interval= setInterval(function(){

				// we find out that ki how much distance left to reach that section using getBoundingClientRect() function
				  var coordinate=element.getBoundingClientRect();

				  // check karte h ki wo section top pe pahucha ya nahi
                  if(coordinate.top<=0){
                    clearInterval(interval);
                    return;
                  }
                  window.scrollBy(0,50);
              },50);
          });
	   }
	   


//   *****************************     fill the skills bar     ********************************* 



// we find out the skill container where skill bars are present and find out the skill progess bar
var progressBar = document.querySelectorAll('.skill-progress>div');
var skillsContainer = document.getElementById('skills-container')

// when we reach skill container then we fill the bars only onces, not on every scroll we fill the bars so we keep it false rightnow
var animationDone = false;

// we scroll the window to check whether the skill section visible on screen or not
window.addEventListener('scroll', checkScroll);


// 1st we inialize all the bar to width 0 bcz 0 se jaha tak jana h waha jayega
function initializeBar(){
	for(let bar of progressBar){
		bar.style.width = 0 +'%';
	}
}
initializeBar();


// this will use to fill the bars
function fillBars(){
	for(let bar of progressBar){
		let targetWidth = bar.getAttribute('data-bar-width');
		let currentWidth = 0;

		// bar fill krenge ab
		let interval = setInterval(function(){
			if(currentWidth > targetWidth){
				clearInterval(interval);
				return;
			}
			currentWidth++;
			bar.style.width = currentWidth + '%';
		},10)
	}
}

function checkScroll(){
	// skill section jb screen pe dikhna visible ho jayega to iska mtlb top se skill sec ki height km ho gai hogi viewport height se
	// tbbi to skill sec visible hoga screen pe, viewport height se jayada height skill sec ki rahi to wo to viewport ke neeche hoga 

	// abbi skill container or kitta neeche h wo top(jaha hum h) se height dega
	var coordinate = skillsContainer.getBoundingClientRect();
	
	if(!animationDone && coordinate.top < window.innerHeight){
		// ab skill container visible on screen and animation(fill bar) not done till now

		animationDone = true;
		fillBars();
	} else if(coordinate.top > window.innerHeight){
				animationDone = false;
				initializeBar();
			}
}