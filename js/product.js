$(function () {

    // 获取传递过来的商品分类的id
    function getID() {
        var id = location.search
        id = id.slice(1)
        var arr = id.split('=')
        var obj = []
        obj[arr[0]] = arr[1]
        return obj
    }

    // 1.动态渲染导航
    function renderNav() {
        var categoryId = getID().categoryId
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategorybyid',
            data: {
                categoryid: categoryId
            },
            success: function (info) {
                $('.productNav ul').append(template('navList', info.result[0]))
            }
        })

    }
    renderNav()

    // 2.动态渲染商品信息
    var pageid = 1
    var totalPage = 0

    function renderProduct() {
        var categoryId = getID().categoryId
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductlist',
            data: {
                pageid: pageid,
                categoryid: categoryId
            },
            success: function (info) {
                console.log(info);
                
                totalPage = Math.ceil(info.totalCount / info.pagesize)
                var str = ''
                for (var i = 0; i < totalPage; i++) {
                    str += '<option value="' + (i + 1) + '">' + (i + 1) + '/' + totalPage + '</option>'
                }
                $('.mm_footer select').html(str)
                $('.productInfo ul').html(template('productList', {
                    rows: info.result
                }))
                $('.productInfo ul img').addClass('info_img mui-media-object mui-pull-left')

                $('.mm_footer select option').eq(pageid - 1).prop('selected', true)
            }
        })
    }
    renderProduct()


    //3.上一页
    $('.mui-previous a').on('click', function () {
        pageid -= 1;
        (pageid < 1) && (pageid = 1);
        renderProduct()
    })


    //4.下一页 
    $('.mui-next a').on('click', function () {
        pageid += 1;
        (pageid > totalPage) && (pageid = totalPage);
        renderProduct()
    })

    //5.下拉框选项点击事件
    $('.mm_footer select').on('change', function () {
        console.log($(this).val());
        pageid = $(this).val()
        renderProduct()

    })


})