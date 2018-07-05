$(function () {



    //1.渲染店铺 0 1 2
    function renderShop() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsshop',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_body .shopSelect').html(template('shopSelectList', {
                    rows: info.result
                }))
                $('.shopSelect .shList .mui-icon').eq(shopid).addClass('mui-icon-star')
            }
        })
    }

    //2.渲染区域 0- 6
    function renderAddr() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsshoparea',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_body .shopSelect').html(template('addrSelectList', {
                    rows: info.result
                }))
                $('.shopSelect .shList .mui-icon').eq(areaid).addClass('mui-icon-star')
            }
        })
    }

    //3.店铺点击事件
    $('.mm_body .shop').on('click', '.first', function () {
        var flag = $(this).data('flag')
        if (flag === 'shop') {
            renderShop()
        } else if (flag === 'addr') {
            renderAddr()
        }
        // 切换图标
        var $span = $(this).find('.mui-icon')

        var $otherSpan = $span.parent().parent().siblings().find('.mui-icon')
        if ($otherSpan.hasClass('mui-icon-arrowdown')) {
            $otherSpan.toggleClass('mui-icon-arrowdown').toggleClass('mui-icon-arrowup')
        }
        $span.toggleClass('mui-icon-arrowdown').toggleClass('mui-icon-arrowup')

        // 切换tab栏
        console.log($span);

        if ($span.hasClass('mui-icon-arrowdown')) {
            $('.shopSelect').slideDown()
        } else {
            $('.shopSelect').slideUp()
        }
    })


    //4.渲染商品信息
    var shopid = 0,
        areaid = 0

    function renderPro() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.products ul').html(template('proList', {
                    rows: info.result
                }))
            }
        })
    }
    renderPro()

    // 5.下拉框点击事件
    $('.shopSelect').on('click', '.shList', function () {
        var shopid1 = this.dataset.shopid || false,
            areaid1 = this.dataset.areaid || false
        if (shopid1) {
            shopid = shopid1
        } else {
            areaid = areaid1
        }
        // mui-icon mui-icon-star
        $('.shopSelect').slideUp()
        $('.shop .mui-icon').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup')
        renderPro()
        console.log(shopid, areaid);

    })

})