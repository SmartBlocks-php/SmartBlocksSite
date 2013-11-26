define([
    'jquery',
    'underscore',
    'backbone',
    './apps/landing_page/views/landing_page',
    'text!./resources/templates/header_template.html',
    './resources/dist/js/bootstrap.min'
], function ($, _, Backbone, LandingPageView, header_tpl) {

    //private methods
    var reset_header_selected = function () {
        $('.top_menu_bt').removeClass("active");
        if (SmartBlocks.Url.appname == "BlocksExplorer") {
            $('.blocks_explorer_tb').addClass('active');
        } else if (SmartBlocks.Url.appname == "Tutorials") {
            $('.tutorials_tb').addClass('active');
        } else if (SmartBlocks.Url.appname == "Documentation") {
            $('.documentation_mb').addClass('pure-menu-selected');
        } else if (SmartBlocks.Url.appname == "LandingPage") {
            $('.documentation_mb').addClass('pure-menu-selected');
        }
    }

    var main = {
        init: function () {
            var header_template = _.template(header_tpl, {});
            $("#top_content").html(header_template);

            reset_header_selected();

            SmartBlocks.events.on("url_changed", function () {
                reset_header_selected();
            });


            $("body").delegate('.left_menu_shower', 'click', function () {
                SmartBlocks.Blocks.AppDashboard.Main.toggleMenu();
            });

            $("body").delegate(".show_menu_button", "click", function () {
                if (SmartBlocks.Blocks.AppDashboard) {
                    SmartBlocks.Blocks.AppDashboard.Main.toggleMenu();
                }
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