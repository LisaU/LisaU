    "use strict";
    const fs = require("fs");
    const path = "../../photos";

    fs.readdir(path, function (err, files) {
        if (err) {
            return;
        }
        let arr = [];
        (function iterator(index) {
            if (index == files.length) {
                fs.writeFile("output.json", JSON.stringify(arr, null, "\t"));
                return;
            }

            fs.stat(path + "/" + files[index], function (err, stats) {
                if (err) {
                    return;
                }
                if (stats.isFile()) {
                    arr.push(files[index]);
                }
                iterator(index + 1);
            })
        }(0));
    });
tool.js�������ǰ����е�ͼƬ���Ʒ���һ��json�ļ��С�����node tool.js�ͻ���source\photo�´���һ��output.json�ļ���ÿ����Ҫ�����ͼƬʱ����Ҫ����node tool.js��

�������json�ļ�����������Ҫ�õ�js����html�����ˡ�

����html����
��yourBlog\themes\yilia\source\js(yourBlogΪ��Ĳ��͸�Ŀ¼����yilia�滻Ϊ��ʹ�õ�����)�ļ������½�һ��photo.js���ļ��С�Ϊʲô�����ｨ�أ���Ϊ����֮��������public\js�ļ����У�����ʹ�õ�js�����⡣
photo.js�������£�

    define([], function () {
        return {
            page: 1,
            offset: 20,
            init: function () {
                var that = this;
                $.getJSON("/photo/output.json", function (data) {
                    that.render(that.page, data);

                    that.scroll(data);
                });
            },

            render: function (page, data) {
                var begin = (page - 1) * this.offset;
                var end = page * this.offset;
                if (begin >= data.length) return;
                var html, li = "";
                for (var i = begin; i < end && i < data.length; i++) {
                    li += '<li><div class="img-box">' +
                        '<a class="img-bg" rel="example_group" href="https://github.com/lwzhang/blog/blob/master/photos/' + data[i] + '?raw=true"></a>' +
                        '<img lazy-src="https://github.com/lwzhang/blog/blob/master/photos/' + data[i] + '?raw=true" />' +
                        '</li>';
                }

                $(".img-box-ul").append(li);
                $(".img-box-ul").lazyload();
                $("a[rel=example_group]").fancybox();
            },

            scroll: function (data) {
                var that = this;
                $(window).scroll(function() {
                    var windowPageYOffset = window.pageYOffset;
                    var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                    var sensitivity = 0;

                    var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                    if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                        that.render(++that.page, data);
                    }
                })
            }
        }
    })