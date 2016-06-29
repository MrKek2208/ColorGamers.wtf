// ==UserScript==
// @name         ColorGamers.wtf
// @namespace    http://mrkek.ovh/
// @version      0.1
// @description  Color Changer for the Gamers.wtf Dashboard, make Gamers.wtf great again!
// @updateURL	https://github.com/MrKek2208/ColorGamers.wtf/raw/master/Userscript.js
// @downloadURL	https://github.com/MrKek2208/ColorGamers.wtf/raw/master/Userscript.js
// @copyright	2016+, MrKek | Alex
// @author       MrKek | Alex
// @match        https://gamers.wtf/board/*
// @grant        none
// @icon         https://gamers.wtf/assets/img/logo/logo_128.png
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.href === "https://gamers.wtf/board/") {
        function onColorChange(color) {
            $("#color").val(color);
            $(".cp-value").css("background-color", color);
        }

        $(".container > .row").append('<div class="col-md-4">' +
                                      '<div class="card">' +
                                      '<div class="card-header">' +
                                      ' <h2>Color Changer <small>Change the Color of the Dashboard</small></h2>' +
                                      ' </div>' +
                                      '<div class="card-body card-padding">' +
                                      '<div class="input-group">' +
                                      '<div class="fg-line">' +
                                      '<input type="text" id="color" value="#000000" disabled name="color" class="form-control" placeholder="Landscape">' +
                                      '</div>' +
                                      '<span class="input-group-addon last"><i class="cp-value" style="color: black; background-color: black; width:25px; height:25px; border-radius:2px; position:absolute; top: 0; right: 15px;"></i></span>' +
                                      '</div>' +
                                      '<div id="colorpicker"></div>' +
                                      '<button id="savebtn" class="btn btn-default waves-effect">Save</button>' +
                                      '</div>' +
                                      '</div>' +
                                      '</div>');
        var colorPicker = $.farbtastic("#colorpicker");
        colorPicker.linkTo(onColorChange);
        if(readCookie("skin-color") !== null) {
            var isOk  = /^#[0-9A-F]{6}$/i.test(readCookie("skin-color"));
            if(isOk) {
                colorPicker.setColor(readCookie("skin-color"));
            }
        }

        $( "#savebtn" ).click(function() {
            createCookie("skin-color", $("#color").val(), 14);

            swal({
                title: "Great!",
                text: "You changed the Color to: " + $("#color").val() + " Please reload the Page!",
                html: true,
                closeOnConfirm: false,
                type: "success"
            }, function(){
                location.reload();
            });

        });

    }


    if(readCookie("skin-color") !== null) {
        var isOk  = /^#[0-9A-F]{6}$/i.test(readCookie("skin-color"));
        if(!isOk) {
            $("[data-current-skin]").attr("data-current-skin", readCookie("skin-color"));
        }
    }

    if(readCookie("skin-color") !== null) {
        var isOk  = /^#[0-9A-F]{6}$/i.test(readCookie("skin-color"));
        if(isOk) {
            $("#header").css("background-color", readCookie("skin-color"));
            $("#color").val(readCookie("skin-color"));
            $(".cp-value").css("background-color", readCookie("skin-color"));
        }
    }

    $(".top-menu").append ('<li class="dropdown">' +
                           '<a data-toggle="dropdown" href="" aria-expanded="false"><i class="tm-icon zmdi zmdi-format-color-fill"></i></a>' +
                           '<ul class="dropdown-menu dm-icon pull-right">' +
                           ' <li class="skin-switch hidden-xs">' +
                           '    <span class="ss-skin bgm-lightblue" data-ma-action="change-skin" data-ma-skin="lightblue"></span>' +
                           '    <span class="ss-skin bgm-bluegray" data-ma-action="change-skin" data-ma-skin="bluegray"></span>' +
                           '    <span class="ss-skin bgm-cyan" data-ma-action="change-skin" data-ma-skin="cyan"></span>' +
                           '    <span class="ss-skin bgm-teal" data-ma-action="change-skin" data-ma-skin="teal"></span>' +
                           '   <span class="ss-skin bgm-orange" data-ma-action="change-skin" data-ma-skin="orange"></span>' +
                           '    <span class="ss-skin bgm-blue" data-ma-action="change-skin" data-sma-kin="blue"></span>' +
                           ' </li>' +
                           '</ul>' +
                           '</li>');

    var createCookie = function(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    $(document).ready(function() {
        $("body").on("click", "[data-ma-action]", function(e) {
            e.preventDefault();
            var $this = $(this),
                action = $(this).data("ma-action");
            switch (action) {
                case "change-skin":
                    var skin = $this.data("ma-skin");
                    createCookie("skin-color", skin, 14);
                    $("[data-current-skin]").attr("data-current-skin", skin);
                    location.reload();
                    break;
            }
        });
    });
})();