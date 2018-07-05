$(function () {


    // 1.渲染优惠券信息
    var arrSrc = []

    function render() {
        var couponId = getSearch().couponId
        console.log(couponId);

        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcouponproduct',
            data: {
                couponid: +couponId
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mm_body .items ul').html(template('itemsList', {
                    rows: info.result
                }))


                info.result.forEach(function (v, i) {
                    arrSrc.push(v.couponProductImg)
                })
                // console.log(arrSrc);
            }
        })
    }

    render()

    // 2.点击显示模态框
    var index = 0
    $('.items').on('click', 'a', function () {
        index = $(this).data('index')

        var first = arrSrc[0]
        var last = arrSrc[arrSrc.length - 1]


        var str = template('modalList', {
            rows: arrSrc,
            first: first,
            last: last
        })
        $('.modal').show()
        $('.other').html(str)

        var gallery = mui('.mui-slider');
        gallery.slider().gotoItem(index); //跳转到第index张图片，index从0开始；
    })


    $('.modal').on('click', function () {
        $(this).hide()
    })

    $('.modal .other').on('click', '.prev', function () {
        index--
        if (index <= 0) {
            index = arrSrc.length - 1
        }
        console.log(index);
        var gallery = mui('.mui-slider');
        gallery.slider().gotoItem(index)
        return false
    })
    $('.modal .other').on('click', '.last', function () {
        index++
        if (index >= arrSrc.length - 1) {
            index = 0
        }
        var gallery = mui('.mui-slider');
        gallery.slider().gotoItem(index)
        return false
    })
})