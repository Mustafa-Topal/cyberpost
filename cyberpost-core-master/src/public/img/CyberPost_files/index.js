// Add User button click
$('#register-form').on('submit', function (event) {
    event.preventDefault();
    console.log( $( '#register-form' ).serialize() );

    $.post( "/api/register", $( '#register-form' ).serialize() ,function( data ) {
        console.log(data);
        if (data.status === 'success') {
            M.toast({html: data.message})
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

/* $('.logout-button').click(function(){
    $.post( "/api/login", function(  ) {
    });
});  */

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

/* $('#send-form').on('submit', function (event) {
    event.preventDefault();
    console.log( $( '#send-form' ).serialize() );

    if ($('.mailjet-check').prop('checked')) {
        $.post( "/api/send/mailjet", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.mailgun-check').prop('checked')) {
        $.post( "/api/send/mailgun", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.sendgrid-check').prop('checked')) {
        $.post( "/api/send/mailjet", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
}); */

function chipAddRemove(e, data, chipsInstanceSelector) {
    var array = [];
    var instance = M.Chips.getInstance($(chipsInstanceSelector));
    $.each(instance.chipsData, function (i, value) {
        array.push(value.tag)
      });
      if (chipsInstanceSelector === '.to-chips')
        $( "input[name='to']" ).val(array.join(', ')); 
      else
        $( "input[name='bcc']" ).val(array.join(', ')); 
};

$('.to-chips').chips({
    placeholder: 'Email',
    secondaryPlaceholder: '+Email',
    onChipAdd: function (e, data) {
        chipAddRemove(e, data, '.to-chips') 
    },
    onChipDelete: function (e, data) {
        chipAddRemove(e, data, '.to-chips') 
    }
});

$('.bcc-chips').chips({
    placeholder: 'Email',
    secondaryPlaceholder: '+Email',
    onChipAdd: function (e, data) {
        chipAddRemove(e, data, '.bcc-chips') 
    },
    onChipDelete: function (e, data) {
        chipAddRemove(e, data, '.bcc-chips') 
    }
});

$('#send-form').submit(function (e) {
    e.preventDefault();
    console.log( $( '#send-form' ).serialize() );

    if ($('.mailjet-check').prop('checked')) {
        $.post( "/api/send/mailjet", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.mailgun-check').prop('checked')) {
        $.post( "/api/send/mailgun", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
    else if ($('.sendgrid-check').prop('checked')) {
        $.post( "/api/send/mailjet", $( '#send-form' ).serialize() ,function( data ) {
            console.log(data);
            if (data.status === 'success') {
                M.toast({html: data.message})
            } else {
                M.toast({html: data.message})
            }
        }, 'json' );
    }
});