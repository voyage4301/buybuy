$(function () {

    // 1.渲染
    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getsitenav',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_body ul').html(template('navList', {
                    rows: info.result
                }))
            }
        })
    }
    render()
})