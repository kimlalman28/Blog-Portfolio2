$(document).ready(function(){
	$(".plink").on("click", function(e){
		e.preventDefault();
			if(this.hash !== ""){
				var hash = this.hash;
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 2000, function(){
					window.location.hash = hash;
				})
			}
	})
})


