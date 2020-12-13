$('.dropdown-trigger').dropdown();
// Add User button click
$('#register-form').on('submit', function (event) {
    event.preventDefault();
    console.log( $( '#register-form' ).serialize() );

    $.post( "/api/register", $( '#register-form' ).serialize() ,function( data ) {
        console.log(data);
        if (data.status === 'success') {
            M.toast({html: data.message})
            M.toast({html: 'Redirecting login page' })
            setTimeout(function(){ location.replace("/login") }, 2000);
        } else {
            M.toast({html: data.message})
        }
    }, 'json' );
});

$('#login-form').on('submit', function (event) {
    event.preventDefault();
    console.log( $( '#login-form' ).serialize() );

    $.post( "/api/login", $( '#login-form' ).serialize() ,function( data ) {
        console.log(data);
        if (data.status === 'success') {
            location.replace("/dashboard")
        } else {
            M.toast({html: data.message})
        }
    }, 'json' );
});
// only one API is selected
var clickedMailjet;
$(".provider-button.mailjet").on("click", function() {
    $(".mailjet-check").prop("checked", clickedMailjet = true);
    clickedMailjet = !clickedMailjet;
        $('.mailgun-check').prop('checked', false); // Unchecks it
        $('.sendgrid-check').prop('checked', false); // Unchecks it
});
var clickedMailgun;
$(".provider-button.mailgun").on("click", function() {
    $(".mailgun-check").prop("checked", clickedMailgun = true);
    clickedMailgun = !clickedMailgun;
        $('.mailjet-check').prop('checked', false); // Unchecks it
        $('.sendgrid-check').prop('checked', false); // Unchecks it
});
var clickedSendgrid;
$(".provider-button.sendgrid").on("click", function() {
    $(".sendgrid-check").prop("checked", clickedSendgrid = true);
    clickedSendgrid = !clickedSendgrid;
        $('.mailjet-check').prop('checked', false); // Unchecks it
        $('.mailgun-check').prop('checked', false); // Unchecks it
});

// Chips add/remove 
function chipAddRemove(e, data, chipsInstanceSelector) {
    var array = [];
    var instance = M.Chips.getInstance($(chipsInstanceSelector));
    $.each(instance.chipsData, function (i, value) {
        array.push(value.tag)
      });
      // Send the inputs
    if (chipsInstanceSelector === '.to-chips')
        $( "input[name='to']" ).val(array.join(', ')); 
    if (chipsInstanceSelector === '.bcc-chips')
        $( "input[name='bcc']" ).val(array.join(', ')); 
};

// Chip options
$('.to-chips').chips({
    placeholder: ' Email',
    secondaryPlaceholder: '+Email',
    onChipAdd: function (e, data) {
        chipAddRemove(e, data, '.to-chips') 
    },
    onChipDelete: function (e, data) {
        chipAddRemove(e, data, '.to-chips') 
    }
});

$('.bcc-chips').chips({
    placeholder: ' Email',
    secondaryPlaceholder: '+Email',
    onChipAdd: function (e, data) {
        chipAddRemove(e, data, '.bcc-chips') 
    },
    onChipDelete: function (e, data) {
        chipAddRemove(e, data, '.bcc-chips') 
    }
});

// if ".html-check" has been changed and --CHECKED--
$(".html-check").change(function() {
    if(this.checked === true) {
        $('.html-and-text-message').attr('id', 'html_message');
    }
});
// if ".html-check" has been changed and --UNCHECKED--
$(".html-check").change(function() {
    if(this.checked === false) {
    $('.html-and-text-message').attr('id', 'text_message');
    }
});

// get the value of the inputs
$('#send-form').submit(function (e) {
    e.preventDefault();
    var ConvertFormToJson = {
        from: $('#from_name').val()+' ' + '<'+$('#from').val()+'>',
        to: $('#to_name').val()+' ' + '<'+$('#to').val()+'>',
        bcc: $('#bcc').val(),
        subject: $('#subject').val(),
        text: $('#text_message').val(),  
        html: $('#html_message').val(),  
    }
    console.log(ConvertFormToJson); 

    if (ConvertFormToJson.bcc === '') {
        delete ConvertFormToJson.bcc;
    }
    
    // finally, send api's
    if ($('.mailjet-check').prop('checked')) {
        $.post( "/api/send/mailjet", ConvertFormToJson ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.mailgun-check').prop('checked')) {
        $.post( "/api/send/mailgun", ConvertFormToJson ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.sendgrid-check').prop('checked')) {
        $.post( "/api/send/mailjet", ConvertFormToJson ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
});