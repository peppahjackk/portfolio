$("#contactForm").validator().on("submit", function (event) {
	if (event.isDefaultPrevented()) {
		submitMSG(false, "Did you fill in the form properly?");
	}
	else{
		event.preventDefault();
		submitForm();
	}
});

function submitForm(){
	//Create variables with contact form content
	var name = $("#name").val();
	var email = $("#email").val();
	var inquiry = $("#inquiry").val();
	var phone = $("#phone").val();

	$.ajax({
		type: "POST",
		url: "php/process.php",
		data: "name=" + name + "&email=" + email + "&phone=" + phone + "&inquiry=" + inquiry,
		success : function(text){
			if (text == "success"){
				formSuccess();
			} else {
				//formError(); - only if animate is implemented
				submitMSG(false, text);
			}
		}
	})
}

function formSuccess(){
	$("#contactForm")[0].reset();
	submitMSG(true, "Inquiry Submitted!")
}

function submitMSG(valid, msg){
	var msgClasses;
	if(valid){
		msgClasses = "h3 text-center text-success col-xs-12";
	} else {
		msgClasses = "h3 text-center text-danger col-xs-12";
	}
	$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}