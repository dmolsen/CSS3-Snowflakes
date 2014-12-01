/* initializes the various classes available for use when creating the snowflakes. classes are in snowflakes.css */
function Snowflakes(_pageContainer,_snowflakesContainer) {
	this.snowID			= 1;
	this.sizes			= new Array('', 'snowflakeSizeSM', 'snowflakeSizeMED', 'snowflakeSizeLRG');
	this.speeds			= new Array('', 'snowflakeSpeedSlow', 'snowflakeSpeedMed', 'snowflakeSpeedFast');
	this.opacities 		= new Array('', 'snowflakeOpacityFaint', 'snowflakeOpacityLight', 'snowflakeOpacityDark');
	this.delays			= new Array('', 'snowflakeDelay1', 'snowflakeDelay2', 'snowflakeDelay3', 'snowflakeDelay4', 'snowflakeDelay5', 'snowflakeDelay6');
	this.pageContainer	= document.getElementById(_pageContainer);
	this.snowflakesContainer = document.getElementById(_snowflakesContainer);
}

/* simple random number generator */
Snowflakes.prototype.randomFromTo = function(from,to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};

/* finds the keyframe we want to update */
/* from: http://blog.joelambert.co.uk/2011/09/07/accessing-modifying-css3-animations-with-javascript/*/
Snowflakes.prototype.findKeyframeAnimation = function(a) {
	var ss = document.styleSheets;
    for (var i = ss.length - 1; i >= 0; i--) {
        try {
            var s = ss[i],
                rs = s.cssRules ? s.cssRules : 
                     s.rules ? s.rules : 
                     [];

            for (var j = rs.length - 1; j >= 0; j--) {
                if ((rs[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rs[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE) && rs[j].name == a){
                    return rs[j];
                }
            }
        }
        catch(e) { /* Trying to interrogate a stylesheet from another domain will throw a security error */ }
    }
    return null;
};

/* updates the Keyframe Height for the 'falling' animation in snowflakes.css so snowflakes fall the full height of a page */
Snowflakes.prototype.updateKeyframeHeight = function() {
	if (keyframes = this.findKeyframeAnimation("falling")) {
		var height		= this.pageContainer.offsetHeight;
		if ((window.innerHeight) > height) {
			height 		= window.innerHeight;
		}
		if (keyframes.cssText.match(new RegExp('webkit'))) {
			var newRule = "100% { -webkit-transform: translate3d(0,"+height+"px,0) rotate(360deg); }";
		} else if (keyframes.cssText.match(new RegExp('moz'))) {
			var newRule = "-moz-transform: translate(0,"+height+"px) rotate(360deg);";
		}
		if (keyframes.insertRule) {
			keyframes.insertRule(newRule);
		} else {
			keyframes.appendRule(newRule);
		}
	}
}

/* Snowflakes.create(N) - creates N number of snowflakes & randomly assigns classes from the sizes, speeds, opacities, & delays arrays */
/* Snowflakes.moreSnow(N) - just an alias and just helpful as a simple way of referring to the function */
Snowflakes.prototype.create = Snowflakes.prototype.moreSnow = function(snowflakeCount) {
	var i 				= 0;
	this.updateKeyframeHeight();
	while (i < snowflakeCount) {
		var snowflake	= document.createElement('i');
		var size 		= this.sizes[this.randomFromTo(0, this.sizes.length-1)];
		var speed		= this.speeds[this.randomFromTo(0, this.speeds.length-1)];
		var opacity 	= this.opacities[this.randomFromTo(0, this.opacities.length-1)];
		var delay		= this.delays[this.randomFromTo(0, this.delays.length-1)];
		snowflake.setAttribute('id', 'snowId'+this.snowID);
		snowflake.setAttribute('class', 'snowflake '+size+' '+speed+' '+opacity+' '+delay);
		snowflake.setAttribute('style','left: '+this.randomFromTo(0, 100)+'%;');
		this.snowflakesContainer.appendChild(snowflake);
		i++;
		this.snowID++;
	}
};

/* Snowflakes.lessSnow(N) - removes N number of snowflakes from the DOM */
Snowflakes.prototype.lessSnow = function(snowflakeCount) {
	if (this.snowflakesContainer.childNodes.length > snowflakeCount) {
		var snowRemoveCount = 0;
		while (snowRemoveCount < snowflakeCount) {
			this.snowflakesContainer.removeChild(this.snowflakesContainer.lastChild);
			snowRemoveCount++;
		}
	}
}
