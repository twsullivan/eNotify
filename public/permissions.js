var currentItem;

$(".item").on("click", function(e){
    currentItem = this;
});

$("#btnSave").on("click", function(){
    var id = parseInt($(currentItem).prop("id"));
    var sender = $("#sender").is(":checked") ? 1 : 0;
    var admin = $("#admin").is(":checked") ? 2 : 0;
    var permission = sender | admin;

    $.post("permissions/set", {id: id, permission: permission}).then(function(){
        window.location.reload(false);
    });
});

$("#popupEdit").on( "popupafteropen", function( event, ui ) {
    var permission = parseInt($(currentItem).data("permission"));
    console.log("permission ", permission);
    console.log("permission 1", (permission & 1) == 1);
    console.log("permission 2", (permission & 2) == 2);

    $("#sender").prop("checked", ((permission & 1) == 1)).checkboxradio('refresh')
    $("#admin").prop("checked", ((permission & 2) == 2)).checkboxradio('refresh')
});
