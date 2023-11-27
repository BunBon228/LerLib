// console.log(123);

setTimeout("window.location.href = 'start.html';", 120000);

const itemsDiv = $('.scheme-item');
const rectSvg = $('.object');

var arrData = [];

rectSvg.each(function(index){
	let c = this.getBoundingClientRect();
	console.log(this);
	let w = this.clientWidth;
	let h = $(this).height();

	console.log(c.top , c.bottom, c.bottom);
	console.log(c.left , c.right);

	arrData.push({
		id:  $(this).attr('data-id'),
		top: (Number(c.top) + ((Number(c.bottom)-Number(c.top))/2)),
		left: (Number(c.left) + ((Number(c.right)-Number(c.left))/2))
	});
})

itemsDiv.each(function(index){

	var itemOne = $(this);

	for(let i=0; i < arrData.length; i++){
		
		if(arrData[i]['id'] == $(this).attr('data-id')){
			console.log(itemOne.height(),itemOne.width(), arrData[i]['id']);
			itemOne.css('top', `${(arrData[i]['top'] - (itemOne.height()/2))}px`);
			itemOne.css('left', `${(arrData[i]['left'] - (itemOne.width()/2))}px`);
		}
	}
});

console.log(arrData);

// Изменение цвета polygon когда мышка над названием магазина.
$('.scheme-item').hover(
	function(){
		$('.scheme .object[data-id=' + $(this).data('id') + ']').attr('id', 'hover');
	},
	function(){
		$('.scheme .object[data-id=' + $(this).data('id') + ']').attr('id', '');
	}
);	
 
// Клик по названию магазина - открывается подсказка.
$('.scheme-item').on('click', function(){
	$('.scheme-popup').hide();
	$('.scheme .object').removeClass('active');
 
	var popup = $(this).find('.scheme-popup');
	$(popup).css('top', '-' + ($(popup).outerHeight(true) + 15) + 'px');
	$(popup).css('left', '-' + (($(popup).outerWidth(true) / 2) - ($(this).outerWidth(true) / 2)) + 'px');
	$('.scheme .object[data-id=' + $(this).data('id') + ']').addClass('active');
	$(popup).show();
});
 
// Клик по полигону магазина - также открывается подсказка.
$('.scheme .object').click(function(){
	$('.scheme-popup').hide();
	$('.scheme-item[data-id=' + $(this).data('id') + ']').trigger('click');
});
 
// Клик вне магазинов все закрывает.
$("body").click(function(e) {
	if ($(e.target).closest(".scheme .object, .scheme-item").length == 0) {
		$(".scheme-popup").hide();
		$('.scheme .object').removeClass('active');
	}
});




