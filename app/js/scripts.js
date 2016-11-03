// JavaScript Document

//Collapsing Mechanism
/*$('.row .btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $collapse = $this.closest('.collapse-group').find('.collapse');
    $collapse.collapse('toggle');
}); */


//Contact Form
$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    //Create variables with contact form content
    var name = $("#name").val();
    var email = $("#email").val();
    var inquiry = $("#inquiry").val();
    var phone = $("#phone").val();

    $.ajax({
        type: "POST",
        url: "contact_form/php/process.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&inquiry=" + inquiry,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                //formError(); - only if animate is implemented
                submitMSG(false, text);
            }
        }
    })
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Inquiry Submitted!")
}

function submitMSG(valid, msg) {
    var msgClasses;
    if (valid) {
        msgClasses = "h3 text-center msg-success col-xs-12";
    } else {
        msgClasses = "h3 text-center msg-error col-xs-12";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
