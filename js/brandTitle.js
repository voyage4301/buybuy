$(function () {


    // 1.导航渲染
    function renderNav() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbrandtitle',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.proContent ul').html(template('proList', {
                    rows: info.result
                }))
            }
        })
    }
    renderNav()
})