$(function () {

    // 1.渲染分类标题
    function renderFirst() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategorytitle',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                // 渲染分类标题
                $('#firstCategory').html(template('firstList', {
                    rows: info.result
                }))
            }
        })
    }
    renderFirst()

    // 2.点击生成分类
    $('#firstCategory').on('tap', '.categoryBtn', function () {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategory',
            data: {
                titleid: $(this).data('id')
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                // 渲染分类
                $('#firstCategory .category ul').html(template('categoryList', {
                    rows: info.result
                }))
            }
        })

    })





})