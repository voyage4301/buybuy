$(function () {

    // 1.导航渲染
    var navStr = '<li><a href="javascript:;">' + getSearch().name + '</a></li>'
    $('.productNav ul').append(navStr)
    $('.proTitle').text(getSearch().name + '~~哪个牌子好?')
    $('.c_title').text(getSearch().name + '最新评论')
    $('.salesTitle').text(getSearch().name + '销量排行')


    // 2.品牌列表渲染
    function renderBrand() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbrand',
            data: {
                brandtitleid: getSearch().brandtitleid
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                $('.proContent ul').html(template('brandList', {
                    rows: info.result
                }))

            }
        })
    }
    renderBrand()

    // 3.销量排行渲染
    function renderWho(pageSize) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbrandproductlist',
            data: {
                brandtitleid: getSearch().brandtitleid,
                pageSize: pageSize || 4
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                $('.salePro ul').html(template('soleList', {
                    rows: info.result
                }))
                var firstProductId = info.result[0].productId //排行第一的商品的id
                var firstImageSrc = info.result[0].productImg //排行第一的商品的图片
                var firstName = info.result[0].productName //排行第一的商品的标题
                renderComments(firstProductId, firstImageSrc, firstName)
            }
        })
    }
    renderWho()

    // 4.评论渲染
    function renderComments(productid, firstImageSrc, firstName) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductcom',
            data: {
                productid: productid
            },
            dataType: 'json',
            success: function (info) {
                info['productImg'] = firstImageSrc
                info['firstName'] = firstName
                // console.log(info);
                $('.comments ul').html(template('commentsList', info))
            }
        })
    }
})