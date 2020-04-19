var extId = getUrlParameter('extId');

function getLocations() {
    var tags = {};
    var elements = $("input:checked").parent();
    $.each(elements, function (idx, obj) {
        tags[$(this).text()] = $(this).text();
    })
    return tags;
}

$("[name='checkbox']").on('click', function () {
    var text = $(this).parent().text();
    if ($(this).is(":checked")) {
        $.post('settings/add', { extId: extId, locationId: $(this).prop("id") }).then(function () {
            OneSignal.push(function () {
                OneSignal.sendTags(getLocations()).then(function (tags) {
                    window.location.reload(false);
                });
            });
        });
    } else {
        $.post('settings/remove', { devices: [{ extId: extId, locationId: $(this).prop("id") }] }).then(function () {
            OneSignal.push(function () {
                OneSignal.deleteTag(text).then(function (tags) {
                    window.location.reload(false);
                });
            });
        });
    }
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};