﻿$(function () {
    $(document).on("click", ".input-group .glyphicon.glyphicon-search", function () {
        var obj = $(this);
        window.top.Easy.ShowUrlWindow({
            url: obj.parent().siblings("input.form-control").data("url"),
            width: obj.parent().siblings("input.form-control").data("width") || 800,
            height: obj.parent().siblings("input.form-control").data("height") || 600,
            onLoad: function (box) {
                var win = this;
                $(this.document).find("#confirm").click(function () {
                    var target = obj.parent().siblings("input.form-control");
                    target.val(win.GetSelected());
                    box.close();
                });
                $(this.document).on("click", ".confirm", function () {
                    var target = obj.parent().siblings("input.form-control");
                    target.val($(this).data("result")).trigger("change");
                    box.close();
                });
            }
        });
    }).on("click", ".reset", function () {
        $("input.form-control").val("").trigger("focus").trigger("blur");
        $("select.form-control").each(function() {
            $(this).val($("option:first", this).val());
        });
        $(".border,.padding,.fontsize,.position").slider("value", 0).each(function() {
            var $id = $(this).attr('id');
            $id = $id.replace('slider_', '#');
            $($id).text(0);
        });
        updateDisplay();
    });
    var target = window.top.$(".custom-style-target");
    var attrs = target.attr("style");
    if (target.hasClass("form-control")) {
        target.val().replace(/style="(.+)"/g, function (a, v) {
            attrs = v;
        });
    }
    if (!attrs) {
        attrs = "";
    }
    attrs = attrs.replace(": ", ":");
    var attrRexs = [
        { reg: /^width:(\d+)px/g, setValue: function (v) { $("#width").val(v); } },
        {
            reg: /^height:(\d+)px/g, setValue: function (v) {
                $("#height").val(v);
            }
        },
		{ reg: /^background-color:(.+)/g, setValue: function (v) { $("#b-color").val(v); } },
		{ reg: /^color:(.+)/g, setValue: function (v) { $("#t-color").val(v); } },
		{
		    reg: /^border:(.+)/g, setValue: function (v) {
		        v.replace(/(\d+)px ([a-z|A-Z]+) (#[a-z|A-Z|0-9]+)/g, function (a, s1, s2, s3) {
		            $("#border-width").html(s1);
		            $("#border-style").val(s2);
		            $("#bc-color").val(s3);
		        });
		    }
		},
		{
		    reg: /^padding:(.+)/g, setValue: function (v) {
		        if (v.indexOf(" ") > 0) {
		            $("#padding-custom").val(v);
		        } else {
		            $("#padding").text(parseInt(v));
		        }
		    }
		},
		{
		    reg: /^margin:(.+)/g, setValue: function (v) {
		        if (v.indexOf(" ") > 0) {
		            $("#margin-custom").val(v);
		        } else {
		            $("#margin").text(parseInt(v));
		        }
		    }
		},
		{ reg: /^font-family:(.+)/g, setValue: function (v) { $("#font-name").val(v); } },
		{ reg: /^font-style:(.+)/g, setValue: function (v) { $("#font-style").val(v); } },
		{ reg: /^font-weight:(.+)/g, setValue: function (v) { $("#font-weight").val(v); } },
		{ reg: /^font-size:(\d+)px/g, setValue: function (v) { $("#font-size").text(v); } },
		{ reg: /^font-variant:(.+)/g, setValue: function (v) { $("#font-variant").val(v); } },
		{ reg: /^line-height:(\d+)px/g, setValue: function (v) { $("#line-height").text(v); } },
		{ reg: /^text-align:(.+)/g, setValue: function (v) { $("#text-align").val(v); } },
		{ reg: /^text-decoration:(.+)/g, setValue: function (v) { $("#text-decoration").val(v); } },
		{ reg: /^text-indent:(\d+)px/g, setValue: function (v) { $("#text-indent").text(v); } },
		{ reg: /^letter-spacing:(\d+)px/g, setValue: function (v) { $("#letter-spacing").text(v); } },
		{ reg: /^word-spacing:(\d+)px/g, setValue: function (v) { $("#word-spacing").text(v); } },
		{ reg: /^text-transform:(.+)/g, setValue: function (v) { $("#text-transform").val(v); } },
		{ reg: /^background-image:url\((.+)\)/g, setValue: function (v) { $("#background-image").val(v); } },
		{ reg: /^background-repeat:(.+)/g, setValue: function (v) { $("#background-repeat").val(v); } },
		{ reg: /^background-position:(.+)/g, setValue: function (v) { $("#background-position").val(v); } },
		{ reg: /^background-attachment:(.+)/g, setValue: function (v) { $("#background-attachment").val(v); } },
		{ reg: /^position:(.+)/g, setValue: function (v) { $("#position").val(v); } },
		{ reg: /^top:(\d+)px/g, setValue: function (v) { $("#top").text(v); } },
		{ reg: /^left:(\d+)px/g, setValue: function (v) { $("#left").text(v); } },
		{ reg: /^right:(\d+)px/g, setValue: function (v) { $("#right").text(v); } },
		{ reg: /^bottom:(\d+)px/g, setValue: function (v) { $("#bottom").text(v); } },
		{ reg: /^cursor:(.+)/g, setValue: function (v) { $("#cursor").val(v); } },
		{ reg: /^visibility:(.+)/g, setValue: function (v) { $("#visibility").val(v); } },
		{ reg: /^overflow:(.+)/g, setValue: function (v) { $("#overflow").val(v); } },
		{ reg: /^float:(.+)/g, setValue: function (v) { $("#float").val(v); } },
		{ reg: /^border-radius:(\d+)px/g, setValue: function (v) { $("#border-radius").text(v); } },
		{
		    reg: /^text-shadow:(.+)/g, setValue: function (v) {
		        v.replace(/(\d+)px (\d+)px (\d+)px (#[a-z|A-Z|0-9]+)/g, function (a, s1, s2, s3, s4) {
		            $("#text-h-length").html(s1);
		            $("#text-v-length").html(s2);
		            $("#text-b-length").html(s3);
		            $("#text-s-color").val(s4);
		        });
		    }
		},
		{
		    reg: /^box-shadow:(.+)/g, setValue: function (v) {
		        v.replace(/(\d+)px (\d+)px (\d+)px (#[a-z|A-Z|0-9]+)/g, function (a, s1, s2, s3, s4) {
		            $("#box-h-length").html(s1);
		            $("#box-v-length").html(s2);
		            $("#box-b-length").html(s3);
		            $("#box-s-color").val(s4);
		        });
		    }
		}
    ];
    var styleArray = attrs.split(';');
    for (var i = 0; i < styleArray.length; i++) {
        for (var j = 0; j < attrRexs.length; j++) {
            $.trim(styleArray[i]).replace(attrRexs[j].reg, function (a, v) {
                attrRexs[j].setValue($.trim(v));
            });
        }
    }

    function slide(event, ui) {
        var $id = $(this).attr('id');
        $id = $id.replace('slider_', '#');
        $($id).text(ui.value);
        updateDisplay();
    }
    function slideCreate(event, ui) {
        var $id = $(this).attr('id');
        $id = $id.replace('slider_', '#');
        $(this).slider('value', $($id).text());
    }
    $(".border").slider({
        min: 0,
        max: 10,
        slide: slide,
        create: slideCreate
    });
    $(".padding").slider({
        min: 0,
        max: 50,
        slide: slide,
        create: slideCreate
    });
    $(".fontsize").slider({
        min: 0,
        max: 60,
        slide: slide,
        create: slideCreate
    });
    $(".position").slider({
        min: 0,
        max: 150,
        slide: slide,
        create: slideCreate
    });
    updateDisplay();
});

