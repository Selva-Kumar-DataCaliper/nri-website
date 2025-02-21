$('#sendnow').click(function () {

    return true;

    var error = false;
    $('#formdata').addClass('was-validated');

    $('#formdata input, textarea ').each(function () {
        if ($(this).val().trim() === '') {
            error = true;
            $('.error').addClass('form-error');
        }
    });

    var getEmailValue = $('#formdata [type=email]').val();

    if (getEmailValue != '') {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(getEmailValue)) {
            error = true;
        }

    }

    if (error)
        return false;

    $('.loader').show();

    $.post("http://143.198.183.123/NRI/enquire-now.php", $('form').serialize(),
        function (data, status) {
            showMessage(data.message);
            if (data.status == 'success')
                $('#formdata')[0].reset(); // clear all
            $('#formdata').removeClass('was-validated');
            $('.loader').hide();
        });
});

function showMessage(msg = null) {
    if (msg) {
        $("#snackbar").html(msg);
    }
    $("#snackbar").addClass('show');
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        $("#snackbar").removeClass('show');
    }, 3000);
}

function inputValue() {
    this.miSpecialForm.get('miName').valid
    // alert('test');
    if (document.getElementById("fullname").value.length > 0 || document.getElementById("phone").value.length > 0) {
        $('.error').removeClass('form-error');
    }

}
