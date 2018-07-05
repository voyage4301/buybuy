$(function () {

    // 1.动态渲染导航
    function renderNav() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                // 渲染分类
                $('.mm_nav ul').html(template('navList', {
                    rows: info.result
                }))
                var uWidth = 0
                $('.mm_nav ul li').each(function (i, v) {
                    i === 0 && $(v).addClass('current')
                    uWidth += v.offsetWidth + 1
                })
                $('.mm_nav ul')[0].style.width = uWidth / 100 + 'rem'
            }
        })
    }
    renderNav()

    // 导航栏点击事件
    $('.mm_nav ul').on('click', 'a', function () {
        $(this).parent().addClass('current').siblings().removeClass('current')
        var titleid = $(this).data('id')
        renderProduct(titleid)

    })

    function renderProduct(titleid) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
            data: {
                titleid: titleid || 0
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_products ul').html(template('productList', {
                    rows: info.result
                }))
            }
        })
    }
    renderProduct()

    // 导航栏回滚
    var startX = 0
    var endX = 0
    $('.mm_nav ul').on('touchstart', function (e) {
        $(this).css('transition', 'none')
        startX = e.originalEvent.changedTouches[0].clientX
    })
    $('.mm_nav ul').on('touchmove', function (e) {
        var value = e.originalEvent.changedTouches[0].clientX - startX
        $(this).css('transform', 'translateX(' + (value + endX) + 'px)')
    })

    $('.mm_nav ul').on('touchend', function (e) {
        $(this).css('transition', 'all .5s')
        var value = e.originalEvent.changedTouches[0].clientX - startX
        endX += value
        var change = $(this).parent().outerWidth() - $(this).outerWidth()
        if (endX > 0) {
            $(this).css('transform', 'translateX(0px)')
            endX = 0
        } else if (endX < change) {
            $(this).css('transform', 'translateX(' + change + 'px)')
            endX = change
        }
    })

})