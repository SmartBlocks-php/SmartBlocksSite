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

            base.$el.onepage_scroll({
                sectionContainer: "section",
                easing: "ease",
                animationTime: 1000,
                pagination: true,
                updateURL: false
            });

        },
        registerEvents: function () {
            var base = this;


        }
    });

    return View;
});