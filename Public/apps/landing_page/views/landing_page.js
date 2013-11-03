define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/landing_page.html',
    'text!../templates/what.html',
    'text!../templates/learn.html',
    'text!../templates/blocks.html'
], function ($, _, Backbone, landing_page_tpl, what_tpl, learn_tpl, blocks_tpl) {
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
            var template = _.template(what_tpl, {});
            base.$el.find(".landing_content").html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate(".section", "click", function () {
                var elt = $(this);
                var page = elt.attr('data-page');
                if (page == "learn") {
                    var template = _.template(learn_tpl, {});
                    base.$el.find(".landing_content").html(template);
                } else if (page == "blocks") {
                    var template = _.template(blocks_tpl, {});
                    base.$el.find(".landing_content").html(template);
                } else {
                    var template = _.template(what_tpl, {});
                    base.$el.find(".landing_content").html(template);
                }
            });
        }
    });

    return View;
});