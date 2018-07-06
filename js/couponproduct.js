$(function () {


    // 1.渲染优惠券信息
    var arrSrc = [] //图片信息
    var lis = 0
    var prev = 0
    var now = 0
    var next = 0
    var width = 0

    // 2.渲染商品信息和轮播图
    function render() {
        var couponId = getSearch().couponId
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcouponproduct',
            data: {
                couponid: +couponId
            },
            dataType: 'json',
            success: function (info) {
                $('.mm_body .items ul').html(template('itemsList', {
                    rows: info.result
                }))
                info.result.forEach(function (v, i) {
                    arrSrc.push(v.couponProductImg)
                })
                //渲染所有图片
                $('.other').html(template('modalList', {
                    rows: arrSrc
                }))
                lis = $('.other ul li') //所有图片
                //设置图片的队列初始位置
                lis.each(function () {
                    $(this).css({
                        'transform': 'translateX(200%)'
                    })
                })
                width = $('.other').outerWidth() / 100 
            }
        })
    }

    render()

    // 3.点击下一张
    $('.modal .other').on('click', '.prev', function (e) {
        e.stopPropagation()
        animate('right')
    })
    // 4.点击上一张
    $('.modal .other').on('click', '.last', function (e) {
        e.stopPropagation()
        animate('left')
    })

    function animate(position) { //轮播图左右运动的封装
        if(position === 'left') {
            lis.eq(prev).css({'transition': 'none'})
            lis.eq(prev).css({'transform': 'translateX(200%)'})
            prev = now
            now = next
            next++
            if (next > lis.length - 1) { //右边防侧漏
                next = 0
            }
        } else if (position === 'right') {
            lis.eq(next).css({'transition': 'none'})
            lis.eq(next).css({'transform': 'translateX(200%)'})
            next = now 
            now = prev
            prev--
            if (prev < 0) { //右边防侧漏
                prev = lis.length - 1
            }
        }
        console.log(prev,now,next);
        addTransation()
        position === 'right' && lis.eq(prev).css({'transition': 'none'})
        setTranslateX()
    }

    function setTranslateX() { //滚动一次
        lis.eq(prev).css({'transform': 'translateX('+ (-width)+'rem)'})
        lis.eq(now).css ({'transform': 'translateX(0)'})
        lis.eq(next).css({'transform': 'translateX('+ (width)+'rem)'})
    }

    function addTransation() { //加过渡
        lis.eq(prev).css({'transition': 'all 0.5s'})
        lis.eq(now).css({'transition': 'all 0.5s'}) 
        lis.eq(next).css({'transition': 'all 0.5s'})
    }
    function removeTransation() { //移除过渡
        lis.eq(prev).css({'transition': 'none'})
        lis.eq(now).css({'transition': 'none'}) 
        lis.eq(next).css({'transition': 'none'})
    }

    // 5.手指事件
    var startX = 0
    $('.modal .other').on('touchstart',function (e) {
        startX = e.originalEvent.changedTouches[0].clientX
    })

    $('.modal .other').on('touchmove',function (e) {
        var value = (e.originalEvent.changedTouches[0].clientX -startX) / 100
        removeTransation()
        lis.eq(prev).css({'transform': 'translateX('+ (-width + value)+'rem)'})
        lis.eq(now).css ({'transform': 'translateX('+value+'rem)'})
        lis.eq(next).css({'transform': 'translateX('+ (width + value)+'rem)'})
    })

    $('.modal .other').on('touchend',function (e) {
        var value = (e.originalEvent.changedTouches[0].clientX -startX) / 100
        if (value > 0) {
            animate('right')
        }else if(value < 0) {
            animate('left')
        }
    })


    // 显示模态框
    $('.items').on('click', 'a', function () {
        var index = $(this).data('index') //获取当前的索引
        prev = index -1
        now = index 
        next = index + 1
        if (prev < 0) { //右边防侧漏
            prev = lis.length - 1
        }
        if (next > lis.length - 1) { //右边防侧漏
            next = 0
        }
        //初始化三张图片的位置
        lis.eq(prev).css({'transform': 'translateX('+ -width +'rem)'})
        lis.eq(now).css({'transform': 'translateX(0)'}) 
        lis.eq(next).css({'transform': 'translateX('+ width +'rem)'})
        $('.modal').show()
    })

    // 隐藏模态框
    $('.modal').on('click', function () {
        $(this).hide()
    })
    
    // 阻止点击事件冒泡,防止关闭模态框
    $('.modal .other').on('click', function (e) {
        e.stopPropagation()
    })

})