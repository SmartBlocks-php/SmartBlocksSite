define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/page.html',
    'text!../templates/what.html',
    'text!../templates/learn.html',
    'text!../templates/blocks.html',
    '../../libs/scrolldown/js/jquery.onepage-scroll'
], function ($, _, Backbone, landing_page_tpl, what_tpl, learn_tpl, blocks_tpl, scrolldown) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "landing_page",
        initialize: function () {
            var base = this;

            base.current_page = 0;

        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(landing_page_tpl, {});
            base.$el.html(template);
            var paginator = base.$el.find('.paginator');
            paginator.html('');
            for (var i = 0; i <= base.$el.find("section").length - 1; i++) {
                paginator.append('<li><a href="javascript:void(0)" class="move_button button_page' + i +'" data-page="' + i +'"><i class="fa fa-circle"></i></a></li>');
            }
            paginator.find('.button_page' + base.current_page).addClass('current');
            paginator.css('top', 'calc(50% - '+ (paginator.height() / 2) +')');

        },
        resetVisibility: function () {
            var base = this;
            base.$el.find("section").removeClass('visible');
            $(base.$el.find("section")[base.current_page]).addClass('visible');
        },
        nextPage: function () {
            var base = this;
            if (base.current_page < base.$el.find("section").length - 1) {
                base.current_page++;
                base.$el.find(".page_contents").stop();
                base.$el.find(".page_contents").animate({"margin-top": -base.current_page * base.$el.height()}, 500, function () {

                });
                base.$el.find('.current').removeClass('current');
                base.$el.find('.button_page' + (base.current_page)).addClass('current');
                base.resetVisibility();
            }

            console.log("next_page");
        },
        previousPage: function () {
            var base = this;
            if (base.current_page > 0) {
                base.current_page--;
                base.$el.find(".page_contents").stop();
                base.$el.find(".page_contents").animate({"margin-top": -base.current_page * base.$el.height()}, 500, function () {

                });
                base.$el.find('.current').removeClass('current');
                base.$el.find('.button_page' + (base.current_page)).addClass('current');
                base.resetVisibility();
            }
            console.log("previous_page");
        },
        goToPage: function (page, force) {
            var base = this;
            if (page >= 0 && page <= base.$el.find("section").length - 1 && page != base.current_page || force) {
                var difference = Math.abs(base.current_page - page);
                base.current_page = page;
                base.$el.find(".page_contents").stop();
                base.$el.find(".page_contents").animate({"margin-top": -base.current_page * base.$el.height()}, 500, function () {

                });
                base.$el.find('.current').removeClass('current');
                base.$el.find('.button_page' + (base.current_page)).addClass('current');
                base.resetVisibility();
            }
            console.log("previous_page");
        },
        MouseWheelHandler: function (e) {
            // cross-browser wheel delta
            var base = this;
            var e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
            if (delta > 0) {
                base.previousPage();
            } else {
                base.nextPage();
            }
        },
        registerEvents: function () {
            var base = this;

            SmartBlocks.Shortcuts.add([38], function () {
                if (base.$el.is(":visible") > 0) {
                    base.previousPage();
                }
            });
            SmartBlocks.Shortcuts.add([40], function () {
                if (base.$el.is(":visible") > 0) {
                    base.nextPage();
                }
            });

            if (document.addEventListener) {
                // IE9, Chrome, Safari, Opera
                document.addEventListener("mousewheel", $.proxy(base.MouseWheelHandler, base), false);
                // Firefox
                document.addEventListener("DOMMouseScroll", $.proxy(base.MouseWheelHandler, base), false);
            } else {
                document.attachEvent("onmousewheel", $.proxy(base.MouseWheelHandler, base));
            }

            base.$el.delegate(".move_button", 'click', function () {
                var a = $(this);
                var page = a.attr('data-page');
                base.goToPage(page);
            });

            $(window).resize(function () {
                base.goToPage(base.current_page, true);
            });

        }
    });

    return View;
});