$(function () {

    // 获取传递过来的地址栏信息

    function getSearch() {
        var search = location.search
        search = decodeURI(search)
        search = search.slice(1)
        var sArr = search.split('&')
        var obj = {}
        sArr.forEach(function (v, i) {
            var tempArr = v.split('=')
            obj[tempArr[0]] = tempArr[1]
        })
        return obj
    }

    var obj = getSearch()


    // 1.渲染导航
    function renderNav() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategorybyid',
            data: {
                categoryid: obj.categoryId
            },
            success: function (info) {
                $('.productNav ul').append('<li><a href="./product.html?categoryId=' + obj.categoryId + '">' + info.result[0].category + '</a></li>')
                $('.productNav ul').append('<li><a href="javascirpt:;">' + obj.brandName + '</a></li>')
            }
        })
    }

    renderNav()


    // 2.渲染商品详细信息和评论
    function renderProduct() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproduct',
            data: {
                productid: obj.productId
            },
            success: function (info) {
                // console.log(info);
                $('.proInfo').html(template('proInfoList',info.result[0]))

            }
        })

        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductcom',
            data: {
                productid: obj.productId
            },
            success: function (info) {
                // console.log(info);
                $('.comments ul').html(template('commentsList',{rows: info.result}))

            }
        })
    }
    renderProduct()

})