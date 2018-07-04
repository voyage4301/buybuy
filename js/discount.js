$(function () {

    // 1.渲染
    //1.渲染商品信息
    function renderProduct() {
        console.log(getSearch().productid);

        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getdiscountproduct',
            data: {
                productid: getSearch().productid
            },
            success: function (info) {
                console.log(info);
                $('.mm_content').html(template('productList', {
                    rows: info.result
                }))
            }
        })
    }
    renderProduct()

})