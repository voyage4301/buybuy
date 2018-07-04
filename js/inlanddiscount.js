$(function () {


    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getinlanddiscount',
            success: function (info) {
                console.log(info);
                
                $('.mm_content ul').html(template('inlanddiscountList', {
                    rows: info.result
                }))
            }
        })
    }
    render()
})