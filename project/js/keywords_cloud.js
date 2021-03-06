var word_chart = echarts.init(document.getElementById('keywords_'));
window.onresize = function () {
    console.log("keyword size changed");
    word_chart.resize();
};
word_chart.showLoading();
$.get("http://139.199.69.206:8080/keywordstop").done(function (data) {
    //console.log(data);
    var result = [];
    for(var i =0;i<data.length;i++){
        var tmp = {};
        tmp.name = data[i].keywords_name;
        tmp.value = data[i].keywords_count;
        result.push(tmp);
    }
    console.log(result);
    word_chart.hideLoading();
    var option = {
        title: {
            text: '关键词指数',
            x: 'center',
            textStyle: {
                fontSize: 23
            }

        },
        tooltip: {
            trigger: 'item'
        },
        dataRange: {
            min: 0,
            max: 30000,
            x: 'left',
            y: 'bottom',
            text: ['高', '低'],
            calculable: true
        },
        backgroundColor: '#F7F7F7',
        series: [{
            name: '关键词',
            type: 'wordCloud',
            //size: ['9%', '99%'],
            sizeRange: [10, 150],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            shape: 'circle',
            // maskImage: maskImage,
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: result
        }]
    };
    word_chart.setOption(option);
});
