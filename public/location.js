var items = [];
    
$("[name='checkbox']").on('click', function () { 
    if ($(this).is(":checked"))
        items.push($(this).prop("id"));
    else
        items = items.filter((item) => {
            return item !== $(this).prop("id");
        });

    if (items.length > 0)
        $("#btnDelete").removeClass("ui-disabled")
    else
        $("#btnDelete").addClass("ui-disabled")
 });

$("#btnOk").on("click", function(){
    $.post('https://enotify.iodrop.net/locations/delete', {ids: items}).then(() => {
        window.location.reload(false);
    });
})

$( "#popupAdd" ).on( "popupafteropen", function( event, ui ) {
    $("#popupAdd").val("");
});

$("#btnAdd").on("click", function() {
    $.post("https://enotify.iodrop.net/locations/add", { name: $("#newLocation").val() }).then(function () {
        window.location.reload(false);
    });
});