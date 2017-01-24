$(document).ready(function(){
	$("#plink").on("click", function(e){
		e.preventDefault();
			if(this.hash !== ""){
				var hash = this.hash;
				$('html, #portfoliobody').animate({
					scrollTop: $(hash).offset().top
				}, 3000, function(){
					window.location.hash = hash;
				})
			}
	})
})