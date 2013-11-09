define([
    'jquery',
    'underscore',
    'backbone',
    './apps/landing_page/views/landing_page',
    './resources/dist/js/bootstrap.min'
], function ($, _, Backbone, LandingPageView) {
    var main = {
        init: function () {

            $("body").delegate('.left_menu_shower', 'click', function () {
                SmartBlocks.Blocks.AppDashboard.Main.toggleMenu();
            });
        },
        launch_landing_page: function () {

            var landing_page = new LandingPageView();
            SmartBlocks.Methods.render(landing_page.$el);
            landing_page.init();

        }
    };

    return main;
});