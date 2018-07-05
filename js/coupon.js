$(function () {

    // 1.渲染优惠券标题信息
    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcoupon',
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