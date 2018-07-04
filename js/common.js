$(function () {

    // 1.rem自适应
    function getSize() {
        var design = 750,
            base = 100,
            viewWidth = window.innerWidth

        if (viewWidth < 350) {
            viewWidth = 350
        }
        if (viewWidth > 750) {
            viewWidth = 750
        }
        var value = viewWidth / design * base + 'px'

        document.documentElement.style.fontSize = value

    }
    getSize()
    $(window).on('resize', getSize)

    // 2.拉伸
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //3.返回顶部
    $('#backTop').on('click', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500); //100毫秒滚动到顶
    })
})