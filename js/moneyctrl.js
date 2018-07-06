$(function () {

    var pageid = 1
    var totalPage = 0

    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            data: {
                pageid: pageid
            },
            success: function (info) {
                console.log(info);
                var arr = info.result
                var str = ''
                arr.forEach(function (v, i) {
                    var text = v.productComCount
                    text = text.slice(1, 2)
                    v.productComCount = text
                })
                $('.itemsInfo ul').html(template('moneyctrlList', {
                    rows: arr
                }))
                totalPage = Math.ceil((info.totalCount - 10) / info.pagesize)

                for (var i = 0; i < totalPage; i++) {
                    str += '<option value="' + (i + 1) + '">' + (i + 1) + '/' + totalPage + '</option>'
                }
                $('.mm_footer select').html(str)
                $('.mm_footer select option').eq(pageid - 1).prop('selected', true)

            }
        })
    }

    render()

    //3.上一页
    $('.mui-previous a').on('click', function () {
        pageid -= 1;
        (pageid < 1) && (pageid = 1);
        render()
    })


    // //4.下一页 
    $('.mui-next a').on('click', function () {
        pageid += 1;
        (pageid > totalPage) && (pageid = totalPage);
        render()
    })

    // //5.下拉框选项点击事件
    $('.mm_footer select').on('change', function () {
        // console.log($(this).val());
        pageid = $(this).val()
        render()
    })
})