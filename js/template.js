/*
Version: 1.0
Author: your name
Author URL: your site
License: (if other than below)
This is a FREE script and is dual licensed under the following:
http://www.opensource.org/licenses/mit-license.php | http://www.gnu.org/licenses/gpl.html
Aside from these comments, you may modify and distribute this file as you please. Have fun!
*/
$(document).ready(function(){
// Draggable Functions - start
	//let zoomIn = true;
	$('.highlight').draggable();
	const getNum = val => parseInt(val.slice(0,val.length-2),10);
	function minPos(){
		let mgT = getNum($('#mapGroup').css('top'));//$('#mapGroup').css('top').substring(0, $('#mapGroup').css('top').length-2);
		let mgL = getNum($('#mapGroup').css('left'));//$('#mapGroup').css('left').substring(0, $('#mapGroup').css('left').length-2);
		let mgH = getNum($('#mapGroup').css('height'));//$('#mapGroup').css('height').substring(0, $('#mapGroup').css('height').length-2);
		let mgW = getNum($('#mapGroup').css('width'));//$('#mapGroup').css('width').substring(0, $('#mapGroup').css('width').length-2);
		//console.log(`mgT is currently: ${mgT}`);
		//console.log(`mgL is currently: ${mgL}`);
		offsetT = (mgT/mgH)*-242; // number is Height of minimap
		offsetL = (mgL/mgW)*-200; // number is Width of minimap
		$('#mmSite').css({'top':offsetT,'left':offsetL});
	};
	$('#mapGroup').draggable({
		drag: function(){
			minPos();
		},
		stop: function() {
        	repMap();
        }
     });
	 $('#mmSite').draggable({
		drag: function(){
			let mgT = getNum($('#mmSite').css('top'));//$('#mmSite').css('top').substring(0, $('#mmSite').css('top').length-2);
			let mgL = getNum($('#mmSite').css('left'));//$('#mmSite').css('left').substring(0, $('#mmSite').css('left').length-2);
			let mgH = getNum($('#minMap img').css('height'));//$('#minMap img').css('height').substring(0, $('#minMap img').css('height').length-2);
			let mgW = getNum($('#minMap img').css('width'));//$('#minMap img').css('width').substring(0, $('#minMap img').css('width').length-2);
			//if(zoomIn){
				offsetT = (mgT/mgH)*-2420; // Height of the full map
				offsetL = (mgL/mgW)*-2000; // Width of the full map
			/*} else {
				offsetT = (mgT/mgH)*-1210;
				offsetL = (mgL/mgW)*-1000;
			};*/
			$('#mapGroup').css({'top':offsetT,'left':offsetL});
		},
		stop: function() {
        	repMap();
        }
     });
	$('#mapGroup').on( "mousedown", function(){
		$('#mapGroup').stop();
	});
	// ALL THINGS ZOOM
	$('#mapGroup').on('dblclick',zoom);
	function zoom(){
		var mgH = $('#mapGroup').css('height').substring(0, $('#mapGroup').css('height').length-2);
		var mgW = $('#mapGroup').css('width').substring(0, $('#mapGroup').css('width').length-2);
		console.log(mgH+"  "+mgW);
		if(zoomIn){
			mgH = mgH/2;
			mgW = mgW/2;
			$('#mapGroup').css({'height' : mgH, 'width': mgW});
			zoomIn = false;
			$('#theMap').css({'height': mgH, 'width': mgW});
			$('.highlight').css({'height': '22px', 'width': '22px', 'border-radius': '7px'});
			$('.highlight').each(function(){
				var myT = $(this).css('top').substring(0, $(this).css('top').length-2);
				var myL = $(this).css('left').substring(0, $(this).css('left').length-2);
				myT = myT/2;
				myL = myL/2;
				$(this).css({'top':myT,'left':myL});				
			});
			$(window).trigger('resize');
		} else {
			mgH = mgH*2;
			mgW = mgW*2;
			$('#mapGroup').css({'height' : mgH, 'width': mgW});
			zoomIn = true;
			$('#theMap').css({'height': mgH, 'width': mgW});
			$('.highlight').css({'height': '44px', 'width': '44px', 'border-radius': '15px'});
			$('.highlight').each(function(){
				var myT = $(this).css('top').substring(0, $(this).css('top').length-2);
				var myL = $(this).css('left').substring(0, $(this).css('left').length-2);
				myT = myT*2;
				myL = myL*2;
				$(this).css({'top':myT,'left':myL});				
			});
			$(window).trigger('resize');
		};
	};
	// END ZOOM*/
	let bottomBind;
	let rightBind;
	$(window).resize(function(){
		getDimensions();
		repMap();
	});
	function getDimensions(){
		let winW = $(window).width();
		let mapW = $('#theMap').width();
		rightBind = (mapW - winW)*-1;
		let winH = $(window).height();
		let mapH = $('#theMap').height();
		bottomBind = (mapH - winH)*-1;
		//if(zoomIn){
			$('#mmSite').css({'height':$(window).height()/10,'width':$(window).width()/10});
		//} else {
			//$('#mmSite').css({'height':$(window).height()/5,'width':$(window).width()/5});
		//};

	};
	function repMap(){
		let mapLeft = getNum($('#mapGroup').css('left')); //$('#mapGroup').css('left').substring(0, $('#mapGroup').css('left').length-2);
		let mapTop = getNum($('#mapGroup').css('top'));//$('#mapGroup').css('top').substring(0, $('#mapGroup').css('top').length-2);
		if(mapLeft>0){
			$('#mapGroup').stop().animate({left:'0px'},{duration:1500,queue: false, easing: 'swing',step: minPos});
		} else if(mapLeft<rightBind){
			$('#mapGroup').stop().animate({left:rightBind+'px'},{duration:1500,queue: false, easing: 'swing',step: minPos});
		};
		if(mapTop>0){
			$('#mapGroup').animate({top:'0px'},{duration:1500,queue: false, easing: 'swing',step: minPos});
		} else if(mapTop<bottomBind){
			$('#mapGroup').animate({top:bottomBind+'px'},{duration:1500,queue: false, easing: 'swing',step: minPos});
		};
		//setTimeout(minPos,1500);
	};
// Draggable Functions - end
	getDimensions();
// Sliding Nav - start
	function xToBurgie(){
		$('nav').animate({left: '-350px', height: '20px'}, 1500, 'swing', function(){
			$('#close').empty().append('|||');
			$('#close').css('transform','rotate(90deg)');
		});
		$('#close').off('click').on('click', burgieToX);	
	};
	function burgieToX(){
		$('nav').animate({left: '5px', height: '315px'}, 1500, 'swing', function(){
			$('#close').empty().append('X');
			$('#close').css('transform','rotate(0deg)');
		});
		$('#close').off('click').on('click', xToBurgie);	
	};
	$('#close').on('click', xToBurgie);
// Sliding Nav - end
// Pop up for Sliding Nav
	$('#loc1').on('click', function(){
		$('#mapGroup').stop().animate({top: '-1000px', left: '-1000px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop1').css({top: '1200px', left: '1550px', opacity: '1'});	
		});
	});
	$('#loc2').on('click', function(){
		$('#mapGroup').stop().animate({top: '-900px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop2').css({top: '1067px', left: '1300px', opacity: '1'});
		});
	});
	$('#loc3').on('click', function(){
		$('#mapGroup').stop().animate({top: '-800px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop3').css({top: '995px', left: '1351px', opacity: '1'});
		});
	});
	$('#loc4').on('click', function(){
		$('#mapGroup').stop().animate({top: '-700px', left: '-900px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop4').css({top: '850px', left: '1425px', opacity: '1'});	
		});
	});
	$('#loc5').on('click', function(){
		$('#mapGroup').stop().animate({top: '-650px', left: '-1200px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop5').css({top: '800px', left: '1850px', opacity: '1'});
		});
	});
	$('#loc6').on('click', function(){
		$('#mapGroup').stop().animate({top: '-550px', left: '-900px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop6').css({top: '722px', left: '1550px', opacity: '1'});
		});
	});
	$('#loc7').on('click', function(){
		$('#mapGroup').stop().animate({top: '-450px', left: '-800px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop7').css({top: '650px', left: '1477px', opacity: '1'});	
		});
	});
	$('#loc8').on('click', function(){
		$('#mapGroup').stop().animate({top: '-400px', left: '-1000px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop8').css({top: '550px', left: '1670px', opacity: '1'});
		});
	});
	$('#loc9').on('click', function(){
		$('#mapGroup').stop().animate({top: '-200px', left: '-800px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop9').css({top: '380px', left: '1400px', opacity: '1'});
		});
	});
	$('#loc10').on('click', function(){
		$('#mapGroup').stop().animate({top: '-50px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop10').css({top: '200px', left: '1260px', opacity: '1'});
		});
	});
	// Pop up for sites
	$('#site_1').on('click', function(){
		$('#mapGroup').stop().animate({top: '-1000px', left: '-1000px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop1').css({top: '1200px', left: '1550px', opacity: '1'});
		});
	});
	$('#site_2').on('click', function(){
		$('#mapGroup').stop().animate({top: '-900px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop2').css({top: '1067px', left: '1300px', opacity: '1'});
		});
	});
	$('#site_3').on('click', function(){
		$('#mapGroup').stop().animate({top: '-800px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop3').css({top: '995px', left: '1351px', opacity: '1'});
		});
	});
	$('#site_4').on('click', function(){
		$('#mapGroup').stop().animate({top: '-700px', left: '-900px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop4').css({top: '850px', left: '1425px', opacity: '1'});	
		});
	});
	$('#site_5').on('click', function(){
		$('#mapGroup').stop().animate({top: '-650px', left: '-1200px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop5').css({top: '800px', left: '1850px', opacity: '1'});
		});
	});
	$('#site_6').on('click', function(){
		$('#mapGroup').stop().animate({top: '-550px', left: '-900px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop6').css({top: '722px', left: '1550px', opacity: '1'});
		});
	});
	$('#site_7').on('click', function(){
		$('#mapGroup').stop().animate({top: '-450px', left: '-800px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop7').css({top: '650px', left: '1477px', opacity: '1'});	
		});
	});
	$('#site_8').on('click', function(){
		$('#mapGroup').stop().animate({top: '-400px', left: '-1000px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop8').css({top: '550px', left: '1670px', opacity: '1'});
		});
	});
	$('#site_9').on('click', function(){
		$('#mapGroup').stop().animate({top: '-200px', left: '-800px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop9').css({top: '380px', left: '1400px', opacity: '1'});
		});
	});
	$('#site_10').on('click', function(){
		$('#mapGroup').stop().animate({top: '-50px', left: '-700px'}, 1000, 'swing', function(){
			$('.popup').css({top: '-10000px'});
			$('#pop10').css({top: '200px', left: '1260px', opacity: '1'});
		});
	});
});
