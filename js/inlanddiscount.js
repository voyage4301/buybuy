$(function () {

    var datas = []
    var pageSize = 6,
        start = 0


    function getAll() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getinlanddiscount',
            success: function (info) {
                datas = info.result
                var data = datas.splice(start, pageSize)
                console.log(data);

                $('.mm_content').append('<img class="load" src="./images/loader.gif" alt="">')

                setTimeout(() => {
                    $('.mm_content .load').remove()
                    if (data.length === 0) {
                        $('.mm_content').append('<p class="tips">没有更多数据了</p>')
                        return false
                    }
                    $('.mm_content ul').append(template('inlanddiscountList', {
                        rows: data
                    }))
                    start += pageSize
                    flag = true
                }, 1000);
            }
        })
    }
    getAll()

    var flag = true
    $(window).on('scroll', function () {
        var top = $('.mm_content ul li:last-child').offset().top //最后一个li离文档的距离
        var liHeight = $('.mm_content ul li:last-child').height() //li的高
        var wHeight = $(window).height() //可视区的高
        var val = wHeight - liHeight
        if ((val - top) > 200 && flag) {
            flag = false
            getAll()
        }
    })


})