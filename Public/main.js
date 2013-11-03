define([
    'jquery',
    'underscore',
    'backbone',
    './apps/landing_page/views/landing_page'
], function ($, _, Backbone, LandingPageView) {
    var main = {
        init: function () {
        },
        launch_landing_page: function () {

            var landing_page = new LandingPageView();
            SmartBlocks.Methods.render(landing_page.$el);
            landing_page.init();

        }
    };

    return main;
});