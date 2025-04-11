(function ($) {
    "use strict";

    /**
     * Navgoco Init Function
     */
    function wpbInitNavgoco($wrapper) {
        $wrapper.each(function () {
            var $this = $(this);

            // Prevent Double Init
            if ($this.hasClass("navgoco-initialized")) {
                return;
            }

            var accordion = $this.data("accordion"),
                indicator_icon = $this.data("indicator_icon"),
                iconclass = $this.data("iconclass"),
                caretHtml = iconclass
                    ? '<i class="' + iconclass + '"></i>'
                    : indicator_icon;

            $this.find(".wpb_category_n_menu_accordion_list").navgoco({
                caretHtml: caretHtml,
                accordion: accordion,
                openClass: "wpb-submenu-indicator-minus",
                save: true,
                cookie: {
                    name: "navgoco",
                    expires: false,
                    path: "/",
                },
                slide: {
                    duration: 400,
                    easing: "swing",
                },
            });

            $this.addClass("navgoco-initialized");
        });
    }

    /**
     * Global Init for Non-Elementor Popup Menus
     */
    wpbInitNavgoco(
        $(".wpb_category_n_menu_accordion").filter(function () {
            return (
                $(this).closest(".wpb-wamc-elementor-widget-show-in-popup")
                    .length === 0
            );
        })
    );

    /**
     * Elementor Specific Init
     */
    var WPB_Accordion_Menu_Elementor = function ($scope, $) {
        var $wrapper = $scope.find(".wpb_category_n_menu_accordion");

        wpbInitNavgoco($wrapper);

        $(".wpb-submenu-indicator").click(function (e) {
            e.preventDefault();
        });
    };

    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/wpb-accordion-categories.default",
            WPB_Accordion_Menu_Elementor
        );
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/wpb-accordion-menu.default",
            WPB_Accordion_Menu_Elementor
        );
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/wpb-accordion-menu-or-category-pro.default",
            WPB_Accordion_Menu_Elementor
        );
    });
})(jQuery);
