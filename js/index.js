$(function () {

    // 1.渲染导航
    function renderNav() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getindexmenu',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                $('.mm_nav ul').html(template('navList', {
                    rows: info.result
                }))
            }
        })
    }
    renderNav()
    // 1.1点击显示更多
    $('.mm_nav ul').on('click', 'li:nth-child(8)', function () {
        $(this).nextAll().slideToggle()
    })

    // 2.渲染折扣商品
    function renderFree() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_forFree ul').html(template('freeList', {
                    rows: info.result
                }))
            }
        })
    }
    renderFree()

    //3.返回顶部
    $('#backTop').on('click', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500); //100毫秒滚动到顶
    })


})