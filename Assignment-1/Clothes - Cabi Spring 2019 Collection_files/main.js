var PRS$0 = function(o, t) {
    return o.__proto__ = {
        a: t
    }, o.a === t;
}({}, {}), DP$0 = Object.defineProperty, GOPD$0 = Object.getOwnPropertyDescriptor, MIXIN$0 = function(t, s) {
    for (var p in s) s.hasOwnProperty(p) && DP$0(t, p, GOPD$0(s, p));
    return t;
};

function Homepage_SneakPeek_Popup() {
    $(window).on("load", function() {
        $(window).width() > window.Breakpoints.Screen_Tablet ? (Modal.open("#homepage-takeover"), 
        ga("send", "event", "Homepage Overlay", "view", "Spring 2018 Launch"), $("[data-selector='#homepage-takeover']").show().animate({
            opacity: 1
        }, 1e3)) : $(".takeover__mobile").slideDown(), $("[data-takeover-close]").on("click", function() {
            Modal.close("#homepage-takeover"), ga("send", "event", "Homepage Overlay", "close", "Spring 2018 Launch");
        }), $(".takeover__mobile-close--js").on("click", function() {
            $(this).parents(".takeover__mobile").slideUp();
        });
    });
}

window.Breakpoints = function() {
    var api = {
        Screen_Desktop: 1e3,
        Screen_Tablet_Large: 1078,
        Screen_Tablet: 768
    };
    return api;
}(), window.cdn = {
    detect: function() {
        return "vagrant.ab-dev.com" == window.location.host || "vagrant.dev" == window.location.host ? "local" : "cabi-staging.ab-dev.com" == window.location.host ? "staging" : "production";
    },
    template_directory_uri: function() {
        return "staging" == this.detect() ? window.location.href.split("/")[0] + "//mediadev.cabionline.com/wp-content/themes/cabi" : "production" == this.detect ? window.location.href.split("/")[0] + "//media.cabionline.com/wp-content/themes/cabi" : window.location.href.split("/")[0] + "//" + window.location.host + "/wp-content/themes/cabi";
    },
    url: function() {
        return "staging" == this.detect() ? window.location.href.split("/")[0] + "//mediadev.cabionline.com/" : "production" == this.detect ? window.location.href.split("/")[0] + "//media.cabionline.com/" : window.location.href.split("/")[0] + "//" + window.location.host;
    }
}, window.Category_Select_State_Mobile = function($) {
    var select_label, select_list, the_current_category, api = {};
    return api.check_page = function() {
        select_label = $("#mobile-dropdown-list [data-selected-item]"), select_list = $("#mobile-dropdown-list ul"), 
        (the_current_category = select_list.find("li.current-cat a").text()).length && select_label.text(the_current_category);
    }, api;
}(jQuery), window.CollectionItem = function($, QuickLook) {
    return function() {
        "use strict";
        var proto$0 = {};
        function CollectionItem($elm) {
            var self = this;
            this.$elm = $elm, this.QuickLook = QuickLook, this.item_id = $elm.data("id"), this.$elm.data("api", this), 
            this.set_inner_size(), $(window).on("load resize", function() {
                $.proxy(self.set_inner_size(), self);
            }), $(this.$elm).hoverIntent({
                over: function() {
                    $.proxy(self.show_product_info(), self);
                },
                out: function() {
                    $.proxy(self.hide_product_info(), self);
                },
                interval: 5
            }), $(".color-choice .color", this.$elm).on("mouseenter", function() {
                var color_chosen = $(this).attr("data-color");
                $(this).parents(".entry-content").find("a").each(function() {
                    $(this).attr("href", $(this).attr("href").split("#")[0] + "#" + color_chosen);
                }), $(".color.active").removeClass("active"), $(this).addClass("active");
                var $container = $(this).parents(".entry-content");
                $container.find(".post_thumbnail:visible, .post_thumbnail_color").removeClass("active"), 
                $container.find(".post_thumbnail[data-color=" + color_chosen + "], .post_thumbnail_color[data-color=" + color_chosen + "]").addClass("active");
            }), self.$elm.data("api", self);
        }
        return DP$0(CollectionItem, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.set_inner_size = function() {
            var $elm = $(".item_photos", this.$elm);
            $(".item_photos .inner", this.$elm).css({
                width: $elm.outerWidth(),
                height: $elm.outerHeight()
            });
        }, proto$0.show_product_info = function() {
            $(this.$elm).addClass("hovering"), $(".product-info", this.$elm).fadeIn("fast");
        }, proto$0.hide_product_info = function() {
            $(this.$elm).removeClass("hovering"), $(".product-info", this.$elm).hide();
        }, MIXIN$0(CollectionItem.prototype, proto$0), proto$0 = void 0, CollectionItem;
    }();
}(window.jQuery, window.QuickLook), window.CollectionPromotionInjector = function($) {
    return function() {
        "use strict";
        var proto$0 = {};
        function CollectionPromotionInjector($promos, $grid) {
            this.$promos = $promos, this.$grid = $grid;
        }
        return DP$0(CollectionPromotionInjector, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.inject = function() {
            for (var promo_index = 0, i = 9; i < $(".item", this.$grid).not(".ng-hide").length; i += 18) {
                var promo = this.$promos.eq(promo_index);
                if ($(".item", this.$grid).eq(i - 1).after("<li class='item promotion'>" + $(promo).wrap("<p/>").parent().html() + "</li>"), 
                ++promo_index == this.$promos.length) return void $(".promotion-collection:odd", this.$grid).parent().addClass("odd");
            }
            $(".promotion-collection:odd", this.$grid).parent().addClass("odd");
        }, proto$0.remove = function() {
            $(".item.promotion", this.$grid).remove();
        }, MIXIN$0(CollectionPromotionInjector.prototype, proto$0), proto$0 = void 0, CollectionPromotionInjector;
    }();
}(window.jQuery), window.Cookie = function() {
    var api = {
        set: function(name, value, days, path) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3), expires = "; expires=" + date.toGMTString();
            } else expires = "";
            var dir = path || "/";
            document.cookie = name + "=" + value + expires + "; path=" + dir;
        },
        get: function(name) {
            for (var nameEQ = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                for (var c = ca[i]; " " == c.charAt(0); ) c = c.substring(1, c.length);
                if (0 === c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        delete: function(name) {
            api.set(name, "", -1);
        }
    };
    return api;
}(), window.DropdownList = function($) {
    return function() {
        "use strict";
        var proto$0 = {};
        function DropdownList(options) {
            var config = {
                selected_item: $(options.list).find("li").first(),
                id: "dropdown-list-" + this._generate_unique_id(),
                onSelect: null
            };
            return this.config = $.extend(config, options), this.$wrapper = this.create_markup(), 
            this.bind_events(), this.config.onSelect && this.config.onSelect(this.config.selected_item), 
            this.$wrapper.data("api", this), this.$wrapper;
        }
        return DP$0(DropdownList, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.create_markup = function() {
            var $wrapper = $("<div />", {
                class: "dropdown-list",
                id: this.config.id
            });
            $wrapper.prepend("<a href='#' data-selected-item>" + $(this.config.selected_item).find("a").html() + "</a>");
            var $clone = $(this.config.list).clone();
            return $clone.attr("id", null).find("ul").remove(), $clone.hide(), $wrapper.append($clone), 
            $wrapper.append($("<input />", {
                type: "hidden",
                name: this.config.id,
                value: $(this.config.selected_item).find("a").attr("data-value") || $(this.config.selected_item).find("a").attr("href")
            })), $wrapper;
        }, proto$0.bind_events = function() {
            var _this = this;
            $(document).on("click", "#" + this.config.id + " a[data-selected-item]", function(e) {
                e.preventDefault(), $("ul", "#" + _this.config.id).slideToggle("fast");
            }), $(document).on("mouseleave", "#" + this.config.id, function(e) {
                $("ul", "#" + _this.config.id).hide();
            }), $(document).on("click", "#" + this.config.id + " ul *", function(e) {
                var _elements = _this._find_elements_in_event(e), $li = _elements[0], $a = _elements[1];
                _this.config.onSelect ? (_this.config.onSelect($li), $("[data-selected-item]", "#" + _this.config.id).text($a.text())) : window.location = $a.attr("href"), 
                $("ul", "#" + _this.config.id).hide();
            });
        }, proto$0.select = function(val) {
            var $a = $("[data-value='" + val + "']", "#" + this.config.id);
            this.setValue(val), $("[data-selected-item]", "#" + this.config.id).text($a.text());
        }, proto$0.setValue = function(val) {
            this.$wrapper.find("input[name=" + this.config.id + "]").val(val);
        }, proto$0._generate_unique_id = function() {
            return Date.now();
        }, proto$0._find_elements_in_event = function(e) {
            var $li;
            return $(e.target).is("a") ? (e.stopPropagation(), e.preventDefault(), $li = $(e.target).parents("li").first()) : $li = $(e.target), 
            [ $li, $li.find("a") ];
        }, MIXIN$0(DropdownList.prototype, proto$0), proto$0 = void 0, DropdownList;
    }();
}(window.jQuery), function($) {
    var EventTable = function() {
        "use strict";
        var proto$0 = {};
        function EventTable($table) {
            this.$elm = $table, this.amount_to_show = 5, this.amount_shown = 0, this.number_of_rows = $(".row:not(.row-header)", this.$elm).length, 
            this.number_of_rows ? (this.hide_all_rows(), this.show_more(), this.bind_events()) : this.show_no_events_message(), 
            $table.data("api", this);
        }
        return DP$0(EventTable, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.hide_all_rows = function() {
            $(".row", this.$elm).hide();
        }, proto$0.show_more = function() {
            $(".row", this.$elm).slice(this.amount_shown, this.amount_shown + this.amount_to_show).show(), 
            this.amount_shown += this.amount_to_show, this._remove_see_more_button();
        }, proto$0._remove_see_more_button = function() {
            this.amount_shown >= this.number_of_rows && $(".btn-square", this.$elm).remove();
        }, proto$0.bind_events = function() {
            var self = this;
            $(".btn-square", this.$elm).on("click", function(e) {
                e.preventDefault(), $.proxy(self.show_more(), self);
            });
        }, proto$0.show_no_events_message = function() {
            $(".table, .btn-square", this.$elm).remove(), $(this.$elm).append($("<div/>", {
                class: "no-events-found",
                text: "No events at this time. Check back soon!"
            }));
        }, MIXIN$0(EventTable.prototype, proto$0), proto$0 = void 0, EventTable;
    }();
    $("[data-component-event-table]").each(function() {
        new EventTable($(this));
    });
}(window.jQuery), window.HashUrl = function($) {
    var api = {
        update: function(hash_string) {
            location.hash != "#" + hash_string && (window.history.pushState ? window.history.pushState(null, null, "#" + hash_string) : window.location.hash = "#" + hash_string);
        },
        get: function() {
            return window.location.hash.substring(1);
        }
    };
    return api;
}(window.jQuery), function($) {
    $(document).on("consultantInfo", function(e) {
        $("[data-component='helpmenu']").each(function() {
            $("[data-helpmenu-contact]", this).attr("href", "mailto:" + window.CABI_STYLIST_INFO.Email), 
            $("[data-helpmenu-purchase]", this).attr("href", $("[data-helpmenu-purchase]", this).attr("href") + window.CABI_STYLIST_INFO.PartyId), 
            $("[data-helpmenu-join]", this).attr("href", $("[data-helpmenu-join]", this).attr("href") + window.CABI_STYLIST_INFO.PartyId), 
            $("[data-helpmenu-host]", this).attr("href", $("[data-helpmenu-host]", this).attr("href").replace("[email]", window.CABI_STYLIST_INFO.Email));
        });
    });
}(window.jQuery), window.Item_Thumbnails_Scroll_Helper = function($) {
    var obj = {
        status: !0
    };
    return obj.wrap = $("#detail-images-wrapper .wrap"), obj.ul = $("ul.detail-images"), 
    obj.scroll_neg = function() {
        var mathCalc, scroll;
        if (obj.check_scroll(), "vertical" == obj.direction) {
            var maxH = $(obj.wrap).height(), ulH = $(obj.ul).height(), ulT = parseInt($(obj.ul).css("top"));
            if (scroll = 0, (mathCalc = Math.abs(ulT) + maxH + obj.scroll_height) == ulH - obj.scroll_height) return !1;
            mathCalc > ulH ? (scroll = -(ulH - maxH), $(obj.ul).animate({
                top: scroll
            })) : (scroll = "-=" + obj.scroll_height, $(obj.ul).animate({
                top: scroll
            }));
        } else {
            console.log("here");
            var maxW = $(obj.wrap).width(), ulW = $(obj.ul).width(), ulL = parseInt($(obj.ul).css("left"));
            if (scroll = 0, (mathCalc = Math.abs(ulL) + maxW + obj.scroll_width) == ulW - obj.scroll_width) return !1;
            mathCalc > ulW ? (scroll = -(ulW - maxW), $(obj.ul).animate({
                left: scroll
            })) : (scroll = "-=" + obj.scroll_width, $(obj.ul).animate({
                left: scroll
            }));
        }
    }, obj.scroll_pos = function() {
        var scroll;
        if (obj.check_scroll(), "vertical" == obj.direction) {
            $(obj.wrap).height();
            scroll = parseInt($(obj.ul).css("top")) + obj.scroll_height > 0 ? 0 : "+=" + obj.scroll_height, 
            $(".detail-images").animate({
                top: scroll
            });
        } else {
            $(obj.wrap).width();
            scroll = parseInt($(obj.ul).css("left")) + obj.scroll_width > 0 ? 0 : "+=" + obj.scroll_width, 
            $(".detail-images").animate({
                left: scroll
            });
        }
    }, obj.scroll_img = function(index) {
        var scroll;
        if ("vertical" == obj.direction) {
            var topP = $("ul.detail-images li").eq(index).position().top;
            scroll = obj.ul.height() - topP < obj.wrap.height() ? -(obj.ul.height() - obj.wrap.height()) : -topP, 
            $(".detail-images").animate({
                top: scroll
            });
        } else {
            var leftP = $("ul.detail-images li").eq(index).position().left;
            scroll = obj.ul.width() - leftP < obj.wrap.width() ? -(obj.ul.width() - obj.wrap.width()) : -leftP, 
            $(".detail-images").animate({
                left: scroll
            });
        }
    }, obj.check_size = function() {
        if (obj.direction = window.innerWidth > 768 ? "vertical" : "horizontal", window.innerWidth < 768) obj.wrap.css("top", "0px"), 
        obj.ul.css("top", "0px").css("width", $(".detail-images li").length * $(".detail-images li:first").width() + 2); else if (obj.status) {
            obj.ul.css({
                width: "auto",
                left: "0px"
            }), obj.ul.height() - Math.abs(parseInt(obj.ul.css("top"))) < obj.wrap.height() && obj.ul.css("top", -(obj.ul.height() - obj.wrap.height()));
        } else obj.ul.css("width", "auto");
    }, obj.check_scroll = function() {
        obj.check_size(), "vertical" == obj.direction ? obj.ul.height() < obj.wrap.height() ? obj.stop_scroll() : !obj.status && obj.wrap.height() < obj.ul.height() && obj.start_scroll() : (obj.ul.width() < obj.wrap.width() && obj.status && obj.stop_scroll(), 
        !obj.status && obj.wrap.width() < obj.ul.width() && obj.start_scroll()), !obj.status || obj.width && obj.height && obj.direction || obj.set_scroll();
    }, obj.set_scroll = function() {
        obj.scroll_width = $("#detail-images-wrapper .wrap img").eq(0).width(), obj.scroll_height = $("#detail-images-wrapper .wrap img").eq(0).height();
    }, obj.stop_scroll = function() {
        $(".arrow").hide(), obj.wrap.css("margin-top", "0px"), obj.status = !1;
    }, obj.start_scroll = function() {
        $(".arrow").css("display", "inline-block"), obj.status = !0;
    }, obj.init = function() {
        obj.ul.height() > obj.wrap.height() ? ($(".arrow").css("display", "inline-block"), 
        $("#detail-images-wrapper").on("click", ".arrow", function() {
            $(this).hasClass("positive") ? obj.scroll_pos() : obj.scroll_neg();
        }), obj.check_scroll()) : (obj.status = !1, obj.wrap.css("margin-top", "0px")), 
        $("#detail-images-wrapper").width() > obj.ul.width() && $("#detail-images-wrapper").addClass("center-items");
    }, obj;
}(jQuery), $("#lead-form1").length && function($, Loader, UrlQuery) {
    var lead_form_dom_id = "#lead-form1";
    $(document).on("ready", function() {
        new DropdownList({
            list: "#qualifier-list",
            id: "qualifier-list-dropdown",
            onSelect: function($li) {
                $("#qualifier").attr("name", $li.find("a").attr("data-value")), $("[name='qualifier-list-dropdown']").val($li.find("a").attr("data-value")), 
                $("[name='qualifier-list-dropdown']").trigger("change");
            }
        }).insertBefore($("#qualifier-list")), new DropdownList({
            list: "#leadsources-list",
            id: "leadsources-list-dropdown",
            onSelect: function($li) {
                $("#LeadSource").val($li.find("a").attr("data-value")), $(".additional").hide(), 
                $(".additional-" + $li.find("a").attr("data-value")).show(), $("[name='leadsources-list-dropdown']").val($li.find("a").attr("data-value")), 
                $("[name='leadsources-list-dropdown']").trigger("change");
            }
        }).insertBefore($("#leadsources-list")), $("#select-state-list").on("regionsLoaded", function() {
            console.log($("#select-state-list")[0]), new DropdownList({
                list: "#select-state-list",
                id: "select-state-list-dropdown",
                onSelect: function($li) {
                    $(".additional").hide(), $(".additional-" + $li.find("a").attr("data-value")).show(), 
                    $("[name='select-state-list-dropdown']").val($li.find("a").attr("data-value")), 
                    $("[name='select-state-list-dropdown']").trigger("change");
                }
            }).insertBefore($("#select-state-list"));
        }), new DropdownList({
            list: "#store-visited-list",
            id: "store-visited-list-dropdown",
            onSelect: function($li) {
                $("#Store").val($li.find("a").attr("data-value")), $("[name='store-visited-list-dropdown']").val($li.find("a").attr("data-value")), 
                $("[name='store-visited-list-dropdown']").trigger("change");
            }
        }).insertBefore($("#store-visited-list")), "zulily" == window.UrlQuery.get("lead") && ($("#qualifier-list-dropdown").data("api").select("InterestInClothing"), 
        $("#qualifier").attr("name", "InterestInClothing"), $("#leadsources-list-dropdown").data("api").select(8), 
        $("#LeadSource").val(8));
    }), $(lead_form_dom_id).on("submit", function(e) {
        var form_data = $(this).serializeArray();
        e.preventDefault(), window.Loader.show(), $(lead_form_dom_id).css("opacity", .5), 
        $.ajax({
            url: "/wp-content/plugins/cabi-lead-forms/process-form.php",
            type: "post",
            data: form_data
        }).then(function(json) {
            var data = $.parseJSON(json);
            if (window.Loader.hide(), $(lead_form_dom_id).css("opacity", 1), "Success" === data.Status) window.fbq("track", "Lead"), 
            form_data.push({
                name: "RemoteAddr",
                value: data.RemoteAddr
            }), function(form_data_raw) {
                var type = null;
                !function(form_data) {
                    for (var obj = {}, i = 0; i < form_data.length; i++) obj[form_data[i].name] = form_data[i].value;
                }(form_data_raw);
                switch (window.google_conversion_id = 1031435614, window.google_remarketing_only = !1, 
                window.google_conversion_format = "3", window.google_is_call = !0, form_data_raw[0].value) {
                  case "InterestInHostingShow":
                    type = "shows", window.google_conversion_label = "pCUHCPbpjVoQ3urp6wM";
                    break;

                  case "InterestInBecomingConsultant":
                    type = "career", window.google_conversion_label = "LwfECIyRxVwQ3urp6wM";
                    break;

                  case "InterestInClothing":
                    type = "shopping", window.google_conversion_label = "tVjDCOrfnwMQ3urp6wM", window.google_conversion_value = 1, 
                    window.google_conversion_currency = "USD";
                }
                var conv_handler = window.google_trackConversion;
                "function" == typeof conv_handler && (console.log(type), conv_handler());
            }(form_data), function(data) {
                var label;
                switch (data[0].value) {
                  case "InterestInHostingShow":
                    label = "shows";
                    break;

                  case "InterestInBecomingConsultant":
                    label = "careers";
                    break;

                  case "InterestInClothing":
                    label = "shop";
                }
                window.ga("send", "event", "leads", "confirm", label), fbq("track", "Lead", {
                    type: label
                });
            }(form_data), $("#lead-form-wrapper").css("overflow", "hidden"), $(lead_form_dom_id).addClass("complete"), 
            setTimeout(function() {
                $("#lead-form-confirmation").addClass("reveal");
            }, 500); else {
                $("#lead-form-errors").remove();
                var $error_list = $("<ul/>", {
                    id: "lead-form-errors"
                });
                $(data.ValidationErrors).each(function(i, error) {
                    $error_list.append($("<li/>", {
                        text: error
                    }));
                }), $("#leadform-embed-fields").prepend($error_list);
            }
            $("body").trigger("complete.lead-form", data);
        });
    });
}(window.jQuery, window.Loader, window.UrlQuery), window.Loader = function($) {
    var api = {};
    return api.show = function() {
        $("body").append($("<div />", {
            id: "cabi-loader",
            html: "<i class='fa fa-spinner fa-spin'></i>"
        }));
    }, api.hide = function() {
        $("#cabi-loader").remove();
    }, api;
}(window.jQuery);

var MainImage = function() {
    "use strict";
    var proto$0 = {};
    function MainImage() {
        this.dom_id = "#item-main-image";
    }
    return DP$0(MainImage, "prototype", {
        configurable: !1,
        enumerable: !1,
        writable: !1
    }), proto$0.set_main_image = function(src) {
        $("img#main-image", this.dom_id).attr("src", src), $("img", this.dom_id).not("#main-image, #modal-image").remove(), 
        $(window).on("resize", this.setup_image_zoom.bind(this));
    }, proto$0.get_main_image = function() {
        return $("img#main-image").attr("src");
    }, proto$0.setup_image_zoom = function() {
        $(window).width() >= Breakpoints.Screen_Tablet_Large ? $(this.dom_id).zoom() : $(this.dom_id).trigger("zoom.destroy");
    }, proto$0.clear_main_image = function() {
        $(window).off("resize", this.setup_image_zoom.bind(this));
    }, MIXIN$0(MainImage.prototype, proto$0), proto$0 = void 0, MainImage;
}();

window.MenuScroller = function($) {
    var public = {
        window_width: $(window).width(),
        sidebar_status: "normal",
        menu_offset: 110,
        menu_bottom_padding: 30,
        watcher_active: !1,
        check_width: function() {
            public.window_width > 767 && !public.watcher_active && (public.watcher_active = !0, 
            $(window).scroll(function() {
                public.scroll_action();
            }));
        },
        init: function(sidebar_track, sidebar_car, content, bottom_elm, bottom_padding) {
            public.elm = {
                bottom: bottom_elm,
                sidebar_track: sidebar_track,
                sidebar_car: sidebar_car,
                content: content
            }, public.menu_bottom_padding = bottom_padding || public.menu_bottom_padding, public.check_width(), 
            $(window).resize(function() {
                public.reinit();
            });
        },
        reinit: function() {
            public.change_sidebar(public.sidebar_status), public.bottom_element_offset = public.elm.bottom.offset().top, 
            public.content_offset = public.elm.content.offset().top, public.check_width();
        },
        _get_bottom_element_offset: function() {
            return public.bottom_element_offset || (public.bottom_element_offset = public.elm.bottom.offset().top), 
            public.bottom_element_offset;
        },
        _get_scroll_offset: function() {
            return $(window).scrollTop();
        },
        _get_content_offset: function() {
            return public.content_offset || (public.content_offset = public.elm.content.offset().top), 
            public.content_offset;
        },
        scroll_action: function() {
            public._get_scroll_offset() > public._get_bottom_element_offset() - ($(window).height() - public.elm.sidebar_car.height() + public.menu_bottom_padding) ? public.change_sidebar("bottom-out") : public._get_scroll_offset() > public._get_content_offset() - public.menu_offset ? public.change_sidebar("fix") : "normal" !== public.sidebar_status && public.change_sidebar("revert");
        },
        change_sidebar: function(action) {
            switch (action) {
              case "revert":
              case "normal":
                public.elm.sidebar_car.css({
                    position: "relative",
                    top: "initial",
                    "margin-top": "50px",
                    left: "initial"
                }), public.sidebar_status = "normal";
                break;

              case "fix":
                public.elm.sidebar_car.css({
                    position: "fixed",
                    top: public.menu_offset,
                    "margin-top": "initial",
                    left: public.elm.content.offset().left - public.elm.sidebar_track.width() + (public.elm.sidebar_track.width() - public.elm.sidebar_car.width()) / 2
                }), public.sidebar_status = action;
                break;

              case "bottom-out":
                public.elm.sidebar_car.css({
                    position: "relative",
                    top: "initial",
                    left: "initial",
                    "margin-top": public.elm.content.height() - public.elm.sidebar_car.height() - public.menu_bottom_padding
                }), public.sidebar_status = action;
            }
        }
    };
    return public;
}(jQuery), window.Modal = function($) {
    var api = {
        open: function() {
            var selector = arguments[0];
            void 0 === selector && (selector = "[data-modal-content]");
            var html_content = $(selector).html();
            $(selector).html(""), $("body").append($("<div/>", {
                id: "modal-knockout"
            })), $("body").append($("<div/>", {
                id: "modal",
                html: html_content,
                "data-selector": selector
            })), $("#modal").prepend('<a href="#" id="modal-close"><span>+</span></a>'), $("#modal-close, #modal-knockout").on("click.modal", function(e) {
                e.preventDefault(), api.close();
            }), $(document).keyup(function(e) {
                27 == e.keyCode && api.close();
            }), $("body").trigger("open.modal", $("#modal"));
        },
        close: function() {
            var video = $("#modal").find("iframe");
            video.length && video.attr("src", video.attr("src").replace("&autoplay=1", ""));
            var selector = $("#modal").attr("data-selector");
            $(selector).html($("#modal").html()), $("#modal-knockout, #modal, #modal-close").remove(), 
            $("body").trigger("close.modal"), $("*").unbind(".modal");
        },
        playVideo: function() {
            var modal = arguments[0];
            void 0 === modal && (modal = "[data-selector]");
            var video = $(modal).find("iframe");
            video.attr("src", video.attr("src") + "&autoplay=1");
        }
    };
    return api;
}(window.jQuery), window.Navigation_Select_States = function($) {
    var current_page_item, api = {}, $mainNav = $("#navigation-main li");
    api.check_page = function() {
        check_if_current_page_in_navigation(), check_if_host_page(), check_if_career_page(), 
        check_if_career_events_subpage(), check_if_foundation_page(), check_if_whatiscabi_page(), 
        check_if_blog_landing(), check_if_blog_post(), check_if_cabitv(), check_if_item(), 
        check_if_outfit();
    };
    var check_if_current_page_in_navigation = function() {
        return current_page_item = $mainNav.find(".active, .current-menu-item"), "cabi-tv" != $("body").attr("data-page-id") && (!$("body.single-video").length && void current_page_item.parents("li").addClass("active"));
    }, check_if_career_events_subpage = function() {
        (window.location.href.indexOf("sharing-cabi") > -1 || window.location.href.indexOf("community-career-gatherings") > -1) && ($("li#menu-join-us").addClass("active"), 
        $("li#menu-collection").removeClass("active"));
    }, check_if_blog_landing = function() {
        $("li#menu-blog").hasClass("active") && $("li#menu-collection").removeClass("active");
    }, check_if_blog_post = function() {
        $("body.single-post").length && $("li#menu-blog").addClass("active");
    }, check_if_cabitv = function() {
        $("body.single-video").length && $("li#menu-cabitv").addClass("active"), "cabi-tv" == $("body").attr("data-page-id") && $("li#menu-cabitv").addClass("active");
    }, check_if_item = function() {
        $("body.single-items").length && $("li#menu-collection").addClass("active");
    }, check_if_outfit = function() {
        $("body.single-looks").length && $("li#menu-collection").addClass("active");
    }, check_if_host_page = function() {
        "fashion-experience" == $("body").attr("data-page-id") && $("li#menu-host").addClass("active");
    }, check_if_career_page = function() {
        "career-in-fashion" == $("body").attr("data-page-id") && $("li#menu-join-us").addClass("active");
    }, check_if_foundation_page = function() {
        "foundation" == $("body").attr("data-page-id") && $("li#menu-foundation").addClass("active");
    }, check_if_whatiscabi_page = function() {
        "what-is-cabi" == $("body").attr("data-page-id") && $("li#menu-what-is-cabi").addClass("active");
    };
    return api;
}(jQuery), window.SocialShare = function($, Modal) {
    var api = {};
    return api.config = {
        title: $("meta[property='og:title']").attr("content"),
        permalink: $("meta[property='og:url']").attr("content"),
        image: $("meta[property='og:image']").attr("content"),
        description: $("meta[property='og:description']").attr("content"),
        email_id: ".btn-share[data-media=email]",
        facebook_id: ".btn-share[data-media=facebook]",
        twitter_id: ".btn-share[data-media=twitter]",
        pinterest_id: ".btn-share[data-media=pinterest]"
    }, api.init = function() {
        var d, s, id, js, fjs, options = arguments[0];
        return void 0 === options && (options = {}), $("body").append('<div id="fb-root"></div><script type="text/javascript">'), 
        window.fbAsyncInit = function() {
            FB.init({
                appId: window.FB_APP_ID,
                xfbml: !0,
                version: "v2.8"
            });
        }, d = document, s = "script", id = "facebook-jssdk", fjs = d.getElementsByTagName(s)[0], 
        d.getElementById(id) || ((js = d.createElement(s)).id = id, js.src = "//connect.facebook.net/en_US/all.js", 
        fjs.parentNode.insertBefore(js, fjs)), api.update(options), api;
    }, api.update = function() {
        var options = arguments[0];
        void 0 === options && (options = {}), function() {
            var options = arguments[0];
            void 0 === options && (options = {});
            api.config = $.extend(api.config, options), api.config.title = api.config.title.replace("|", "-");
        }(options), $("*").unbind(".social-share"), $(SocialShare.config.email_id).on("click.social-share", function(e) {
            e.preventDefault(), Modal.open(), ga("send", "pageview", "/clothing-collection/wish-list/share");
        }), $(SocialShare.config.facebook_id).on("click.social-share", function(e) {
            e.preventDefault(), $.ajax({
                type: "POST",
                url: "/wp-admin/admin-ajax.php?action=cabi_facebook_sharer",
                data: {
                    url: SocialShare.config.permalink,
                    title: SocialShare.config.title,
                    image: SocialShare.config.image,
                    description: SocialShare.config.description
                }
            }).done(function(response) {
                var id = JSON.parse(response.data).id, site = window.origin;
                FB.ui({
                    method: "share",
                    href: site + "/cabi-facebook-sharer/" + id
                });
            }), ga("send", "social", "Facebook", "share");
        }), $(SocialShare.config.twitter_id).attr("href", "https://twitter.com/intent/tweet?text=" + SocialShare.config.title + " " + encodeURIComponent(SocialShare.config.permalink)).attr("target", "_blank").on("click.social-share", function() {
            ga("send", "social", "Twitter", "tweet");
        }), $(SocialShare.config.pinterest_id).attr("href", "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(SocialShare.config.permalink) + "&description=" + SocialShare.config.description + "&media=" + SocialShare.config.image).attr("target", "_blank").on("click.social-share", function() {
            ga("send", "social", "Pinterest", "like");
        });
    }, api;
}(window.jQuery, window.Modal), function(a, b) {
    "use strict";
    function c(a) {
        this.callback = a, this.ticking = !1;
    }
    function f(a, b) {
        b = function d(a) {
            if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
            var b, c, e = a || {};
            for (c = 1; c < arguments.length; c++) {
                var f = arguments[c] || {};
                for (b in f) e[b] = "object" == typeof e[b] ? d(e[b], f[b]) : e[b] || f[b];
            }
            return e;
        }(b, f.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new c(this.update.bind(this)), 
        this.tolerance = function(a) {
            return a === Object(a) ? a : {
                down: a,
                up: a
            };
        }(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.initialised = !1, 
        this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop;
    }
    var g = {
        bind: !!function() {}.bind,
        classList: "classList" in b.documentElement,
        rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame)
    };
    a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, 
    c.prototype = {
        constructor: c,
        update: function() {
            this.callback && this.callback(), this.ticking = !1;
        },
        requestTick: function() {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), 
            this.ticking = !0);
        },
        handleEvent: function() {
            this.requestTick();
        }
    }, f.prototype = {
        constructor: f,
        init: function() {
            return f.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), 
            this) : void 0;
        },
        destroy: function() {
            var b = this.classes;
            this.initialised = !1, a.removeEventListener("scroll", this.debouncer, !1), this.elem.classList.remove(b.unpinned, b.pinned, b.top, b.initial);
        },
        attachEvent: function() {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, 
            a.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent());
        },
        unpin: function() {
            var a = this.elem.classList, b = this.classes;
            (a.contains(b.pinned) || !a.contains(b.unpinned)) && (a.add(b.unpinned), a.remove(b.pinned), 
            this.onUnpin && this.onUnpin.call(this));
        },
        pin: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this));
        },
        top: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this));
        },
        notTop: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this));
        },
        getScrollY: function() {
            return void 0 !== a.pageYOffset ? a.pageYOffset : (b.documentElement || b.body.parentNode || b.body).scrollTop;
        },
        getViewportHeight: function() {
            return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight;
        },
        getDocumentHeight: function() {
            var a = b.body, c = b.documentElement;
            return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight);
        },
        isOutOfBounds: function(a) {
            var b = 0 > a, c = a + this.getViewportHeight() > this.getDocumentHeight();
            return b || c;
        },
        toleranceExceeded: function(a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b];
        },
        shouldUnpin: function(a, b) {
            var c = a > this.lastKnownScrollY, d = a >= this.offset;
            return c && d && b;
        },
        shouldPin: function(a, b) {
            var c = a < this.lastKnownScrollY, d = a <= this.offset;
            return c && b || d;
        },
        update: function() {
            var a = this.getScrollY(), b = a > this.lastKnownScrollY ? "down" : "up", c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), 
            this.lastKnownScrollY = a);
        }
    }, f.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            initial: "headroom"
        }
    }, f.cutsTheMustard = void 0 !== g && g.rAF && g.bind && g.classList, a.Headroom = f;
}(window, document), function($) {
    $ && ($.fn.headroom = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("headroom"), options = "object" == typeof option && option;
            options = $.extend(!0, {}, Headroom.options, options), data || ((data = new Headroom(this, options)).init(), 
            $this.data("headroom", data)), "string" == typeof option && data[option]();
        });
    }, $("[data-headroom]").each(function() {
        var $this = $(this);
        $this.headroom($this.data());
    }));
}(window.Zepto || window.jQuery), StickyHeader = {
    init: function(selector, settings) {
        void 0 === settings && (settings = {
            offset: 78,
            tolerance: {
                down: 5,
                up: 20
            },
            onUnpin: function() {}
        }), $(selector).headroom(settings);
    },
    destroy: function(selector) {
        $(selector).headroom("destroy");
    }
}, window.UrlQuery = function($) {
    var api = {
        get: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(location.search);
            return null === results ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };
    return api;
}(window.jQuery), $(document).on("ready", function() {
    $("[data-vide-options]").each(function(i, elm) {
        $(elm).attr("data-vide-options").indexOf("autoplay") > -1 && setTimeout(function() {
            $(elm).find("video")[0].play();
        }, 125);
    });
}), window.WishList = function($, AJAX_URL) {
    var api = {
        add_item: function(item_id) {
            return $.ajax({
                url: AJAX_URL,
                type: "POST",
                data: {
                    action: "cabi_wishlist_add_item",
                    id: item_id
                }
            }).done(function(count) {
                $(document).trigger("update_count.wishlist", count);
            });
        },
        remove_item: function(item_id) {
            return $.ajax({
                url: AJAX_URL,
                type: "POST",
                data: {
                    action: "cabi_wishlist_remove_item",
                    id: item_id
                }
            }).done(function(count) {
                $(document).trigger("update_count.wishlist", count);
            });
        },
        get_count: function() {
            return $.ajax({
                url: AJAX_URL,
                data: {
                    action: "cabi_wishlist_get_count"
                }
            });
        }
    };
    return api;
}(window.jQuery, window.AJAX_URL);

var app = angular.module("cabi", [ "ngAnimate", "ngCookies", "angular-preload-image", "btford.modal", "ab.socialShare", "cabi.cabi-cuties", "cabi-tap", "cabi.account", "cabi.find-my-stylist", "cabi.exchange-and-return", "cabi.blog", "cabi.browseLook", "cabi.catalog", "cabi.cart", "cabi.contextual-email-promotes", "cabi.create-cultivate", "cabi.ecommerce", "cabi.fashionExperience", "cabi.fashionShow", "cabi.foundation", "cabi.homepage", "cabi.hot-flash", "cabi.items-in-look", "cabi.joinUs", "cabi.lead-form", "cabi.looks", "cabi.mailinglist", "cabi.product", "cabi.outfit", "cabi.favorites", "cabi.directives.profileDropdown", "cabi.directives.sendConsultantEmail", "cabi.directives.sizeChart", "cabi.homeshow", "cabi.localeRedirect", "cabi.quicklook", "cabi.ui", "cabi.shared", "cabi.newArrivals", "cabi.newArrivalsGrace", "cabi.shared", "ngMask" ]);

function loadScript(url, callback, dont_use_css) {
    var head = document.getElementsByTagName("head")[0], script = document.createElement("script");
    if (script.type = "text/javascript", script.src = TEMPLATE_DIR + "/assets/js/" + url + ".js", 
    script.onreadystatechange = callback, script.onload = callback, head.appendChild(script), 
    !dont_use_css) {
        var link = document.createElement("link");
        link.type = "text/css", link.rel = "stylesheet", link.href = TEMPLATE_DIR + "/assets/css/" + url + ".css", 
        head.appendChild(link);
    }
}

function proxyMouseEvent(event, element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(event.type, event.bubbles, event.cancelable, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), 
    element.dispatchEvent(evt);
}

if (app.constant("clioEnabled", CLIO_ENABLED), app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}), app.run([ "profileService", "authServiceNew", "cartService", "clioEnabled", "gaTrackingService", function(profileService, authServiceNew, cartService, CLIO_ENABLED, gaTrackingService) {
    profileService.getProfile().then(function(data) {
        authServiceNew.forceLogin(data), gaTrackingService.setUserId(data.partyId);
    }, function(error) {
        authServiceNew.forceLogout();
    }), authServiceNew.consultant = window.CABI_STYLIST_INFO, cartService.getCart();
} ]), function($, Navigation_Select_States, WishList) {
    $(document).ready(function() {
        Navigation_Select_States.check_page();
    }), $(document).on("consultantInfo", function(e) {
        $("li.host a", ".consultant-links").attr("href", "mailto:" + window.CABI_STYLIST_INFO.Email + "?subject=I’d Like to Host A CAbi Show"), 
        $("li.consultant a", ".consultant-links").attr("href", "mailto:" + window.CABI_STYLIST_INFO.Email + "?subject=I’d like to learn more about becoming a cabi Stylists"), 
        $("[data-brand-mobile]").remove(), $("body").addClass("cabi-consultant-site");
    }), "function" != typeof String.prototype.trimLeft && (String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, "");
    }), "function" != typeof String.prototype.trimRight && (String.prototype.trimRight = function() {
        return this.replace(/\s+$/, "");
    }), "function" != typeof Array.prototype.map && (Array.prototype.map = function(callback, thisArg) {
        for (var i = 0, n = this.length, a = []; i < n; i++) i in this && (a[i] = callback.call(thisArg, this[i]));
        return a;
    }), $(document).on("ready", function() {
        $(".current-menu-ancestor", "#menu-main-navigation-1").length || $(".current-menu-item", "#menu-main-navigation-1").length || ($("#sidebar #menu-main-navigation-1 > li").addClass("current-menu-ancestor"), 
        $("#sidebar #menu-main-navigation-1 > li .sub-menu").hide()), $(document).on("submit", ".mailing-list-form form", function(e) {
            if ($email = $(this).find(".email"), $(this).removeClass("error"), "" === $email.val() && $(this).addClass("error"), 
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            re.test($email.val()) || $(this).addClass("error"), $(this).hasClass("error")) return !1;
            $(this).find("input[type=submit]").attr("disbled", !0).addClass("submitting"), ga("send", "event", "Email", "Signup");
        }), $("#header-wrapper a").on("click", function() {
            ga("send", "event", "Navigation CTR", PAGE_TITLE, $(this).text()), ga("send", "event", "Navigation", "Header", $(this).text());
        }), $("#site-footer a").on("click", function() {
            ga("send", "event", "Navigation", "Footer", $(this).text());
        }), document.all && !window.atob && $("body").addClass("isIE9"), /Mobi/.test(navigator.userAgent) && $("body").addClass("isMobileBrowser"), 
        $("#site-search-toggle").on("click", function(e) {
            $(this).toggleClass("active"), $("#site-search-form-container").toggleClass("active"), 
            $("#site-search-input").focus();
        }), function() {
            $("#footer-menus li:first ul.sub-menu:first ul.sub-menu:first").remove();
            var $clone = $("#clothing-categories").clone().attr("id", "clothing-categories-footer");
            $("#footer-menus li:first ul.sub-menu:first li:first").append($clone);
            var $looks_clone = $("#look-categories li").clone();
            $("#menu-item-24460 .sub-menu").append($looks_clone);
        }(), $("#footer-menus").mmenu({
            extensions: [ "border-full" ]
        }, {
            clone: !0,
            offCanvas: {
                pageNodetype: "main"
            }
        });
        var API = $("#footer-menus").data("mmenu"), nav = $("#header-wrapper"), footer = $("footer");
        $("main");
        function mobileAnimateOut($param) {
            $param.removeClass("open");
        }
        function mobileAnimateIn($param) {
            $param.addClass("open");
        }
        $("#mobile-menu-button").click(function(e) {
            e.preventDefault(), e.stopPropagation(), API.open();
        }), API.bind("open", function() {
            mobileAnimateIn(nav), mobileAnimateIn(footer), $("body").addClass("mm-menu-open"), 
            $(".current-menu-parent .mm-next").click();
        }), API.bind("close", function() {
            mobileAnimateOut(nav), mobileAnimateOut(footer), setTimeout(function() {
                $("body").removeClass("mm-menu-open");
            }, 400);
        }), function() {
            var sub_content, home, $ul = $("#mm-menu-main-navigation"), $Sub_ul = $("#mm-footer-menus .sub-menu"), $clothing_categories_mobileMenu = $("#mm-3 .sub-menu"), $clothing_categories = $("#clothing-categories li");
            home = '<li class="standout menu-item menu-item-type-custom menu-item-object-custom"><a href="https://www.cabionline.com">Home</a></li>';
            var new_content = "";
            new_content = '<li class="mm-menu-item-extra"><a target="_blank" href="https://www.cabiclio.com/backoffice/control/main">Stylist login</a></li><li data-microsite-mobile class="mm-menu-item-extra"><a target="_blank" href="https://www.cabiclio.com/hostessportal/control/main">Show Planner</a></li><li class="mm-multiline social-links"> <span><a target="_blank" href="http://www.facebook.com/cabiclothing" title="Facebook" ><i class="fa fa-facebook"></i></a></span> <span><a target="_blank" href="https://www.instagram.com/cabiclothing" title="Instagram" ><i class="fa fa-instagram"></i></a></span> <span><a target="_blank" href="http://www.twitter.com/cabiclothing" title="Twitter"><i class="fa fa-twitter"></i></a></span> <span><a target="_blank" href="http://pinterest.com/cabiclothing" title="Pinterest" ><i class="fa fa-pinterest"></i></a></span> <span><a target="_blank" href="http://youtube.com/cabiclothing" title="Youtube" ><i class="fa fa-youtube"></i></a></span></li>', 
            new_content += '<li class="mm-multiline mm-tap-callout"><div class="o-flex-layout o-flex-layout--include-fluid" onclick="window.location.href=\'/cabitap\'"><img src="/wp-content/themes/cabi/assets/images/cabi-download/app-icon.svg" class="get-your-app__svg" alt="cabi tap"><div class="mm-tap-callout-content"><div class="mm-tap-callout-title">Get our app!</div><div class="mm-tap-callout-copy">Get your cabi fashion fix in-between shows and on the go</div></div></div></li>', 
            sub_content = '<li data-brand-mobile class="mm-menu-item-extra"><a open-find-stylist-modal="find-my-stylist.find-my-stylist-gateway">Find my Stylist</a></li>', 
            $ul.prepend(home), $ul.append(new_content), $Sub_ul.append(sub_content), $clothing_categories_mobileMenu.prepend($clothing_categories.clone()), 
            $(".mm-panel .sub-menu li a span.show-on-consultant-site").parent().parent().addClass("show-on-consultant-site");
        }(), $("#mm-menu-main-navigation a:not(.mm-next)").on("click", function(e) {
            1 == $(this).parent().children().length ? window.location.href = $(this).parent().children().attr("href") : (e.preventDefault(), 
            e.stopPropagation(), $(this).parent().children().eq(0).trigger("click"));
        });
        var back_text = [];
        $(".mm-btn.mm-prev").next(".mm-title").each(function(i, e) {
            back_text.push($(".mm-title"));
        }), $.each(back_text, function(i, e) {
            $(this).text("Back");
        }), $("a[data-video-w-poster]").on("click", function(e) {
            e.preventDefault();
            var video = $(this).find(".youtube-video-container iframe"), videoSrc = $(this).find(".youtube-video-container iframe").attr("src");
            $(this).find(".video-wrapper-poster").hide(), $(this).find(".video-wrapper-video").show(), 
            video.attr("src", videoSrc.replace("&autoplay=0", "&autoplay=1"));
        });
    });
}(jQuery, window.Navigation_Select_States, window.WishList), window.matchMedia = window.matchMedia || function() {
    return {
        matches: !1,
        addListener: function() {},
        removeListener: function() {}
    };
}, $(".block-faqs .panel-heading").on("click", function() {
    return $(this).hasClass("open") ? ($(this).removeClass("open"), $(this).siblings(".panel-body").slideUp(300), 
    $(this).find(".more-text").html("+")) : ($(this).addClass("open"), $(this).siblings(".panel-body").slideDown(300), 
    $(this).find(".more-text").html("-")), !1;
}), $("#search-wrapper > i").on("click", function(e) {
    e.preventDefault(), e.stopPropagation(), $("body").addClass("search-visible"), $("#site-search-input").trigger("focus"), 
    $(document).one("keyup", function(e) {
        27 === e.keyCode && $("#search-dropdown").trigger("click");
    }), $("#search-dropdown").one("click", function(e) {
        $("body").removeClass("search-visible");
    });
}), $(".search-dropdown-wrapper").on("click", function(e) {
    e.stopPropagation();
}), RESPONSIVE_LARGE_DESKTOP = "screen and (min-width: 1330px)", RESPONSIVE_LANDSCAPE_TABLET = "screen and (min-width: 769px) and (max-width: 1080px)", 
RESPONSIVE_PORTRAIT_TABLET = "screen and (max-width: 768px)", RESPONSIVE_MOBILE = "screen and (max-width: 480px)", 
("collection-clothes" == window.jQuery("body").attr("data-page-id") || window.jQuery('body[data-page-id^="collection-clothes-category"]').length) && function($, Handlebars, AJAX_URL, TEMPLATE_DIR, CollectionItem, DropdownList, CollectionPromotionInjector, Category_Select_State_Mobile, Modal) {
    var $clone;
    ($clone = $("#item-category-filter > ul").clone()).find("> li").each(function() {
        var $li = $(this);
        $li.find(".children") && $li.find(".children li").each(function() {
            $li.after($(this).addClass("sub-item"));
        });
    }), $clone.attr("id", "mobile-dropdown-list-clone"), $("body").after($clone);
    var $dd = new DropdownList({
        list: "#mobile-dropdown-list-clone",
        id: "mobile-dropdown-list"
    });
    $("#mobile-dropdown-list-clone").remove(), $dd.appendTo($(".collection-archive-mobile-menu--js")), 
    $(document).ready(function() {
        Category_Select_State_Mobile.check_page(), $("#item-category-filter .children .current-cat").length && $("#item-category-filter .children .current-cat").parents(".children").show();
    }), $("a[data-modal-open]").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-cat-video");
    });
}(window.jQuery, window.Handlebars, window.AJAX_URL, window.TEMPLATE_DIR, window.CollectionItem, window.DropdownList, window.CollectionPromotionInjector, window.Category_Select_State_Mobile, window.Modal), 
window.jQuery("body").hasClass("post-type-archive-looks") && function($, Breakpoints) {
    var minWidth = window.Breakpoints.Screen_Desktop, slickArgs = {
        dots: !0,
        autoplay: !0,
        autoplaySpeed: 3e3,
        responsive: [ {
            breakpoint: minWidth,
            settings: "unslick"
        } ]
    }, sliderLoaded = !1;
    slickInit = function() {
        $(".looks-landing-featured-grid").slick(slickArgs), sliderLoaded = !0;
    }, $(window).on("load", function() {
        slickInit();
    }), $(window).on("resize", function() {
        $(window).width() > minWidth && sliderLoaded && slickInit();
    });
}(window.jQuery, window.Breakpoints), (window.jQuery("body").hasClass("blog") || window.jQuery("body").hasClass("category") && window.jQuery("body").hasClass("archive")) && window.jQuery, 
window.jQuery("body").hasClass("single-items") && (window.ItemColor = function($) {
    var api = {
        current_color: null,
        set_color: function(new_color) {
            new_color != api.current_color && (api.current_color = new_color, $(document).trigger("change.color", new_color));
        }
    };
    return api;
}(window.jQuery), window.ImageThumbnails = function($, ScrollHelper, ItemColor) {
    return function() {
        "use strict";
        var proto$0 = {};
        function ImageThumbnails(main_image) {
            this.main_image = main_image, this.$thumbail_images = $("#item-image-thumbnails .detail-images li a"), 
            this.bind_events(), this.set_active_thumbnail(this.$thumbail_images.first());
        }
        return DP$0(ImageThumbnails, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.bind_events = function() {
            $(window).on("load", ScrollHelper.init);
            var _this = this;
            this.$thumbail_images.on("click", function(e) {
                e.preventDefault(), _this.set_active_thumbnail($(this));
            });
        }, proto$0.set_active_thumbnail = function($a) {
            ItemColor.set_color($a.data("color")), this.$thumbail_images.removeClass("active"), 
            $a.addClass("active"), ScrollHelper.scroll_img($a.parents("li").index()), this.main_image.set_main_image($a.data("full-image"));
        }, MIXIN$0(ImageThumbnails.prototype, proto$0), proto$0 = void 0, ImageThumbnails;
    }();
}(window.jQuery, window.Item_Thumbnails_Scroll_Helper, window.ItemColor), window.ItemColorSelector = function($, ItemColor) {
    return function() {
        "use strict";
        var proto$0 = {};
        function ItemColorSelector(dom_id) {
            this.dom_id = dom_id, this.bind_events();
        }
        return DP$0(ItemColorSelector, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.bind_events = function() {
            var _this = this;
            $(this.dom_id).on("click", ".current_color", function() {
                _this.toggle_dropdown();
            }), $("ul", this.dom_id).on("click", "li", function() {
                var color = $(this).children("a").text().trim().replace(/\s/, "").toLowerCase();
                _this.set_active_color(color), ItemColor.set_color(color);
            });
        }, proto$0.toggle_dropdown = function() {
            "true" == $(this.dom_id).attr("data-open") ? this.close_dropdown() : this.open_dropdown();
        }, proto$0.close_dropdown = function() {
            $(".current_color", this.dom_id).parent().children("ul").hide(), $(this.dom_id).removeAttr("data-open");
        }, proto$0.open_dropdown = function() {
            $(".current_color", this.dom_id).parent().children("ul").slideDown("fast"), $(this.dom_id).attr("data-open", "true");
        }, proto$0.set_active_color = function(color) {
            var $li = $("li[data-color=" + color + "]", this.dom_id);
            $("li", this.dom_id).removeClass("active"), $li.addClass("active"), $(".current_color .color", this.dom_id).html($li.html()), 
            this.close_dropdown();
        }, MIXIN$0(ItemColorSelector.prototype, proto$0), proto$0 = void 0, ItemColorSelector;
    }();
}(window.jQuery, window.ItemColor), function($, CollectionItem, WishList, MainImage, ItemColor, ImageThumbnails, ColorSelector, HashUrl, Breakpoints, SocialShare, Loader, Modal) {
    var self = this;
    this.item_id = $("#page").data("item-id"), this.main_image = new MainImage(), this.color_selector = new ColorSelector("#item-color-select");
    var windowWidth = $(window).innerWidth();
    SocialShare.init(), $("#item-care-instructions-toggle").on("click", function(e) {
        e.preventDefault(), $("#item-care-instructions-collapse").slideToggle(), "true" == $(this).attr("data-open") ? $(this).removeAttr("data-open") : $(this).attr("data-open", "true");
    }), $(".collection-item").each(function() {
        $(this).imagesLoaded(function(result) {
            new CollectionItem($(result).parents(".collection-item"));
        });
    }), windowWidth >= Breakpoints.Screen_Desktop && $("#item-main-image [data-zoom-icon]").on("click", function(e) {
        Modal.open("[data-zoom-content]");
    }), $("#add-to-wishlist-btn").on("click", function(e) {
        e.preventDefault(), Loader.show(), $.proxy(WishList.add_item(self.item_id), self);
    }), $(document).on("update_count.wishlist", function() {
        Loader.hide(), $("#item-actions li.add-to-wishlist").attr("data-added", "");
    }), $(window).on("load", function() {
        HashUrl.get() && ItemColor.set_color(HashUrl.get());
    }), $(".item-secondary-info-mobile-header").on("click", function() {
        $(this).next(".item-secondary-info-mobile-content").hasClass("close") ? ($(this).next(".item-secondary-info-mobile-content").removeClass("close"), 
        $(this).next(".item-secondary-info-mobile-content").addClass("open")) : $(this).next(".item-secondary-info-mobile-content").hasClass("open") && ($(this).next(".item-secondary-info-mobile-content").removeClass("open"), 
        $(this).next(".item-secondary-info-mobile-content").addClass("close"));
    });
}(window.jQuery, window.CollectionItem, window.WishList, window.MainImage, window.ItemColor, window.ImageThumbnails, window.ItemColorSelector, window.HashUrl, window.Breakpoints, window.SocialShare, window.Loader, window.Modal)), 
window.jQuery("body").hasClass("single-looks") && function($, CollectionItem, WishList, Loader, SocialShare) {
    var _this = this;
    this.item_id = $("#page").data("item-id"), this.main_image = new MainImage(), SocialShare.init(), 
    $("collection-item").each(function() {
        var id = $(this).attr("post-id");
        $(this).on("mouseenter", function() {
            $("#g-" + id).addClass("hovering");
        }).on("mouseleave", function() {
            $("#g-" + id).removeClass("hovering");
        });
    }), $(".btn-number").on("mouseenter", function() {
        var collectionItem = jQuery("collection-item[post-id=" + $(this).attr("id").substring(2) + "]");
        angular.element(collectionItem).isolateScope().setHoverBorder(), angular.element(collectionItem).isolateScope().settings.isHovering = !0, 
        angular.element(collectionItem).isolateScope().$apply();
    }).on("mouseleave", function() {
        var collectionItem = jQuery("collection-item[post-id=" + $(this).attr("id").substring(2) + "]");
        angular.element(collectionItem).isolateScope().settings.isHovering = !1, angular.element(collectionItem).isolateScope().$apply();
    }), $("#add-to-wishlist-btn").on("click", function(e) {
        e.preventDefault(), Loader.show(), $.proxy(WishList.add_item(_this.item_id), self);
    }), $(document).on("update_count.wishlist", function() {
        Loader.hide(), $("#section-actions li.add-to-wishlist").attr("data-added", "");
    });
}(window.jQuery, window.CollectionItem, window.WishList, window.Loader, window.SocialShare), 
(window.jQuery("body").hasClass("blog") || window.jQuery("body").hasClass("single-post") || window.jQuery("body").hasClass("archive")) && function($, Breakpoints, TweenMax, ScrollMagic, Modernizr) {
    function _closeMobileMenu(that) {
        $("body").removeClass("knockout-visible"), that.removeClass("menu-active"), $(".blog__nav-mobile-popup").slideUp();
    }
    $(".blog__nav-button-link--js").on("click", function(e) {
        e.preventDefault(), e.stopPropagation(), $this = $(this), $this.hasClass("menu-active") ? _closeMobileMenu($this) : ($("body").addClass("knockout-visible"), 
        $(this).addClass("menu-active"), $(this).parent(".blog__nav-button").siblings(".blog__nav-mobile-popup").slideDown(600)), 
        $(".blog__nav-mobile-popup").on("click", function(e) {
            e.stopPropagation();
        }), $(document).on("click", function(e) {
            _closeMobileMenu($this);
        });
    });
    var submenu = $(".blog__nav-mobile-list");
    submenu.not(submenu[0]).slideUp(), $(".blog__nav-mobile--js").on("click", function(e) {
        e.preventDefault(), $this = $(this), $this.hasClass("open") ? (submenu.slideUp().delay(250), 
        $this.toggleClass("open")) : (submenu.slideUp(), $(".blog__nav-mobile--js").removeClass("open"), 
        $this.next().slideDown(), $this.toggleClass("open"));
    });
}(window.jQuery, window.Breakpoints, window.TweenMax, window.ScrollMagic, window.Modernizr), 
"page-business-model" == window.jQuery("#page").attr("data-page-id") && function($, Modal) {
    function sectionSalesHeight() {
        window.innerWidth < 768 ? $(".section-sales .wrapper").removeAttr("style") : $(".section-sales .wrapper").each(function() {
            $(this).removeAttr("style");
            var sectionHeight = $(this).find(".section-description").innerHeight();
            $(this).css("height", sectionHeight), console.log(sectionHeight);
        });
    }
    $(".expanding-btn__js").on("click", function() {
        var btn = $(this);
        return btn.hasClass("open") ? (btn.removeClass("open"), $(this).closest(".section-sales").removeClass("open"), 
        $(this).closest(".section-sales").find(".expanding-box__js").slideUp(400)) : (btn.addClass("open"), 
        $(this).closest(".section-sales").addClass("open"), $(this).closest(".section-sales").find(".expanding-box__js").slideDown(500)), 
        !1;
    }), $("a[data-calculator]").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-calculator"), ga("send", "event", "Content Interaction", "click", "View", "Business Model: Calculator");
    }), $(".calculator a").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-calculator"), ga("send", "event", "Content Interaction", "click", "View", "Business Model: Calculator");
    }), sectionSalesHeight(), $(window).resize(function() {
        setTimeout(sectionSalesHeight, 100);
    }), $(".cabi-slideshow").each(function() {
        $(this).find(".slide:first").addClass("active slideInRight");
    }), $(".slideshow-next").on("click", function(e) {
        e.preventDefault();
        var $slideshow = $(this).parents(".cabi-slideshow"), $current_slide = $slideshow.find(".active");
        ($current_slide.next(".slide").length ? $current_slide.next(".slide") : $slideshow.find(".slide:first")).removeClass("active slideOutLeft").addClass("active slideInRight"), 
        $current_slide.removeClass("active").addClass("slideOutLeft");
    });
    var mouse_over = !1;
    setInterval(function() {
        mouse_over || $(".slideshow-next").trigger("click");
    }, 1e4), $(".cabi-slideshow").on("mouseenter mouseleave", function(e) {
        mouse_over = "mouseenter" == e.type;
    });
}(window.jQuery, window.Modal), "page-cabi-girls" == window.jQuery("#page").attr("data-page-id") && function($, Breakpoints, Modernizr) {
    $(window).width() < Breakpoints.Screen_Tablet && ($(".cabi-girls__show-more--js").dblclick(function(e) {
        e.preventDefault();
    }), $(".cabi-girls__content-description").each(function(index, value) {
        $(this).outerHeight() > 400 && ($(this).height(300), $(this).after('<p class="cabi-girls__show-more"><a href="javascript://" class="btn btn-transparent cabi-girls__show-more--js">Read More</a></p>'));
    }), $(".cabi-girls__show-more--js").on("click", function() {
        console.log("face"), $(this).parent(".cabi-girls__show-more").siblings(".cabi-girls__content-description").height("100%"), 
        $(this).parent(".cabi-girls__show-more").hide();
    })), $(".scrollingDiv").theiaStickySidebar({
        additionalMarginTop: 62
    });
}(window.jQuery, window.Breakpoints, window.Modernizr), "cabi-tv" == window.jQuery("body").attr("data-page-id") && function($) {
    new (function() {
        "use strict";
        var proto$0 = {};
        function FeaturedVideoInjector($promos, $grid) {
            this.$promos = $promos, this.$grid = $grid;
        }
        return DP$0(FeaturedVideoInjector, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !1
        }), proto$0.inject = function() {
            for (var promo_index = 0, i = 6; i < $(".view-thumbnail", this.$grid).length; i += 7) {
                var promo = this.$promos.eq(promo_index);
                if ($(".view-thumbnail", this.$grid).eq(i - 1).after($(promo).wrap("<p/>").parent().html()), 
                ++promo_index == this.$promos.length) return void $(".featured-video-promote:odd", this.$grid).addClass("odd");
            }
        }, proto$0.remove = function() {
            $(".featured-video-promote", this.$grid).remove();
        }, proto$0.prepend_videos_of_term = function(term) {
            var _this = this;
            this.$promos.filter("." + term).each(function() {
                _this.$grid.prepend($(this));
            });
        }, MIXIN$0(FeaturedVideoInjector.prototype, proto$0), proto$0 = void 0, FeaturedVideoInjector;
    }())($("#featured-video-promos .post-type-video"), $("#videos .container")).inject();
}(window.jQuery), "seasonal-collection" == window.jQuery("body").attr("data-page-id") && (!function($, Slick) {
    $("#collection-landing-spot-a").slick({
        infinite: !0,
        dots: !0,
        appendDots: $(".slide-dots-control-grid"),
        arrows: !1,
        autoplay: !0,
        autoplaySpeed: 6e3
    });
}(window.jQuery, window.Slick), window.swapAB = function() {
    $(".collection-landing").toggleClass("type-a"), $(".collection-landing").toggleClass("type-b");
}, $(document).on("ready", function() {
    window.location.search.indexOf("variant") > -1 && window.swapAB();
})), "denim-guide" == window.jQuery("body").attr("data-page-id")) {
    var resizeCheckParallax, winScrollTop = 0;
    function parallax() {
        $(window).scrollTop();
        $(".parallax-section").each(function() {
            if ($(this).is_on_screen()) {
                var firstTop = $(this).offset().top - 175, $bg = $(this).find(".inner-bg"), $front = $(this).find(".front-img-wrapper"), $full = $(this).find(".full-img-wrapper"), moveTopBG = .8 * (winScrollTop - firstTop), moveTopFront = .35 * (firstTop - winScrollTop), moveTopFull = .8 * (winScrollTop - firstTop);
                $(window).width() < 1e3 ? (moveTopBG *= 0, moveTopFull *= 0) : $(window).width() <= 1250 && (moveTopBG *= .3, 
                moveTopFront *= .3, moveTopFull *= .3), moveTopBG < 5 && ($bg.css("transform", "translateY(" + -moveTopBG + "px)"), 
                $bg.css("opacity", 1 - -moveTopBG / 350)), moveTopFront > 5 && ($front.css("transform", "translateY(" + -moveTopFront + "px)"), 
                $front.css("opacity", 1 - moveTopFront / 250)), moveTopFull < 5 && $full.css("transform", "translateY(" + -moveTopFull + "px)");
            }
        });
    }
    $.fn.is_on_screen = function() {
        var win = $(window), viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        return bounds.bottom = bounds.top + this.outerHeight(), !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    }, $(document).ready(function(e) {
        winScrollTop = $(this).scrollTop(), parallax();
    }), $(window).scroll(function(e) {
        winScrollTop = $(this).scrollTop(), parallax();
    }), $(window).on("resize", function() {
        clearTimeout(resizeCheckParallax), resizeCheckParallax = setTimeout(function() {
            window.innerWidth < 1250 ? ($(".inner-bg").each(function(index) {
                $(this).css("transform", "translateY(0)");
            }), $(".front-img-wrapper").each(function(index) {
                $(this).css("transform", "translateY(0)");
            }), $(".full-img-wrapper").each(function(index) {
                $(this).css("transform", "translateY(0)");
            })) : (winScrollTop = $(this).scrollTop(), parallax());
        }, 200);
    }), !function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", [ "jquery" ], function(i) {
            e(t, i);
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
    }(window, function(t, e) {
        "use strict";
        function i(i, r, a) {
            (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
            }), a.fn[i] = function(t) {
                return "string" == typeof t ? function(t, e, n) {
                    var o, r = "$()." + i + '("' + e + '")';
                    return t.each(function(t, h) {
                        var u = a.data(h, i);
                        if (u) {
                            var d = u[e];
                            if (d && "_" != e.charAt(0)) {
                                var l = d.apply(u, n);
                                o = void 0 === o ? l : o;
                            } else s(r + " is not a valid method");
                        } else s(i + " not initialized. Cannot call methods, i.e. " + r);
                    }), void 0 !== o ? o : t;
                }(this, t, o.call(arguments, 1)) : (function(t, e) {
                    t.each(function(t, n) {
                        var o = a.data(n, i);
                        o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
                    });
                }(this, t), this);
            }, n(a));
        }
        function n(t) {
            !t || t && t.bridget || (t.bridget = i);
        }
        var o = Array.prototype.slice, r = t.console, s = void 0 === r ? function() {} : function(t) {
            r.error(t);
        };
        return n(e || t.jQuery), i;
    }), function(t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
    }(this, function() {
        function t() {}
        var e = t.prototype;
        return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {}, n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this;
            }
        }, e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0, this;
            }
        }, e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this;
            }
        }, e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0, o = i[n];
                e = e || [];
                for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                    var s = r && r[o];
                    s && (this.off(t, o), delete r[o]), o.apply(this, e), o = i[n += s ? 0 : 1];
                }
                return this;
            }
        }, t;
    }), function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
            return e();
        }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
    }(window, function() {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e;
        }
        function n(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
            e;
        }
        function o() {
            if (!d) {
                d = !0;
                var e = document.createElement("div");
                e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
                e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var o = n(e);
                r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e);
            }
        }
        function r(e) {
            if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                var r = n(e);
                if ("none" == r.display) return function() {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; u > e; e++) t[h[e]] = 0;
                    return t;
                }();
                var a = {};
                a.width = e.offsetWidth, a.height = e.offsetHeight;
                for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                    var c = h[l], f = r[c], m = parseFloat(f);
                    a[c] = isNaN(m) ? 0 : m;
                }
                var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, E = a.borderTopWidth + a.borderBottomWidth, z = d && s, b = t(r.width);
                !1 !== b && (a.width = b + (z ? 0 : p + _));
                var x = t(r.height);
                return !1 !== x && (a.height = x + (z ? 0 : g + E)), a.innerWidth = a.width - (p + _), 
                a.innerHeight = a.height - (g + E), a.outerWidth = a.width + y, a.outerHeight = a.height + v, 
                a;
            }
        }
        var s, a = "undefined" == typeof console ? function() {} : function(t) {
            console.error(t);
        }, h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ], u = h.length, d = !1;
        return r;
    }), function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
    }(window, function() {
        "use strict";
        var t = function() {
            var t = Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = [ "webkit", "moz", "ms", "o" ], i = 0; i < e.length; i++) {
                var o = e[i] + "MatchesSelector";
                if (t[o]) return o;
            }
        }();
        return function(e, i) {
            return e[t](i);
        };
    }), function(t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "desandro-matches-selector/matches-selector" ], function(i) {
            return e(t, i);
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
    }(window, function(t, e) {
        var i = {
            extend: function(t, e) {
                for (var i in e) t[i] = e[i];
                return t;
            },
            modulo: function(t, e) {
                return (t % e + e) % e;
            },
            makeArray: function(t) {
                var e = [];
                if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
                return e;
            },
            removeFrom: function(t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            },
            getParent: function(t, i) {
                for (;t != document.body; ) if (t = t.parentNode, e(t, i)) return t;
            },
            getQueryElement: function(t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            },
            handleEvent: function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            },
            filterFindElements: function(t, n) {
                var o = [];
                return (t = i.makeArray(t)).forEach(function(t) {
                    if (t instanceof HTMLElement) {
                        if (!n) return void o.push(t);
                        e(t, n) && o.push(t);
                        for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]);
                    }
                }), o;
            },
            debounceMethod: function(t, e, i) {
                var n = t.prototype[e], o = e + "Timeout";
                t.prototype[e] = function() {
                    var t = this[o];
                    t && clearTimeout(t);
                    var e = arguments, r = this;
                    this[o] = setTimeout(function() {
                        n.apply(r, e), delete r[o];
                    }, i || 100);
                };
            },
            docReady: function(t) {
                "complete" == document.readyState ? t() : document.addEventListener("DOMContentLoaded", t);
            },
            toDashed: function(t) {
                return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                    return e + "-" + i;
                }).toLowerCase();
            }
        }, n = t.console;
        return i.htmlInit = function(e, o) {
            i.docReady(function() {
                var r = i.toDashed(o), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"), h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)), d = s + "-options", l = t.jQuery;
                u.forEach(function(t) {
                    var i, r = t.getAttribute(s) || t.getAttribute(d);
                    try {
                        i = r && JSON.parse(r);
                    } catch (a) {
                        return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + a));
                    }
                    var h = new e(t, i);
                    l && l.data(t, o, h);
                });
            });
        }, i;
    }), function(t, e) {
        "function" == typeof define && define.amd ? define("outlayer/item", [ "ev-emitter/ev-emitter", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, 
        t.Outlayer.Item = e(t.EvEmitter, t.getSize));
    }(window, function(t, e) {
        "use strict";
        function n(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create());
        }
        var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition", a = "string" == typeof r.transform ? "transform" : "WebkitTransform", h = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[s], u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        }, d = n.prototype = Object.create(t.prototype);
        d.constructor = n, d._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            });
        }, d.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t);
        }, d.getSize = function() {
            this.size = e(this.element);
        }, d.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                e[u[i] || i] = t[i];
            }
        }, d.getPosition = function() {
            var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], r = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
            s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, 
            a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a;
        }, d.layoutPosition = function() {
            var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right", s = i ? "right" : "left", a = this.position.x + t[o];
            e[r] = this.getXValue(a), e[s] = "";
            var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[h];
            e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [ this ]);
        }, d.getXValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
        }, d.getYValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
        }, d._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y;
            if (this.setPosition(t, e), !s || this.isTransitioning) {
                var a = t - i, h = e - n, u = {};
                u.transform = this.getTranslate(a, h), this.transition({
                    to: u,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                });
            } else this.layoutPosition();
        }, d.getTranslate = function(t, e) {
            var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
            return "translate3d(" + (t = i ? t : -t) + "px, " + (e = n ? e : -e) + "px, 0)";
        }, d.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition();
        }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10);
        }, d._nonTransition = function(t) {
            for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this);
        }, d.transition = function(t) {
            if (parseFloat(this.layout.options.transitionDuration)) {
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    this.element.offsetHeight;
                    null;
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
            } else this._nonTransition(t);
        };
        var l = "opacity," + function(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase();
            });
        }(a);
        d.enableTransition = function() {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t, this.css({
                    transitionProperty: l,
                    transitionDuration: t,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(h, this, !1);
            }
        }, d.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t);
        }, d.onotransitionend = function(t) {
            this.ontransitionend(t);
        };
        var c = {
            "-webkit-transform": "transform"
        };
        d.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn, n = c[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], function(t) {
                    for (var e in t) return !1;
                    return !0;
                }(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", 
                delete e.clean[n]), n in e.onEnd) e.onEnd[n].call(this), delete e.onEnd[n];
                this.emitEvent("transitionEnd", [ this ]);
            }
        }, d.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1;
        }, d._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e);
        };
        var f = {
            transitionProperty: "",
            transitionDuration: "",
            transitionDelay: ""
        };
        return d.removeTransitionStyles = function() {
            this.css(f);
        }, d.stagger = function(t) {
            t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
        }, d.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [ this ]);
        }, d.remove = function() {
            return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
                this.removeElem();
            }), void this.hide()) : void this.removeElem();
        }, d.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, 
            this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            });
        }, d.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal");
        }, d.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i;
        }, d.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, 
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            });
        }, d.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"));
        }, d.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            });
        }, n;
    }), function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function(i, n, o, r) {
            return e(t, i, n, o, r);
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
    }(window, function(t, e, i, n, o) {
        "use strict";
        function r(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), 
                this.option(e);
                var o = ++l;
                this.element.outlayerGUID = o, c[o] = this, this._create(), this._getOption("initLayout") && this.layout();
            } else h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
        }
        function s(t) {
            function e() {
                t.apply(this, arguments);
            }
            return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
        }
        var h = t.console, u = t.jQuery, d = function() {}, l = 0, c = {};
        r.namespace = "outlayer", r.Item = o, r.defaults = {
            containerStyle: {
                position: "relative"
            },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        };
        var f = r.prototype;
        n.extend(f, e.prototype), f.option = function(t) {
            n.extend(this.options, t);
        }, f._getOption = function(t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
        }, r.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, f._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), 
            this._getOption("resize") && this.bindResize();
        }, f.reloadItems = function() {
            this.items = this._itemize(this.element.children);
        }, f._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                var s = new i(e[o], this);
                n.push(s);
            }
            return n;
        }, f._filterFindItemElements = function(t) {
            return n.filterFindElements(t, this.options.itemSelector);
        }, f.getItemElements = function() {
            return this.items.map(function(t) {
                return t.element;
            });
        }, f.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0;
        }, f._init = f.layout, f._resetLayout = function() {
            this.getSize();
        }, f.getSize = function() {
            this.size = i(this.element);
        }, f._getMeasurement = function(t, e) {
            var n, o = this.options[t];
            o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), 
            this[t] = n ? i(n)[e] : o) : this[t] = 0;
        }, f.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
        }, f._getItemsForLayout = function(t) {
            return t.filter(function(t) {
                return !t.isIgnored;
            });
        }, f._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                var i = [];
                t.forEach(function(t) {
                    var n = this._getItemLayoutPosition(t);
                    n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
                }, this), this._processLayoutQueue(i);
            }
        }, f._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            };
        }, f._processLayoutQueue = function(t) {
            this.updateStagger(), t.forEach(function(t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e);
            }, this);
        }, f.updateStagger = function() {
            var t = this.options.stagger;
            return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = function(t) {
                if ("number" == typeof t) return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
                return i.length ? (i = parseFloat(i)) * (m[n] || 1) : 0;
            }(t), this.stagger);
        }, f._positionItem = function(t, e, i, n, o) {
            n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
        }, f._postLayout = function() {
            this.resizeContainer();
        }, f.resizeContainer = function() {
            if (this._getOption("resizeContainer")) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
            }
        }, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), 
                t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
            }
        }, f._emitCompleteOnItems = function(t, e) {
            function i() {
                o.dispatchEvent(t + "Complete", null, [ e ]);
            }
            function n() {
                ++s == r && i();
            }
            var o = this, r = e.length;
            if (e && r) {
                var s = 0;
                e.forEach(function(e) {
                    e.once(t, n);
                });
            } else i();
        }, f.dispatchEvent = function(t, e, i) {
            var n = e ? [ e ].concat(i) : i;
            if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), 
            e) {
                var o = u.Event(e);
                o.type = t, this.$element.trigger(o, i);
            } else this.$element.trigger(t, i);
        }, f.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0);
        }, f.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored;
        }, f.stamp = function(t) {
            (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
        }, f.unstamp = function(t) {
            (t = this._find(t)) && t.forEach(function(t) {
                n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
        }, f._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0;
        }, f._manageStamps = function() {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
        }, f._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            };
        }, f._manageStamp = d, f._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t);
            return {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            };
        }, f.handleEvent = n.handleEvent, f.bindResize = function() {
            t.addEventListener("resize", this), this.isResizeBound = !0;
        }, f.unbindResize = function() {
            t.removeEventListener("resize", this), this.isResizeBound = !1;
        }, f.onresize = function() {
            this.resize();
        }, n.debounceMethod(r, "onresize", 100), f.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
        }, f.needsResizeLayout = function() {
            var t = i(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth;
        }, f.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e;
        }, f.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e));
        }, f.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), 
                this.reveal(e), this.layoutItems(i);
            }
        }, f.reveal = function(t) {
            if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function(t, i) {
                    t.stagger(i * e), t.reveal();
                });
            }
        }, f.hide = function(t) {
            if (this._emitCompleteOnItems("hide", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function(t, i) {
                    t.stagger(i * e), t.hide();
                });
            }
        }, f.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e);
        }, f.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e);
        }, f.getItem = function(t) {
            for (var e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.element == t) return i;
            }
        }, f.getItems = function(t) {
            var e = [];
            return (t = n.makeArray(t)).forEach(function(t) {
                var i = this.getItem(t);
                i && e.push(i);
            }, this), e;
        }, f.remove = function(t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
                t.remove(), n.removeFrom(this.items, t);
            }, this);
        }, f.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
                t.destroy();
            }), this.unbindResize();
            var e = this.element.outlayerGUID;
            delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
        }, r.data = function(t) {
            var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
            return e && c[e];
        }, r.create = function(t, e) {
            var i = s(r);
            return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), 
            i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), 
            i;
        };
        var m = {
            ms: 1,
            s: 1e3
        };
        return r.Item = o, r;
    }), function(t, e) {
        "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
    }(window, function(t, e) {
        var i = t.create("masonry");
        return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
            this.measureColumns(), this.colYs = [];
            for (var t = 0; t < this.cols; t++) this.colYs.push(0);
            this.maxY = 0;
        }, i.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth;
            }
            var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n;
            r = Math[s && 1 > s ? "round" : "floor"](r), this.cols = Math.max(r, 1);
        }, i.prototype.getContainerWidth = function() {
            var i = this._getOption("fitWidth") ? this.element.parentNode : this.element, n = e(i);
            this.containerWidth = n && n.innerWidth;
        }, i.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth, n = Math[e && 1 > e ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = {
                x: this.columnWidth * s,
                y: r
            }, h = r + t.size.outerHeight, u = this.cols + 1 - o.length, d = 0; u > d; d++) this.colYs[s + d] = h;
            return a;
        }, i.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, o);
            }
            return e;
        }, i.prototype._manageStamp = function(t) {
            var i = e(t), n = this._getElementOffset(t), r = this._getOption("originLeft") ? n.left : n.right, s = r + i.outerWidth, a = Math.floor(r / this.columnWidth);
            a = Math.max(0, a);
            var h = Math.floor(s / this.columnWidth);
            h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
            for (var d = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
        }, i.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), 
            t;
        }, i.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
            return (this.cols - t) * this.columnWidth - this.gutter;
        }, i.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t != this.containerWidth;
        }, i;
    }), function($) {
        var windowW, $window = $(window), $body = $("body");
        window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
            window.setTimeout(callback, 1e3 / 60);
        };
        var slider = function() {
            var container = $(".offers-grid"), opt = {
                bp: 970,
                link: $(".slide-link, .slide-nav-link"),
                navItem: $(".slide-nav__item"),
                backLink: $(".reset-slider-btn"),
                slideNav: $(".slide-nav"),
                slide: $(".slide"),
                slider: $(".slider"),
                resetBtn: $(".reset-slider-btn"),
                arrows: $(".slide-arrow"),
                slideIndex: 0,
                currentSlide: "",
                run: !1,
                ready: !1,
                curve: [ .83, .23, .3, .81 ],
                sTime: 400,
                bTime: 800,
                animation: !1,
                masonryGrid: ""
            };
            window.opt = opt;
            var itemPartOne = $(".top-sentence, .care-guide-label, .reset-slider-btn");
            function toggleControls() {
                opt.run ? (opt.slideNav.velocity("transition.slideDownOut", {
                    visibility: "hidden",
                    display: null,
                    complete: function() {
                        opt.run = !1;
                    }
                }), windowW >= opt.bp ? (opt.arrows.removeClass("visible"), opt.navItem.removeClass("active"), 
                $("body").removeClass("detailed"), changeSlide(!0, 0)) : (changeSlide(!1), opt.resetBtn.removeClass("visible"), 
                itemPartOne.velocity("transition.slideDownOut", {
                    display: null,
                    complete: function() {
                        itemPartOne.removeClass("small").velocity("transition.slideUpIn"), $(".top-sentence").css("height", ""), 
                        container.css("z-index", ""), container.toggleClass("open"), changeSlide(!0, opt.slideIndex), 
                        opt.navItem.removeClass("active");
                    }
                }))) : (opt.run = !0, changeSlide(!1), windowW >= opt.bp ? (opt.slideNav.velocity("transition.slideUpIn", {
                    visibility: "visible",
                    display: null
                }), $("body").addClass("detailed"), changeSlide(!0), opt.arrows.addClass("visible")) : (itemPartOne.velocity("transition.slideUpOut", {
                    easing: opt.curve,
                    duration: opt.sTime,
                    stagger: 100,
                    display: null,
                    complete: function() {
                        opt.slideNav.velocity("transition.slideUpIn", {
                            visibility: "visible",
                            display: null
                        }), opt.resetBtn.addClass("visible"), itemPartOne.addClass("small").velocity("transition.slideUpIn", {
                            delay: opt.sTime
                        }), container.css("z-index", 3), container.toggleClass("open");
                    }
                }), $(".top-sentence").velocity({
                    height: 95
                }, {
                    delay: opt.sTime / 2,
                    complete: function() {
                        changeSlide(!0);
                    }
                })));
            }
            function changeSlide(toShow, index) {
                return opt.slideIndex == opt.slide.length - 1 && $("body").addClass("last-slide"), 
                opt.slideIndex != opt.slide.length - 1 && $("body").is(".last-slide") && $("body").removeClass("last-slide"), 
                void 0 !== index ? (windowW >= opt.bp || opt.slider.velocity({
                    height: opt.slide.eq(opt.slideIndex).height()
                }), opt.currentSlide.velocity("transition.slideLeftOut", {
                    duration: opt.sTime,
                    visibility: "hidden",
                    display: null
                }).removeClass("active"), opt.slide.eq(opt.slideIndex).addClass("active").velocity("transition.slideRightIn", {
                    duration: opt.bTime,
                    delay: opt.sTime / 2,
                    visibility: "visible",
                    display: null,
                    complete: function() {
                        animationComplete(), 0 === index && reset();
                    }
                }), opt.navItem.removeClass("active").eq(opt.slideIndex - 1).addClass("active"), 
                void (opt.currentSlide = opt.slide.eq(opt.slideIndex))) : toShow ? (opt.currentSlide = opt.slide.eq(opt.slideIndex), 
                windowW >= opt.bp ? (opt.masonryGrid.masonry("layout"), opt.currentSlide.addClass("active").velocity("transition.slideRightIn", {
                    display: "block",
                    visibility: "visible",
                    duration: opt.bTime,
                    complete: function() {
                        animationComplete();
                    }
                }), void opt.navItem.eq(opt.slideIndex - 1).addClass("active")) : (opt.currentSlide.addClass("active").velocity("transition.slideRightIn", {
                    duration: opt.bTime,
                    visibility: "visible",
                    complete: function() {
                        animationComplete();
                    }
                }), void opt.navItem.eq(opt.slideIndex - 1).addClass("active"))) : windowW >= opt.bp ? void opt.currentSlide.velocity("transition.slideLeftOut", {
                    duration: opt.sTime,
                    visibility: "hidden",
                    display: null,
                    complete: function() {
                        animationComplete();
                    }
                }).removeClass("active") : (opt.slider.velocity({
                    height: opt.slide.eq(opt.slideIndex).height()
                }), void opt.currentSlide.velocity("transition.slideLeftOut", {
                    duration: opt.sTime,
                    display: null,
                    visibility: "hidden",
                    complete: function() {
                        animationComplete();
                    }
                }).removeClass("active"));
            }
            function animationComplete() {
                opt.animation = !1, setTimeout(function() {
                    opt.animation = !1;
                }, 62);
            }
            function enable() {
                opt.ready || ($(".start-over-link").on("click", function() {
                    event.preventDefault(), opt.animation || 0 === opt.slideIndex || (opt.animation = !0, 
                    opt.slideIndex = 0, toggleControls());
                }), opt.link.on("click", function(e) {
                    if (e.preventDefault(), $(this).parent(".slide-nav__item").hasClass("active")) return !0;
                    if (!opt.animation) {
                        if (opt.animation = !0, $(e.target).closest(".slider-closer").length) return void ($("body").is(".last-slide") && (opt.slideIndex = 0, 
                        toggleControls()));
                        if ($(this).is(".slide-nav-link")) {
                            if ($(this).closest(".active").length) return;
                            opt.slideIndex = $(this).parent().index() + 1, changeSlide(!0, opt.slideIndex);
                        } else {
                            if ($(this).closest(".care-guide-label").length) return opt.slideIndex = opt.slide.length - 1, 
                            void (opt.run ? changeSlide(!0, opt.slideIndex) : toggleControls());
                            opt.slideIndex = $(this).closest(".offers-list__item").index() + 1, toggleControls();
                        }
                    }
                }), opt.arrows.on("click", function() {
                    if (event.preventDefault(), !opt.animation) if (opt.animation = !0, $(this).is(".prev")) {
                        if (opt.slideIndex--, opt.slideIndex <= 0) return void toggleControls();
                        changeSlide(!0, opt.slideIndex);
                    } else {
                        if (opt.slideIndex == opt.slide.length - 1) return opt.animation = !0, opt.slideIndex = 0, 
                        void toggleControls();
                        opt.slideIndex++, changeSlide(!0, opt.slideIndex);
                    }
                }), opt.ready = !0);
            }
            function resize() {
                reset();
            }
            function reset() {
                windowW >= opt.bp && ($(".top-sentence, .reset-slider-btn").removeClass("small").removeAttr("style"), 
                opt.resetBtn.removeClass("visible"), opt.slider.removeAttr("style"), opt.run && !opt.arrows.is(".visible") && opt.arrows.addClass("visible"), 
                opt.run || (opt.slideNav.removeAttr("style"), opt.navItem.removeClass("active"), 
                $(".top-sentence").removeAttr("style"), container.removeAttr("style"), $body.removeClass("detailed ")), 
                animationComplete()), windowW < opt.bp && (opt.arrows.removeClass("visible"), opt.animation || opt.run && (opt.slideNav.css({
                    visility: "visible",
                    opacity: 1
                }), $("body").addClass("detailed"), $(".top-sentence").css({
                    height: 95
                }), opt.resetBtn.addClass("visible"), itemPartOne.addClass("small").css({
                    visility: "visible",
                    opacity: 1
                }), container.css("z-index", 3), opt.slider.css({
                    height: opt.slide.eq(opt.slideIndex).height()
                }))), $body.is(".last-slide") && opt.slideIndex != opt.slide.length - 1 && $body.removeClass("last-slide"), 
                opt.currentSlide = opt.slide.eq(opt.slideIndex);
            }
            return {
                init: function() {
                    container.length && (opt.currentSlide = opt.slide.eq(opt.slideIndex), enable(), 
                    $(window).on("resize", function() {
                        resize();
                    }), opt.masonryGrid = $(".guid-grid"), function() {
                        var container = $(".guid-grid"), reordered = !1;
                        if ($window.on("resize", function() {
                            windowW < opt.bp ? mobileOrder(container) : windowW >= opt.bp && desktopOrder(container);
                        }), container.length) {
                            if (windowW < opt.bp) return reordered = !0, void mobileOrder(container);
                            windowW >= opt.bp && desktopOrder(container);
                        }
                        function mobileOrder(container) {
                            reordered && (console.log(" order"), container.each(function(e) {
                                $(this).find("[data-m-order]").sort(function(a, b) {
                                    return +a.dataset.mOrder - +b.dataset.mOrder;
                                }).appendTo($(this));
                            }), reordered = !1, opt.masonryGrid.masonry("reloadItems"));
                        }
                        function desktopOrder(container) {
                            reordered || (console.log("d order"), container.each(function(e) {
                                $(this).find("[data-d-order]").sort(function(a, b) {
                                    return +a.dataset.dOrder - +b.dataset.dOrder;
                                }).appendTo($(this));
                            }), opt.masonryGrid.masonry("reloadItems"), reordered = !0);
                        }
                    }(), opt.masonryGrid.masonry({
                        itemSelector: ".guid-grid__el",
                        columnWidth: ".grid-sizer",
                        percentPosition: !0,
                        isAnimated: !0
                    }));
                },
                resize: resize,
                enable: enable
            };
        }();
        windowW = window.innerWidth, $("body").addClass("loaded"), $(window).on("resize", function() {
            windowW = window.innerWidth;
        }), slider.init();
    }(jQuery);
}

if ($(".care-guide-label").on("click", function() {
    console.log("click"), $("html, body").animate({
        scrollTop: $(".care-guide").offset().top
    }, 500);
}), $(".list-learn-more__inner a").on("click", function() {
    if ($(this).parents(".offers-list__item").addClass("open"), $(window).width() <= 970) {
        var height = $(this).parents(".offers-list__item").find(".offers-list__description-mobile__inner").height();
        $(this).parents(".offers-list__item").find(".offers-list__description-mobile").height(height);
    }
}), $(".offers-list__description__close, .offers-list__description-mobile__inner span").on("click", function() {
    $(this).parents(".offers-list__item").removeClass("open"), console.log("click"), 
    $(window).width() <= 970 && $(this).parents(".offers-list__item").find(".offers-list__description-mobile").height(0);
}), $(".dg-grid-item-info-alt a.show-info").on("click", function() {
    $(this).parents(".dg-grid-item-info-alt").removeClass("close"), $(this).parents(".dg-grid-item-info-alt").addClass("open");
}), $(".dg-grid-item-info-alt a.hide-info").on("click", function() {
    $(this).parents(".dg-grid-item-info-alt").removeClass("open"), $(this).parents(".dg-grid-item-info-alt").addClass("close");
}), $(window).on("resize", function() {
    $(window).width() <= 970 && $(".offers-list__item").each(function() {
        $(this).index(), $(this).find(".offers-list__item__inner").each(function() {
            $(this).height(function() {
                return $(this).index(), $(".offers-list__item__inner").width() + 130;
            });
        });
    });
}).trigger("resize"), window.jQuery(".favorites #items-grid").length && function($, Handlebars, TEMPLATE_DIR, SocialShare, HashUrl) {
    $.ajax({
        url: TEMPLATE_DIR + "/assets/xml/fall-favorites.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {
            var i = 0, container_row = $('<div class="row">').appendTo("#items-grid"), row = $('<div class="mobile-row">').appendTo(container_row);
            window.clothing_items = {}, window.outfit_items = {}, window.xml = xml, $(xml).find("favorites").children("item").each(function() {
                var outfits = [];
                $(this).children("outfits").children("outfit").each(function() {
                    var items = [];
                    $(this).children("items").children("item").each(function() {
                        var item_obj = {
                            x: $(this).children("x").text(),
                            y: $(this).children("y").text(),
                            z: $(this).children("z").text()
                        }, item = {};
                        item[$(this).children("id").text()] = item_obj, items.push(item);
                    });
                    var outfit = {
                        image: $(this).children("image").text(),
                        items: items
                    };
                    outfits.push(outfit);
                });
                var position = $(this).children("position"), obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text(),
                    image: $(this).children("image").text(),
                    position: {
                        image: $(position).children("image").text(),
                        x: $(position).children("x").text(),
                        y: $(position).children("y").text()
                    },
                    outfits: outfits
                };
                window.clothing_items[$(this).children("id").text()] = obj, (i + 1) % 4 == 0 && (container_row = $('<div class="row">').appendTo("#items-grid")), 
                i % 2 == 0 && 0 !== i && (row = $('<div class="mobile-row">').appendTo(container_row)), 
                $('<div class="clothing-item" data-item-id="' + obj.id + '"><h2 class="clothing-item__title">' + obj.name + '</h2><div><img src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/favorites/' + obj.image + '" /></div></div>').appendTo(row), 
                i++;
            }), $(xml).find("outfit_items").children("item").each(function() {
                var obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text(),
                    image: $(this).children("image").text()
                };
                window.outfit_items[$(this).children("id").text()] = obj;
            });
        }
    });
    var source = $("#item-template").html(), template = Handlebars.compile(source);
    function viewFavoriteByHash(e) {
        if (0 !== HashUrl.get().length) {
            var parsedHash = parseHash(), $item = $(".clothing-item[data-item-id=" + parsedHash.item + "]");
            ga("send", "event", "New Looks", "click", "item-" + parsedHash.item), $item.addClass("active"), 
            window.window_manager.open_item_details($item), window.angular.isDefined(parsedHash.outfit) && (details_manager.change_to(parsedHash.outfit - 1), 
            setHash(null, parsedHash.outfit));
        }
    }
    function parseHash() {
        var parts = HashUrl.get().split("-");
        return {
            item: parts[1],
            outfit: parts[3]
        };
    }
    function setHash(item_id, outfit_idx) {
        var parsedHash = parseHash();
        null === item_id && (item_id = parsedHash.item), HashUrl.update("item-" + item_id + "-outfit-" + outfit_idx);
    }
    $("body").on("click", ".clothing-item", function() {
        $(this).attr("data-item-id"), setHash($(this).attr("data-item-id"), 1), viewFavoriteByHash();
    }).on("click", ".clothing-details .icon", function() {
        $(this).hasClass("icon-close") ? window.window_manager.close_item_details() : $(this).hasClass("icon-arrowright") ? details_manager.next_item() : $(this).hasClass("icon-arrowleft") && details_manager.previous_item();
    }).on("click", ".favorites__shop-this-look-button", function() {
        var $elm = $(this), Quicklook = window.angular.element(document.body).injector().get("quicklookService"), BrowseLookModal = window.angular.element(document.body).injector().get("BrowseLookModal");
        Quicklook.getQuicklooks($elm.attr("browse-look")).then(function(response) {
            BrowseLookModal.activate({
                products: response.data,
                outfitId: !1
            });
        }), ga("send", "event", "New Looks", "select", "item-" + $(this).parents(".clothing-details").attr("data-item-id"));
    }).on("click", ".clothing-details .social-email a", function() {
        window.angular.element(document.body).injector().get("EmailShareModal").activate({
            type: "favorites",
            data: {
                image: $("#outfit-thumbs .active img").attr("src")
            }
        });
    }).on("click", ".clothing-details #outfit-thumbs div", function() {
        details_manager.change_to($(this).index("#outfit-thumbs div"));
    }).on("mouseenter", ".links ul.active li", function() {
        $(".outfit.active img").eq($(this).index(".links ul.active li")).addClass("current"), 
        $(".outfit-container").addClass("fade");
    }).on("mouseleave", ".links ul.active li", function() {
        $(".outfit.active img.current").removeClass("current"), $(".outfit-container.fade").removeClass("fade");
    }), $(document).keyup(function(e) {
        27 === e.keyCode && window.window_manager.close_item_details();
    }), $(window).on("load", function() {
        viewFavoriteByHash();
    }), window.Handlebars.registerHelper("cdn", function(object) {
        return "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/favorites/" + object;
    }), Handlebars.registerHelper("item_image", function() {
        var key = parseInt(window._.keys(this)[0]), item = window.outfit_items[key], position = this[key];
        return "data-rotate=" + (Math.floor(17 * Math.random()) - 8).toString() + " data-item=" + key + " src=https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/favorites/" + item.image + " style=left:" + position.x + "%;top:" + position.y + "%;z-index:" + position.z + ";";
    }), Handlebars.registerHelper("outfit_item", function() {
        return "src=https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/favorites/" + this.position.image + " style=left:" + this.position.x + "%;top:" + this.position.y + "%;";
    }), Handlebars.registerHelper("item_link", function() {
        var key = parseInt(window._.keys(this)[0]);
        return window.outfit_items[key].link;
    }), Handlebars.registerHelper("item_name", function() {
        var key = parseInt(window._.keys(this)[0]);
        return window.outfit_items[key].name;
    }), Handlebars.registerHelper("outfit_item_ids", function() {
        var outfit_item_ids = [], outfit_idx = $(".favorites__outfit-thumbs").find("div.active").index();
        -1 === outfit_idx && (outfit_idx = 0);
        for (var i = 0; i < this.outfits[outfit_idx].items.length; i++) outfit_item_ids.push("33" + Object.keys(this.outfits[outfit_idx].items[i])[0]);
        return outfit_item_ids.join(",");
    });
    var details_manager = {
        init: function() {
            $(".outfit-container").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    "right" === direction ? details_manager.previous_item() : "left" === direction ? details_manager.next_item() : "up" === direction ? $("html,body").animate({
                        scrollTop: $(window).scrollTop() + 300
                    }, "fast") : "down" === direction && $("html,body").animate({
                        scrollTop: $(window).scrollTop() - 300
                    }, "fast");
                }
            }), this.current_item = 0;
        },
        change_to: function(number) {
            $(".outfit img.current").removeClass("current"), $(".outfit-container.fade").removeClass("fade");
            var $details = $(".clothing-details");
            $(".out", $details).removeClass("out"), $(".links ul.active, #outfit-thumbs div.active", $details).removeClass("active"), 
            $(".outfit-container div.outfit.active").addClass("out").removeClass("active"), 
            $(".links ul", $details).eq(number).addClass("active"), $(".outfit-container div.outfit", $details).eq(number).addClass("active"), 
            $("#outfit-thumbs div", $details).eq(number).addClass("active"), this.current_item = number, 
            setHash(null, number + 1);
            var outfit_item_ids, hash = HashUrl.get();
            hash.match(/^\//) && (hash = hash.substr(1)), ga("send", "event", "New Looks", "next", hash), 
            setTimeout(function() {
                updateSocialShareConfigs();
            }, 500), outfit_item_ids = [], $(".outfit-container").find("div.active img").each(function(i, img) {
                outfit_item_ids.push("33" + parseInt(($(img).attr("data-item") + "").substring(0, 4)));
            }), $(".favorites__shop-this-look-button").attr("browse-look", outfit_item_ids.join(","));
        },
        next_item: function() {
            this.total_items = $(".clothing-details #outfit-thumbs div").length - 1;
            var change_to = this.current_item + 1 > this.total_items ? 0 : this.current_item + 1;
            this.change_to(change_to);
        },
        previous_item: function() {
            this.total_items = $(".clothing-details #outfit-thumbs div").length - 1;
            var change_to = 0 === this.current_item ? this.total_items : this.current_item - 1;
            this.change_to(change_to);
        }
    };
    function updateSocialShareConfigs() {
        SocialShare.update({
            facebook_id: ".clothing-details .social-facebook a",
            twitter_id: ".clothing-details .social-twitter a",
            pinterest_id: ".clothing-details .social-pinterest a",
            image: $(".favorites__outfit-thumbs .active img").attr("src"),
            description: "Check out five unique ways to mix and match the " + $(".favorites__details__title").text() + " with other cabi items!",
            title: "Check out five unique ways to mix and match the " + $(".favorites__details__title").text() + " with other cabi items!",
            permalink: window.location.href
        });
    }
    window.window_manager = {
        open_item_details: function(item) {
            if (this.current_item !== item.attr("data-item-id")) {
                this.close_item_details();
                var $details = $(template(window.clothing_items[item.attr("data-item-id")])).insertAfter(item.parents(window.window_size.get_container()));
                $("body").queue(function() {
                    $details.slideDown(function() {
                        $("body").dequeue();
                    }), $("body").animate({
                        scrollTop: $details.offset().top
                    }), $(".outfit-container div.outfit", $details).eq(0).addClass("active"), $("#outfit-thumbs div", $details).eq(0).addClass("active"), 
                    $(".links ul", $details).eq(0).show().addClass("active");
                }), this.current_item = item.attr("data-item-id"), details_manager.init();
            } else this.close_item_details();
            updateSocialShareConfigs();
        },
        close_item_details: function() {
            $(".clothing-details").length > 0 && (ga("send", "event", "New Looks", "close", "item-" + this.current_item), 
            $(".outfit-container").swipe("destroy"), $('.clothing-item[data-item-id="' + this.current_item + '"]').removeClass("active"), 
            $("body").queue(function() {
                $(".clothing-details").slideUp(function() {
                    $("body").dequeue();
                }).promise().done(function() {
                    window.window_manager.current_item === $(this).attr("data-item-id") && (window.window_manager.current_item = !1), 
                    $(this).remove();
                });
            }));
        },
        resize_details: function() {
            if (this.current_item) {
                var $details = $(".clothing-details");
                $details.detach().insertAfter($('.clothing-item[data-item-id="' + $details.attr("data-item-id") + '"]').parents(window.window_size.wrapper));
            }
        }
    }, $(window).smartresize(function(e) {
        window.window_size.check();
    }), $(window).on("size-change", function() {
        window.window_manager.resize_details();
    }), window.window_size = {
        wrapper: !1,
        check: function() {
            $(window).width() > 768 ? ".row" !== this.wrapper && (this.wrapper = ".row", $(window).trigger("size-change")) : ".mobile-row" !== this.wrapper && (this.wrapper = ".mobile-row", 
            $(window).trigger("size-change"));
        },
        get_container: function() {
            return this.wrapper;
        }
    }, window.window_size.check(), SocialShare.init();
}(window.jQuery, window.Handlebars, window.TEMPLATE_DIR, window.SocialShare, window.HashUrl), 
"fashionshow" == window.jQuery("body").attr("data-page-id") && function($) {
    $("html, body").css("height", "100%"), $("#page-fashionshow:not(.page-child)").vide({
        mp4: "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/fashion-show/fsb-s19-video-loop.mp4",
        ogv: "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/fashion-show/fsb-s19-video-loop.ogg"
    }, {
        volume: 1,
        playbackRate: 1,
        muted: !0,
        loop: !0,
        autoplay: !0,
        controls: !1,
        position: "50% 50%",
        posterType: "none",
        resizing: !0,
        playsinline: !0,
        bgColor: "transparent",
        className: "fashion-show-video-bg"
    }), $(".fashion-show-video-bg video").attr({
        controls: !1
    });
}(window.jQuery), "foundation" == window.jQuery("body").attr("data-page-id") && function($, Modal, Waypoints, Slick) {
    $("a[data-foundation-video]").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-foundation-video"), Modal.playVideo();
    }), $("a[data-petroniere-video]").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-petroniere-video"), Modal.playVideo();
    }), $(".expanding-btn__js").on("click", function() {
        var btn = $(this);
        return btn.hasClass("open") ? (btn.removeClass("open"), $(this).closest(".section-cabi").removeClass("open"), 
        $(this).siblings(".section-cabi__body").slideUp(400)) : (btn.addClass("open"), $(this).closest(".section-cabi").addClass("open"), 
        $(this).siblings(".section-cabi__body").slideDown(500)), !1;
    });
    var flag = !0;
    function addAnimate() {
        $(".how-it-works").addClass("active");
    }
    $(".how-it-works").length && ($(".how-it-works").addClass("active"), setInterval(function() {
        $(".how-it-works").removeClass("active"), setTimeout(addAnimate, 1e3);
    }, 7e3)), $(".mobile-show__label").length && $(".mobile-show__label").on("click", function() {
        return $(this).hasClass("open") ? ($(this).removeClass("open"), $(this).find(".label").fadeOut(200)) : ($(this).addClass("open"), 
        $(this).find(".label").fadeIn(200)), !1;
    }), $(".section-map").waypoint(function(direction) {
        "down" === direction && !0 === flag && ($(".section-map .animate-desktop .animated").addClass("fadeIn"), 
        $(".section-map .animate-desktop .feedline").animate({
            width: "240px"
        }, 2e3, function() {
            $(this).delay(1e3).animate({
                width: "408px"
            }, 1500);
        }), flag = !1);
    }, {
        offset: "70%"
    }), $(".foundation__gallery-slider--js").slick({
        arrows: !1,
        centerMode: !0,
        slidesToShow: 1,
        speed: 600,
        asNavFor: ".foundation__text-slider--js",
        autoplay: !0,
        variableWidth: !0,
        centerPadding: "0px",
        responsive: [ {
            breakpoint: 768,
            settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "40px",
                slidesToShow: 1,
                autoplay: !0,
                variableWidth: !0
            }
        } ]
    }), $(".foundation__text-slider--js").slick({
        arrows: !0,
        slidesToShow: 1,
        speed: 600,
        asNavFor: ".foundation__gallery-slider--js"
    });
}(window.jQuery, window.Modal, window.Waypoints, window.Slick), window.jQuery("body").hasClass("home") && function($, Breakpoints, Modal, Modernizr, HashUrl) {
    !function(HashUrl) {
        switch (HashUrl.get()) {
          case "cabi-career-opportunity":
            location.href = "/career-in-fashion/#autoplay";
            break;

          case "cabi-fashion-experience":
            location.href = "/shows/#autoplay";
            break;

          case "sneak-peek-fall2016":
            location.href = "/video/fall-2016-sneak-peek/";
        }
    }(window.HashUrl), $(".scrollingDiv").theiaStickySidebar({
        additionalMarginTop: 62
    }), $(document).on("consultantInfo", function(e) {
        $("#stylist-name").text(window.CABI_STYLIST_INFO.FirstName + " " + window.CABI_STYLIST_INFO.LastName);
    }), $(window).width() <= Breakpoints.Screen_Tablet_Large && $(".home__page > *").dblclick(function(e) {
        e.preventDefault();
    }), $("a[data-career-video]").on("click", function(e) {
        e.preventDefault(), Modal.close(), Modal.open("#data-career-video");
    }), $("a[data-coastal-cafe-video]").on("click", function(e) {
        e.preventDefault(), Modal.close(), Modal.open("#data-coastal-cafe-video");
    });
}(window.jQuery, window.Breakpoints, window.Modal, window.Modernizr), $(document).ready(function() {
    $(".styles__items").slick({
        infinite: !0,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: !1,
        autoplaySpeed: 2e3,
        swipeToSlide: !0,
        arrows: !0,
        pauseOnHover: !0,
        responsive: [ {
            breakpoint: 9999,
            settings: "unslick"
        }, {
            breakpoint: 1080,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        } ]
    }), $(".category-bar__items").slick({
        infinite: !0,
        speed: 1e3,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: !0,
        autoplaySpeed: 3500,
        arrows: !1,
        pauseOnHover: !0,
        responsive: [ {
            breakpoint: 1080,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplaySpeed: 3500
            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplaySpeed: 3e3
            }
        }, {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: !0,
                autoplaySpeed: 2500,
                centerPadding: "50px"
            }
        } ]
    }), $(window).on("resize orientationchange", function() {
        $(".styles__items").slick("resize"), $(".category-bar__items").slick("resize");
    }), $(".home__seo-dtn-down__copy").hide(), $(".seo-up").hide(), $(".home__seo-header, .home__seo-btn-down").click(function() {
        $(".seo-down").toggle(), $(".seo-up").toggle(), $(".home__seo-dtn-down__copy").slideToggle(500);
    });
}), "clothing-collection-seasonal-campaign" == window.jQuery("body").attr("data-page-id")) {
    !function($) {
        var settings, $grid, methods = {
            init: function(options) {
                settings = $.extend({
                    number_of_columns: 4,
                    tile_height_per_increment: 230,
                    tile_width_per_increment: 350,
                    tile_border: 3,
                    onInitialized: null,
                    onFinished: null
                }, options), methods.refreshGrid(), settings.onFinished && settings.onFinished($grid);
            },
            refreshGrid: function() {
                settings.tile_border = 7;
                var TILE_RATIO = settings.tile_height_per_increment / settings.tile_width_per_increment, TILE_WIDTH_MULTIPLIER = $grid.width() / settings.number_of_columns, TILE_HEIGHT_MULTIPLIER = TILE_WIDTH_MULTIPLIER * TILE_RATIO;
                return $(".tile").each(function() {
                    css = {
                        top: $(this).data("row") * TILE_HEIGHT_MULTIPLIER,
                        left: $(this).data("col") * TILE_WIDTH_MULTIPLIER
                    }, maskCSS = {
                        width: TILE_WIDTH_MULTIPLIER * $(this).data("width"),
                        height: TILE_HEIGHT_MULTIPLIER * $(this).data("height")
                    }, settings.tile_border && (css["margin-top"] = css["margin-right"] = css["margin-bottom"] = css["margin-left"] = settings.tile_border, 
                    maskCSS.width = maskCSS.width - 2 * settings.tile_border, maskCSS.height = maskCSS.height - 2 * settings.tile_border), 
                    $(this).css(css), $(this).find(".tile__mask").css(maskCSS);
                }), $grid.css({
                    height: ($(".tile:last").data("row") + $(".tile:last").data("height")) * TILE_HEIGHT_MULTIPLIER
                }), settings.onInitialized && settings.onInitialized($grid), $grid;
            },
            settings: function() {
                return settings;
            }
        };
        $.fn.cabiGrid = function(method) {
            return $grid = this, $(window).bind("resize", function() {
                methods.refreshGrid(), $(window).width() > 1e3 && ($(".gallery__grid-tile__container--for-mobile").removeAttr("style"), 
                $(".tile__mask").removeClass("gallery__grid-tile--faded"));
            }), methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.cabiGrid") : methods.init.apply(this, arguments);
        };
    }(jQuery), $(".gallery__grid-container").cabiGrid({
        number_of_columns: 16,
        tile_height_per_increment: 55,
        tile_width_per_increment: 45,
        onInitialized: function($grid) {
            $(".gallery__grid-tile").on("mouseleave", function() {
                $(this).find(".isOut").find(".gallery__grid-tile__icon").trigger("click");
            });
        },
        onFinished: function() {}
    });
    var tileFadeToggle = function(selected) {
        $(".tile__mask").not(selected).each(function() {
            $(this).toggleClass("gallery__grid-tile--faded");
        });
    }, resetAllTiles = function(popup) {
        $(".gallery__grid-tile").each(function() {
            $(this).removeClass("active"), $(this).removeClass("in-active");
        }), $(".tile__mask").each(function() {
            $(this).removeClass("gallery__grid-tile--faded"), $(this).removeClass("active");
        }), $(".gallery__grid-tile__container--for-mobile").each(function() {
            $(this).fadeOut();
        });
    };
    $(".gallery__grid-tile__icon--left.only-desktop").on("click", function() {
        $(this).parents(".gallery__grid-tile__info").toggleClass("isOut");
    }), $(".gallery__grid-tile__icon--right.only-desktop").on("click", function() {
        $(this).parents(".gallery__grid-tile__share").toggleClass("isOut");
    }), $(".tile__mask").on("click", function(e) {
        if ($(window).width() < 1e3) {
            if ($(this).hasClass("active")) return void e.preventDefault();
            resetAllTiles(), $("body").animate({
                scrollTop: $(this).offset().top - 55
            }, 1e3);
            var popup = $(this).siblings(".gallery__grid-tile__container--for-mobile");
            popUpCSS = {
                width: $(".gallery__grid-container").width() - 14
            }, $(this).parents(".tile").data("col") > 0 && (popUpCSS.left = $(this).width() - popUpCSS.width), 
            $(".gallery__grid-tile").addClass("in-active"), $(this).parent(".gallery__grid-tile").removeClass("in-active"), 
            $(this).parent(".gallery__grid-tile").addClass("active"), $(this).addClass("active"), 
            tileFadeToggle($(this)), popup.css(popUpCSS), popup.fadeToggle();
        }
    }), $(".gallery__grid-tile__detail-close").on("click", function(e) {
        e.preventDefault(), resetAllTiles();
    });
}

"page-give-now" == window.jQuery("#page").attr("data-page-id") && window.jQuery, 
"page-host" == window.jQuery("#page").attr("data-page-id") && function($) {
    $(".expanding-btn__js").on("click", function() {
        var btn = $(this);
        return btn.hasClass("open") ? (btn.removeClass("open"), $(".expanding-box__js").slideUp(400)) : (btn.addClass("open"), 
        $(".expanding-box__js").slideDown(500)), !1;
    }), $(".close__js").on("click", function() {
        return $(".expanding-btn__js").removeClass("open"), $(".expanding-box__js").slideUp(400), 
        !1;
    }), $(".accordion .host__panel-heading").on("click", function() {
        return $(this).hasClass("open") ? ($(this).removeClass("open"), $(this).siblings(".host__panel-body").slideUp(300), 
        $(this).find(".more-text").html("+")) : ($(this).addClass("open"), $(this).siblings(".host__panel-body").slideDown(300), 
        $(this).find(".more-text").html("-")), !1;
    }), $(".host__box-btn").on("click", function() {
        $(".host__box-two").slideDown(1e3), $(this).fadeOut();
    }), $(window).on("load", function() {
        if ("autoplay" == HashUrl.get()) {
            Modal.open();
            var $iframe = $("#modal iframe:first");
            $iframe.attr("src", $iframe.attr("src").replace("autoplay=0", "autoplay=1"));
        }
        $("cabi-select-list").length && ($("cabi-select-list:first-of-type").scope().$ctrl.data.qualifier = "InterestInHostingShow", 
        $("cabi-select-list:first-of-type").scope().$digest());
    }), $("body").on("close.modal", function(e) {
        var $iframe = $("[data-modal-content] iframe:first");
        $iframe.attr("src", $iframe.attr("src").replace("autoplay=1", "autoplay=0"));
    }), CABI_CONSULTANT_IS_MICROSITE || $(".connect-btn, .description-link").click(function() {
        $("html, body").animate({
            scrollTop: $("#connect").offset().top - 82
        }, 750);
    }), $(document).on("ready", function() {
        $(".testimonials__slider__quotes").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: !0,
            autoplaySpeed: 6e3,
            arrows: !1,
            dots: !0,
            appendDots: ".testimonials__slider__dots"
        }), $(".faq-more").click(function() {
            $(".box.host__box-two").toggleClass("show-box-two"), $(".faq-more .show-more").toggleClass("show-context"), 
            $(".faq-more .show-less").toggleClass("show-context");
        });
    });
}(window.jQuery), "page-join-us" == window.jQuery("#page").attr("data-page-id") && ($(window).outerWidth() <= 768 && $(".block-events__item_bg").height($(".block-events__item_bg").width() - 100), 
function($) {
    $(".expanding-btn__js").on("click", function() {
        var btn = $(this);
        return btn.hasClass("open") ? (btn.removeClass("open"), btn.prev().slideUp(400), 
        btn.parent(".career-income__item").removeClass("open")) : (btn.addClass("open"), 
        btn.prev().slideDown(500), btn.parent(".career-income__item").addClass("open")), 
        !1;
    }), $("#get-started-btn").click(function() {
        $([ document.documentElement, document.body ]).animate({
            scrollTop: $("#lead-form").offset().top
        }, 600);
    }), $("#goto-stylist-opportunity").click(function() {
        $([ document.documentElement, document.body ]).animate({
            scrollTop: $("#stylist-opportunity").offset().top
        }, 600);
    }), $("#goto-how-cabi-supports-you").click(function() {
        $([ document.documentElement, document.body ]).animate({
            scrollTop: $("#how-cabi-supports-you").offset().top
        }, 600);
    }), $("#goto-our-stories").click(function() {
        $([ document.documentElement, document.body ]).animate({
            scrollTop: $("#our-stories").offset().top
        }, 600);
    }), $("#goto-career-events").click(function() {
        $([ document.documentElement, document.body ]).animate({
            scrollTop: $("#career-events").offset().top
        }, 600);
    }), $(".close__js").on("click", function() {
        return $(".expanding-btn__js").removeClass("open"), $(".expanding-box__js").slideUp(400), 
        !1;
    });
    $(document).ready(function() {
        $(".fade-in-on-scroll").each(function(i) {
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            $(window).scrollTop() + $(window).height() > bottom_of_object && $(this).animate({
                opacity: "1"
            }, 1500);
        }), $(window).scroll(function() {
            $(".fade-in-on-scroll").each(function(i) {
                var bottom_of_object = $(this).position().top + $(this).outerHeight();
                $(window).scrollTop() + $(window).height() > bottom_of_object && $(this).animate({
                    opacity: "1"
                }, 1500);
            });
        });
    }), $(window).on("load", function() {
        $("cabi-select-list:first-of-type").scope().$ctrl.data.qualifier = "InterestInBecomingConsultant", 
        $("cabi-select-list:first-of-type").scope().$digest();
    }), $(window).on("resize load", function() {
        if (window.Breakpoints.Screen_Tablet > $(window).outerWidth()) {
            var maxHeight = $(".blockquote").map(function() {
                return $(this).height();
            }).sort()[$(".blockquote").length - 1];
            $(".blockquote").css("height", maxHeight);
        } else $(".blockquote").css("height", "");
        $(window).width() <= 768 && $(".block-events__item_bg").height($(".block-events__item_bg").width() - 100);
    });
}(window.jQuery), function($, Modal) {
    $("a[data-calculator]").on("click", function(e) {
        e.preventDefault(), Modal.open("#data-calculator"), ga("send", "event", "Content Interaction", "click", "View", "Business Model: Calculator");
    });
}(window.jQuery, window.Modal)), "career-in-fashion" == window.jQuery("body").attr("data-page-id") && function($, Modal) {
    $(".cabi-slideshow").each(function() {
        $(this).find(".slide:first").addClass("active slideInRight");
    }), $(".slideshow-next").on("click", function(e) {
        e.preventDefault();
        var $slideshow = $(this).parents(".cabi-slideshow"), $current_slide = $slideshow.find(".active");
        ($current_slide.next(".slide").length ? $current_slide.next(".slide") : $slideshow.find(".slide:first")).removeClass("active slideOutLeft").addClass("active slideInRight"), 
        $current_slide.removeClass("active").addClass("slideOutLeft");
    });
    var mouse_over = !1;
    setInterval(function() {
        mouse_over || $(".slideshow-next").trigger("click");
    }, 1e4), $(".cabi-slideshow").on("mouseenter mouseleave", function(e) {
        mouse_over = "mouseenter" == e.type;
    });
    $(window).on("resize load", function() {
        if (window.Breakpoints.Screen_Tablet > $(window).outerWidth()) {
            var maxHeight = $(".blockquote").map(function() {
                return $(this).height();
            }).sort()[$(".blockquote").length - 1];
            $(".blockquote").css("height", maxHeight);
        } else $(".blockquote").css("height", "");
    });
}(window.jQuery, window.Modal), "love-carol" == window.jQuery("body").attr("data-page-id") && function($) {
    $(document).on("ready", function() {
        setHeaderHeights();
    }), $(window).on("resize", function() {
        setHeaderHeights(), $(".item").removeClass("open");
    }), $(".only-desktop a[data-state]").on("click", function(e) {
        e.preventDefault(), "off" == $(this).attr("data-state") ? openContainer($(this)) : closeContainer($(this));
    }), $(".only-mobile a[data-state]").on("click", function(e) {
        e.preventDefault(), "off" == $(this).attr("data-state") ? ($(this).attr("data-state", "on"), 
        $(this).parents("li").addClass("open")) : ($(this).attr("data-state", "off"), $(this).parents("li").removeClass("open"));
    });
    var openContainer = function(thisObj) {
        thisObj.attr("data-state", "on");
        var $item = $(thisObj).parents(".item");
        $item.animate({
            height: getHeaderFullHeightFor($item)
        }), $item.addClass("open");
    }, closeContainer = function(thisObj) {
        thisObj.attr("data-state", "off");
        var $item = $(thisObj).parents(".item");
        $item.animate({
            height: getHeaderPartialHeightFor($item)
        }, function() {
            $item.removeClass("open");
        });
    }, setHeaderHeights = function() {
        $("[data-height-ratio]").each(function() {
            $(this).css("height", getHeaderPartialHeightFor(this));
        });
    }, getHeaderPartialHeightFor = function(elm) {
        return $(elm).outerWidth() * $(elm).data("height-ratio");
    }, getHeaderFullHeightFor = function(elm) {
        return $(elm).outerWidth() * $(elm).data("full-ratio");
    };
}(window.jQuery), window.jQuery(".old-faves-made-new").length && (window.SocialShare.init(), 
function($, TEMPLATE_DIR, Handlebars, HashUrl) {
    $.ajax({
        url: TEMPLATE_DIR + "/assets/xml/old-faves-made-new.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {
            window.clothing_items = {}, window.outfit_items = {};
            var container = $("#items-grid"), i = 0;
            $(xml).find("favorites").children("item").each(function() {
                var casual = [], casualTitle = $(this).children("outfits").children("casual").attr("title"), casualImage = $(this).children("outfits").children("casual").attr("image");
                $(this).children("outfits").children("casual").each(function() {
                    $(this).children("item").each(function() {
                        var item_obj = {
                            id: $(this).children("id").text()
                        };
                        casual.push(item_obj);
                    });
                });
                var dressy = [], dressyTitle = $(this).children("outfits").children("dressy").attr("title"), dressyImage = $(this).children("outfits").children("dressy").attr("image");
                $(this).children("outfits").children("dressy").each(function() {
                    $(this).children("item").each(function() {
                        var item_obj = {
                            id: $(this).children("id").text()
                        };
                        dressy.push(item_obj);
                    });
                });
                var outfits = {
                    casual: casual,
                    casualTitle: casualTitle,
                    casualImage: casualImage,
                    dressy: dressy,
                    dressyTitle: dressyTitle,
                    dressyImage: dressyImage
                }, obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text(),
                    image: $(this).children("image").text(),
                    outfits: outfits
                }, key = obj.id, item = obj;
                window.clothing_items[$(this).children("id").text()] = obj, i % 2 == 0 ? $('<div class="clothing-item" data-item-id="' + key + '"><div class="old-faves-made-new__image--wrapper"><img class="old-faves-made-new__image" src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/' + item.image + '" /></div><h2 class="old-faves-made-new__item-name">' + item.name + "</h2></div>").appendTo(container) : $('<div class="clothing-item" data-item-id="' + key + '"><h2 class="old-faves-made-new__item-name">' + item.name + '</h2><div class="old-faves-made-new__image--wrapper"><img class="old-faves-made-new__image" src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/' + item.image + '" /></div></div>').appendTo(container), 
                i++;
            }), $(xml).find("outfit_items").children("item").each(function() {
                var obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text()
                };
                window.outfit_items[$(this).children("id").text()] = obj;
            }), $(".content-container").clone().insertAfter($(".clothing-item").eq(0)), window.window_size.check();
        }
    });
    var source = {
        mobile: $("#mobile-template").html(),
        desktop: $("#desktop-template").html()
    }, template = {
        mobile: Handlebars.compile(source.mobile),
        desktop: Handlebars.compile(source.desktop)
    };
    function clean(arr) {
        for (var i = 0; i < arr.length; i++) void 0 !== arr[i] && null !== arr[i] || (arr.splice(i, 1), 
        i--);
        return arr;
    }
    function updateSocialShareConfigs($outfit) {
        SocialShare.update({
            image: $outfit.find(".images img").attr("src"),
            description: "See how we’re mixing and matching our favorite fall pieces with the latest styles from our Fall Collection",
            title: "See how we’re mixing and matching our favorite fall pieces with the latest styles from our Fall Collection",
            permalink: window.location.href
        });
    }
    Handlebars.registerHelper("cdn", function(object) {
        return "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/" + object;
    }), Handlebars.registerHelper("outfit_helper", function(text, object) {
        var images, array = object.outfits[text], itemString = clean(object.outfits[text].map(function(obj) {
            if (object.id !== obj.id) return "33" + obj.id;
        })).join(",");
        images = '<img src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/outfits/' + object.outfits[text + "Image"] + '" />';
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.id !== object.id) {
                var details = window.outfit_items[item.id];
                '<li><a href="' + details.link + '">' + details.name + "</a></li>";
            }
        }
        return new Handlebars.SafeString('<div class="images">' + images + '</div><div class="old-faves-made-new__mobile-detail-browse-look"><div class="align-center"><a href="javascript://" class="btn btn-thin" browse-look="' + itemString + '">Shop This Look</a></div><div class="mobile-share-buttons align-center mb1em"><a href="#" class="btn-share" data-media="facebook"></a> <a href="#" class="btn-share" data-media="twitter"></a> <a href="#" class="btn-share" data-media="pinterest"></a> <a href="#" class="btn-share email"><i class=\'fa fa-envelope\'></i></a></div></div>');
    }), Handlebars.registerHelper("outfit_thumbnail_url", function(file) {
        return "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/outfits/" + file;
    }), Handlebars.registerHelper("desktop_outfit_helper", function(text, object) {
        var images, array = object.outfits[text], outfitTitle = object.outfits[text + "Title"], itemString = clean(object.outfits[text].map(function(obj) {
            if (object.id !== obj.id) return "33" + obj.id;
        })).join(",");
        void 0 === outfitTitle && (outfitTitle = ""), images = '<img src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-faves-made-new/outfits/' + object.outfits[text + "Image"] + '" />';
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.id !== object.id) {
                var details = window.outfit_items[item.id];
                '<li><a href="' + details.link + '">' + details.name + "</a></li>";
            }
        }
        return new Handlebars.SafeString('<div class="old-faves-made-new__outfit-detail__item outfit ' + text + '"><div class="images">' + images + "</div><h3>" + outfitTitle + "</h3><div class='align-center mb1em'><a class='btn btn-transparent' href='#' browse-look=\"" + itemString + '">Shop This Look</a></div><div class="share-buttons align-center"><a href="#" class="btn-share" data-media="facebook"></a> <a href="#" class="btn-share" data-media="twitter"></a> <a href="#" class="btn-share" data-media="pinterest"></a> <a href="#" class="btn-share email"><i class="fa fa-envelope"></i></a></div></div>');
    }), $("body").on("click", ".clothing-item", function() {
        $("html,body").animate({
            scrollTop: 0
        }, "fast"), window.window_manager.toggle_details($(this));
    }).on("click", ".old-faves-made-new__mobile-look-btn", function() {
        $(this).parent(".old-faves-made-new__mobile-look").hasClass("active") || window.window_manager.slide_details();
    }).on("click", ".btn-share.email", function(e) {
        e.preventDefault(), window.angular.element(document.body).injector().get("EmailShareModal").activate({
            type: "old-faves-made-new",
            data: {
                image: $(this).parents(".old-faves-made-new__outfit-detail__item").find(".images img").attr("src")
            }
        });
    }).on("click", ".js__mobile-navigation-arrow", function() {
        var $item = $(".old-faves-made-new__outfit-detail--mobile").prev(".clothing-item");
        $item = "next" === $(this).attr("rel") ? $item.nextAll(".clothing-item").length ? $item.nextAll(".clothing-item").first() : $(".clothing-item").first() : $item.prevAll(".clothing-item").length ? $item.prevAll(".clothing-item").first() : $(".clothing-item").last(), 
        window.window_manager.open_details($item), updateSocialShareConfigs($item);
    }).on("click", ".old-faves-made-new__close-mobile-link", function(e) {
        window.window_manager.close_details(), e.stopPropagation();
    }).on("click", '#clothing-details-desktop > a[data-purpose="close"]', function() {
        window_manager.close_details();
    }).on("click", "#clothing-details-desktop a i.icon", function() {
        var idx = $('.clothing-item[data-item-id="' + window.window_manager.current_details + '"]').index(".clothing-item"), length = $(".clothing-item").length;
        $(this).hasClass("icon-arrowleft") ? 0 === idx ? idx = length - 1 : idx-- : idx === length - 1 ? idx = 0 : idx++, 
        window.window_manager.switch_desktop($(".clothing-item").eq(idx).attr("data-item-id"));
    }), $(window).on("load", function() {
        var id = HashUrl.get().replace(/^\D+/g, "");
        if ("" !== id) {
            var obj = $(".clothing-item[data-item-id=" + parseInt(id) + "]");
            window.window_manager.toggle_details(obj), updateSocialShareConfigs(obj);
        }
    }), window.window_manager = {
        current_details: !1,
        toggle_details: function(obj) {
            var id = $(obj).attr("data-item-id");
            this.current_details ? this.current_details !== id ? "mobile" == window_size.size ? (this.close_details(), 
            this.open_details(obj)) : this.switch_desktop(id) : this.close_details() : this.open_details(obj);
        },
        open_details: function(obj) {
            var id = $(obj).attr("data-item-id"), data = window.clothing_items[id];
            HashUrl.update(id), $(".clothing-details-mobile").length && $(".clothing-details-mobile").addClass("old"), 
            $template = $(template[window_size.size](data)), "mobile" == window_size.size ? ($template.insertAfter($(obj)).fadeIn().promise().done(function() {
                $("body").animate({
                    scrollTop: $template.offset().top - $(".clothing-item").eq(0).height()
                }), $(".clothing-details-mobile.old").remove();
            }), $(".clothing-details-mobile").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    "right" == direction ? 0 !== parseInt($(".clothing-details-mobile .outfit-container").css("left")) && window_manager.slide_details() : "left" == direction && 0 === parseInt($(".clothing-details-mobile .outfit-container").css("left")) && window_manager.slide_details();
                }
            }), $(".insert-item-name").text(data.name)) : ($("#clothing-details-desktop h2, #clothing-details-desktop p span").text(data.name), 
            $("#clothing-details-desktop div").html($template), $("#clothing-details-desktop").addClass("visible").slideDown(), 
            $("body").animate({
                scrollTop: "0px"
            })), this.current_details = id;
        },
        close_details: function() {
            $(".clothing-details-mobile").swipe("destroy"), this.current_details = !1, $obj = $(".clothing-item.active"), 
            $(".clothing-details-mobile").length > 0 && $(".clothing-details-mobile").slideUp().promise().done(function() {
                $(this).remove();
            }), $("#clothing-details-desktop").removeClass("visible").slideUp().promise().done(function() {
                $("#clothing-details-desktop h2, #clothing-details p span, #clothing-details > div").html("");
            });
        },
        slide_details: function() {
            $obj = $(".clothing-details-mobile .outfit-container"), $obj.siblings(".old-faves-made-new__mobile-detail__nav-container").find(".old-faves-made-new__mobile-look").toggleClass("active"), 
            console.log("trigger"), "0px" == $obj.css("left") ? $obj.animate({
                left: "-100%"
            }) : $obj.animate({
                left: "0px"
            });
        },
        resize_details: function() {
            window_manager.close_details();
        },
        switch_desktop: function(id) {
            HashUrl.update(id);
            var details = clothing_items[id];
            window.switch_template = $(template[window_size.size](details)), $("#clothing-details-desktop h2, #clothing-details-desktop p").fadeOut(500).promise().done(function() {
                $("#clothing-details-desktop h2, #clothing-details-desktop p span").text(details.name), 
                $("#clothing-details-desktop h2, #clothing-details-desktop p").fadeIn(500);
            });
            for (var i = 0; i < 2; i++) $("#clothing-details-desktop > div .outfit").eq(i).addClass("hide"), 
            setTimeout(function(num) {
                $("#clothing-details-desktop > div .outfit").eq(num).html($(switch_template[2 * num]).html()).removeClass("hide");
            }, 500, i);
            this.current_details = id;
        }
    }, $(window).smartresize(function(e) {
        window_size.check();
    }), $(window).on("size-change", function() {
        window_manager.resize_details();
    }), $("body").on("mouseover", ".old-faves-made-new__outfit-detail__item", function(e) {
        var $this = $(e.target);
        $this.is(".old-faves-made-new__outfit-detail__item") || ($this = $(e.target).parents(".old-faves-made-new__outfit-detail__item")), 
        updateSocialShareConfigs($this);
    }), $(document).on("click", "a[browse-look]", function(e) {
        var $elm = $(e.target), Quicklook = window.angular.element(document.body).injector().get("quicklookService"), BrowseLookModal = window.angular.element(document.body).injector().get("BrowseLookModal");
        Quicklook.getQuicklooks($elm.attr("browse-look")).then(function(response) {
            BrowseLookModal.activate({
                products: response.data,
                outfitId: !1
            });
        });
    }), window.window_size = {
        size: !1,
        check: function() {
            $(window).width() > 767 ? "desktop" !== this.size && (this.size = "desktop", $(window).trigger("size-change")) : "mobile" !== this.size && (this.size = "mobile", 
            $(window).trigger("size-change"));
        }
    }, window_size.check();
}(jQuery, TEMPLATE_DIR, window.Handlebars, window.HashUrl)), "shopping-faqs" == window.jQuery("body").attr("data-page-id") && function($) {
    $(".SMT__sidebar__sticky-menu a").on("click", function(e) {
        e.preventDefault();
        var collapse_id = "#" + $(this).attr("data-section");
        $(".SMT__sidebar__sticky-menu li").removeClass("open"), $(this).parent("li").addClass("open"), 
        $(collapse_id + " .collapse-header").trigger("click"), $("body").animate({
            scrollTop: $(".collapse").eq(0).offset().top - 80 + 90 * $(collapse_id).index(".collapse")
        }, 1e3);
    }), $(".collapse-header").on("click", function() {
        var isOpen = $(this).parents(".collapse").hasClass("open");
        if ($(".collapse.open .collapse-body").slideUp("fast").promise().done(function() {
            $(this).parents(".collapse").removeClass("open");
        }), $(".SMT__sidebar__sticky-menu li").removeClass("open"), !isOpen) {
            var stickyLink = $(this).parents(".collapse").attr("id");
            $(this).parents(".collapse").attr("id");
            $(this).parents(".collapse").addClass("open"), $(".SMT__sidebar__sticky-menu a[data-section='" + stickyLink + "']").parent("li").addClass("open"), 
            $(this).next(".collapse-body").slideDown();
        }
    }), $(".SMT__share-tab-btn--js").on("click", function() {
        var panel = $(this).data("panel"), panel_list = $(this).parents(".SMT__share-header").siblings(".SMT__share-body").find(".SMT__share-panel");
        if ($(this).parent(".SMT__share-tab").hasClass("active")) return !1;
        $(".SMT__share-tab").removeClass("active"), panel_list.each(function(index, value) {
            $(this).slideUp(), $(this).data("id") == panel && $(this).slideToggle();
        }), $(this).parent(".SMT__share-tab").addClass("active");
    }), $(".SMT__share-panel-close--js").on("click", function() {
        $(this).parents(".SMT__share-panel").slideUp(), $(".SMT__share-tab").removeClass("active");
    });
}(window.jQuery), window.jQuery("body").hasClass("single-post") && function($, SocialShare) {
    window.SocialShare.init(), $(document).ready(function() {
        $("#blog-content a").attr("target", "_blank");
    });
}(window.jQuery), window.jQuery("body").hasClass("single-video") && function($, SocialShare, Breakpoints) {
    function set_playlist_height() {
        $("section#playlist ul").css("height", $("section#video").outerHeight() - $("section#playlist .h3").outerHeight()), 
        $(window).on("load", function() {
            $("#playlist ul").scrollTop($(".now-playing").position().top - $(".now-playing").prev().height() / 4);
        });
    }
    function get_video_url($li) {
        return $li.find("a").attr("href");
    }
    function get_next_video_url() {
        return get_video_url($(".now-playing", "section#playlist").next());
    }
    SocialShare.init(), $(window).bind("load", function() {
        set_playlist_height();
    }), $(window).on("resize", set_playlist_height), $("body").on("youtube", function(e, data) {
        "ended" == data.state && void 0 !== get_next_video_url() && (window.location = get_next_video_url());
    }), $("section#playlist li").on("click", "*", function() {
        var $li = $(this).parents("li");
        window.location = get_video_url($li);
    });
}(jQuery, window.SocialShare, window.Breakpoints), "social-media-toolkit" == window.jQuery("body").attr("data-page-id") && function($, Waypoint, Sticky) {
    var d, s, id, js, fjs;
    window.fbAsyncInit = function() {
        FB.init({
            appId: window.FB_APP_ID,
            status: !0,
            xfbml: !0
        });
    }, d = document, s = "script", id = "facebook-jssdk", fjs = d.getElementsByTagName(s)[0], 
    d.getElementById(id) || ((js = d.createElement(s)).id = id, js.src = "//connect.facebook.net/en_US/all.js", 
    fjs.parentNode.insertBefore(js, fjs)), $(".facebook-album-wrapper .facebook > a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Facebook Share", $(this).attr("href"));
    }), $(".facebook-album-wrapper .twitter > a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Twitter Share", $(this).attr("href"));
    }), $(".facebook-album-wrapper .pinterest > a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Pinterest Share", $(this).attr("href"));
    }), $(".facebook-album-wrapper .download > a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Image Download", $(this).attr("href"));
    }), $(".SMT__share-photo-link").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Image Download", $(this).attr("href"));
    }), $(".SMT__guide-item a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Guide Download", $(this).attr("href"));
    }), $(".webinar-link a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Webinar", $(this).attr("href"));
    }), $(".upload-tool-link a").on("click", function(e) {
        ga("send", "event", "Content Interaction", "click", "Social Media Toolkit: Personal Website Profile Picture Upload Tool", $(this).attr("href"));
    }), $(".scrollingDiv").theiaStickySidebar({
        additionalMarginTop: 62
    }), window.location.hash && $(window.location.hash + " .collapse-header").trigger("click"), 
    $(".SMT__sidebar__sticky-menu a").on("click", function(e) {
        e.preventDefault();
        var collapse_id = "#" + $(this).attr("data-section");
        $(".SMT__sidebar__sticky-menu li").removeClass("open"), $(this).parent("li").addClass("open"), 
        $(collapse_id + " .collapse-header").trigger("click"), $("body").animate({
            scrollTop: $(".collapse").eq(0).offset().top - 80 + 90 * $(collapse_id).index(".collapse")
        }, 1e3);
    }), $(".collapse-header").on("click", function() {
        console.log("here");
        var isOpen = $(this).parents(".collapse").hasClass("open");
        if ($(".collapse.open .collapse-body").slideUp("fast").promise().done(function() {
            $(this).parents(".collapse").removeClass("open");
        }), $(".SMT__sidebar__sticky-menu li").removeClass("open"), !isOpen) {
            var stickyLink = $(this).parents(".collapse").attr("id");
            $(this).parents(".collapse").attr("id");
            $(this).parents(".collapse").addClass("open"), $(".SMT__sidebar__sticky-menu a[data-section='" + stickyLink + "']").parent("li").addClass("open"), 
            $(this).next(".collapse-body").slideDown();
        }
    }), $(".SMT__share-tab-btn--js").on("click", function() {
        var panel = $(this).data("panel"), panel_list = $(this).parents(".SMT__share-header").siblings(".SMT__share-body").find(".SMT__share-panel");
        if ($(this).parent(".SMT__share-tab").hasClass("active")) return !1;
        $(".SMT__share-tab").removeClass("active"), panel_list.each(function(index, value) {
            $(this).slideUp(), $(this).data("id") == panel && $(this).slideToggle();
        }), $(this).parent(".SMT__share-tab").addClass("active");
    }), $(".SMT__share-panel-close--js").on("click", function() {
        $(this).parents(".SMT__share-panel").slideUp(), $(".SMT__share-tab").removeClass("active");
    }), $(document).on("ready", function() {
        $(".social-sharing__item.twitter").on("click", function(e) {
            e.preventDefault();
            var alt = $(this).parents(".share-photo").find("img").attr("alt"), img = $(this).parents(".share-photo").find("img").attr("src");
            window.open("https://twitter.com/intent/tweet?text=" + alt + " " + img, "", "height=279,width=575");
        });
    }), $(window).bind("load", function() {
        $("main").removeAttr("style");
    });
}(window.jQuery, window.Waypoint, window.Sticky), window.jQuery(".fall-spring").length && (window.SocialShare.init(), 
function($, TEMPLATE_DIR, Handlebars, HashUrl) {
    $.ajax({
        url: TEMPLATE_DIR + "/assets/xml/old-into-new.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {
            window.clothing_items = {}, window.outfit_items = {};
            var container = $("#items-grid"), i = 0;
            $(xml).find("favorites").children("item").each(function() {
                var casual = [], casualTitle = $(this).children("outfits").children("casual").attr("title"), casualImage = $(this).children("outfits").children("casual").attr("image");
                $(this).children("outfits").children("casual").each(function() {
                    $(this).children("item").each(function() {
                        var item_obj = {
                            id: $(this).children("id").text()
                        };
                        casual.push(item_obj);
                    });
                });
                var dressy = [], dressyTitle = $(this).children("outfits").children("dressy").attr("title"), dressyImage = $(this).children("outfits").children("dressy").attr("image");
                $(this).children("outfits").children("dressy").each(function() {
                    $(this).children("item").each(function() {
                        var item_obj = {
                            id: $(this).children("id").text()
                        };
                        dressy.push(item_obj);
                    });
                });
                var outfits = {
                    casual: casual,
                    casualTitle: casualTitle,
                    casualImage: casualImage,
                    dressy: dressy,
                    dressyTitle: dressyTitle,
                    dressyImage: dressyImage
                }, obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text(),
                    image: $(this).children("image").text(),
                    outfits: outfits
                }, key = obj.id, item = obj;
                window.clothing_items[$(this).children("id").text()] = obj, i % 2 == 0 ? $('<div class="clothing-item" data-item-id="' + key + '"><div class="fall-spring__image--wrapper"><img class="fall-spring__image" src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/' + item.image + '" /></div><h2 class="fall-spring__item-name">' + item.name + "</h2></div>").appendTo(container) : $('<div class="clothing-item" data-item-id="' + key + '"><h2 class="fall-spring__item-name">' + item.name + '</h2><div class="fall-spring__image--wrapper"><img class="fall-spring__image" src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/' + item.image + '" /></div></div>').appendTo(container), 
                i++;
            }), $(xml).find("outfit_items").children("item").each(function() {
                var obj = {
                    id: $(this).children("id").text(),
                    name: $(this).children("name").text(),
                    link: $(this).children("link").text()
                };
                window.outfit_items[$(this).children("id").text()] = obj;
            }), $(".content-container").clone().insertAfter($(".clothing-item").eq(0)), window.window_size.check();
        }
    });
    var source = {
        mobile: $("#mobile-template").html(),
        desktop: $("#desktop-template").html()
    }, template = {
        mobile: Handlebars.compile(source.mobile),
        desktop: Handlebars.compile(source.desktop)
    };
    function clean(arr) {
        for (var i = 0; i < arr.length; i++) void 0 !== arr[i] && null !== arr[i] || (arr.splice(i, 1), 
        i--);
        return arr;
    }
    function updateSocialShareConfigs($outfit) {
        SocialShare.update({
            image: $outfit.find(".images img").attr("src"),
            description: "See how we’re mixing and matching our favorite spring pieces with the latest styles from our Fall Collection",
            title: "See how we’re mixing and matching our favorite spring pieces with the latest styles from our Fall Collection",
            permalink: window.location.href
        });
    }
    Handlebars.registerHelper("cdn", function(object) {
        return "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/" + object;
    }), Handlebars.registerHelper("outfit_helper", function(text, object) {
        var images, array = object.outfits[text], itemString = clean(object.outfits[text].map(function(obj) {
            if (object.id !== obj.id) return "33" + obj.id;
        })).join(",");
        images = '<img src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/outfits/' + object.outfits[text + "Image"] + '" />';
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.id !== object.id) {
                var details = window.outfit_items[item.id];
                '<li><a href="' + details.link + '">' + details.name + "</a></li>";
            }
        }
        return new Handlebars.SafeString('<div class="images">' + images + '</div><div class="fall-spring__mobile-detail-browse-look"><div class="align-center"><a href="javascript://" class="btn btn-thin" browse-look="' + itemString + '">Shop This Look</a></div><div class="mobile-share-buttons align-center mb1em"><a href="#" class="btn-share" data-media="facebook"></a> <a href="#" class="btn-share" data-media="twitter"></a> <a href="#" class="btn-share" data-media="pinterest"></a> <a href="#" class="btn-share email"><i class=\'fa fa-envelope\'></i></a></div></div>');
    }), Handlebars.registerHelper("outfit_thumbnail_url", function(file) {
        return "https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/outfits/" + file;
    }), Handlebars.registerHelper("desktop_outfit_helper", function(text, object) {
        var images, array = object.outfits[text], outfitTitle = object.outfits[text + "Title"], itemString = clean(object.outfits[text].map(function(obj) {
            if (object.id !== obj.id) return "33" + obj.id;
        })).join(",");
        void 0 === outfitTitle && (outfitTitle = ""), images = '<img src="https://media.cabionline.com/wp-content/uploads/cabi-templates/s19/old-into-new/outfits/' + object.outfits[text + "Image"] + '" />';
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.id !== object.id) {
                var details = window.outfit_items[item.id];
                '<li><a href="' + details.link + '">' + details.name + "</a></li>";
            }
        }
        return new Handlebars.SafeString('<div class="fall-spring__outfit-detail__item outfit ' + text + '"><div class="images">' + images + "</div><div class='align-center mb1em'><a class='btn btn-transparent' href='#' browse-look=\"" + itemString + '">Shop This Look</a></div><div class="share-buttons align-center"><a href="#" class="btn-share" data-media="facebook"></a> <a href="#" class="btn-share" data-media="twitter"></a> <a href="#" class="btn-share" data-media="pinterest"></a> <a href="#" class="btn-share email"><i class="fa fa-envelope"></i></a></div></div>');
    }), $("body").on("click", ".clothing-item", function() {
        $("html,body").animate({
            scrollTop: 0
        }, "fast"), window.window_manager.toggle_details($(this));
    }).on("click", ".fall-spring__mobile-look-btn", function() {
        $(this).parent(".fall-spring__mobile-look").hasClass("active") || window.window_manager.slide_details();
    }).on("click", ".btn-share.email", function(e) {
        e.preventDefault(), window.angular.element(document.body).injector().get("EmailShareModal").activate({
            type: "old-into-new",
            data: {
                image: $(this).parents(".fall-spring__outfit-detail__item").find(".images img").attr("src")
            }
        });
    }).on("click", ".js__mobile-navigation-arrow", function() {
        var $item = $(".fall-spring__outfit-detail--mobile").prev(".clothing-item");
        $item = "next" === $(this).attr("rel") ? $item.nextAll(".clothing-item").length ? $item.nextAll(".clothing-item").first() : $(".clothing-item").first() : $item.prevAll(".clothing-item").length ? $item.prevAll(".clothing-item").first() : $(".clothing-item").last(), 
        window.window_manager.open_details($item), updateSocialShareConfigs($item);
    }).on("click", ".fall-spring__close-mobile-link", function(e) {
        window.window_manager.close_details(), e.stopPropagation();
    }).on("click", '#clothing-details-desktop > a[data-purpose="close"]', function() {
        window_manager.close_details();
    }).on("click", "#clothing-details-desktop a i.icon", function() {
        var idx = $('.clothing-item[data-item-id="' + window.window_manager.current_details + '"]').index(".clothing-item"), length = $(".clothing-item").length;
        $(this).hasClass("icon-arrowleft") ? 0 === idx ? idx = length - 1 : idx-- : idx === length - 1 ? idx = 0 : idx++, 
        window.window_manager.switch_desktop($(".clothing-item").eq(idx).attr("data-item-id"));
    }), $(window).on("load", function() {
        var id = HashUrl.get().replace(/^\D+/g, "");
        if ("" !== id) {
            var obj = $(".clothing-item[data-item-id=" + parseInt(id) + "]");
            window.window_manager.toggle_details(obj), updateSocialShareConfigs(obj);
        }
    }), window.window_manager = {
        current_details: !1,
        toggle_details: function(obj) {
            var id = $(obj).attr("data-item-id");
            this.current_details ? this.current_details !== id ? "mobile" == window_size.size ? (this.close_details(), 
            this.open_details(obj)) : this.switch_desktop(id) : this.close_details() : this.open_details(obj);
        },
        open_details: function(obj) {
            var id = $(obj).attr("data-item-id"), data = window.clothing_items[id];
            HashUrl.update(id), $(".clothing-details-mobile").length && $(".clothing-details-mobile").addClass("old"), 
            $template = $(template[window_size.size](data)), "mobile" == window_size.size ? ($template.insertAfter($(obj)).fadeIn().promise().done(function() {
                $("body").animate({
                    scrollTop: $template.offset().top - $(".clothing-item").eq(0).height()
                }), $(".clothing-details-mobile.old").remove();
            }), $(".clothing-details-mobile").swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    "right" == direction ? 0 !== parseInt($(".clothing-details-mobile .outfit-container").css("left")) && window_manager.slide_details() : "left" == direction && 0 === parseInt($(".clothing-details-mobile .outfit-container").css("left")) && window_manager.slide_details();
                }
            }), $(".insert-item-name").text(data.name)) : ($("#clothing-details-desktop h2, #clothing-details-desktop p span").text(data.name), 
            $("#clothing-details-desktop div").html($template), $("#clothing-details-desktop").addClass("visible").slideDown(), 
            $("body").animate({
                scrollTop: "0px"
            })), this.current_details = id;
        },
        close_details: function() {
            $(".clothing-details-mobile").swipe("destroy"), this.current_details = !1, $obj = $(".clothing-item.active"), 
            $(".clothing-details-mobile").length > 0 && $(".clothing-details-mobile").slideUp().promise().done(function() {
                $(this).remove();
            }), $("#clothing-details-desktop").removeClass("visible").slideUp().promise().done(function() {
                $("#clothing-details-desktop h2, #clothing-details p span, #clothing-details > div").html("");
            });
        },
        slide_details: function() {
            $obj = $(".clothing-details-mobile .outfit-container"), $obj.siblings(".fall-spring__mobile-detail__nav-container").find(".fall-spring__mobile-look").toggleClass("active"), 
            console.log("trigger"), "0px" == $obj.css("left") ? $obj.animate({
                left: "-100%"
            }) : $obj.animate({
                left: "0px"
            });
        },
        resize_details: function() {
            window_manager.close_details();
        },
        switch_desktop: function(id) {
            HashUrl.update(id);
            var details = clothing_items[id];
            window.switch_template = $(template[window_size.size](details)), $("#clothing-details-desktop h2, #clothing-details-desktop p").fadeOut(500).promise().done(function() {
                $("#clothing-details-desktop h2, #clothing-details-desktop p span").text(details.name), 
                $("#clothing-details-desktop h2, #clothing-details-desktop p").fadeIn(500);
            });
            for (var i = 0; i < 2; i++) $("#clothing-details-desktop > div .outfit").eq(i).addClass("hide"), 
            setTimeout(function(num) {
                $("#clothing-details-desktop > div .outfit").eq(num).html($(switch_template[2 * num]).html()).removeClass("hide");
            }, 500, i);
            this.current_details = id;
        }
    }, $(window).smartresize(function(e) {
        window_size.check();
    }), $(window).on("size-change", function() {
        window_manager.resize_details();
    }), $("body").on("mouseover", ".fall-spring__outfit-detail__item", function(e) {
        var $this = $(e.target);
        $this.is(".fall-spring__outfit-detail__item") || ($this = $(e.target).parents(".fall-spring__outfit-detail__item")), 
        updateSocialShareConfigs($this);
    }), $(document).on("click", "a[browse-look]", function(e) {
        var $elm = $(e.target), Quicklook = window.angular.element(document.body).injector().get("quicklookService"), BrowseLookModal = window.angular.element(document.body).injector().get("BrowseLookModal");
        Quicklook.getQuicklooks($elm.attr("browse-look")).then(function(response) {
            BrowseLookModal.activate({
                products: response.data,
                outfitId: !1
            });
        });
    }), window.window_size = {
        size: !1,
        check: function() {
            $(window).width() > 767 ? "desktop" !== this.size && (this.size = "desktop", $(window).trigger("size-change")) : "mobile" !== this.size && (this.size = "mobile", 
            $(window).trigger("size-change"));
        }
    }, window_size.check();
}(jQuery, TEMPLATE_DIR, window.Handlebars, window.HashUrl)), "clothing-collection-style-and-ideas" == window.jQuery("body").attr("data-page-id") && function($) {
    var $menu = $("#quicknav", "main"), $sections = $("section", "main");
    $sections.each(function() {
        var $section = $(this);
        $menu.append($("<a/>", {
            href: "#" + $section.attr("id"),
            text: $section.find("[data-menu-title]").text()
        }));
    }), $("a", $menu).on("click", function(e) {
        e.preventDefault(), function($section) {
            $("html,body").animate({
                scrollTop: $section.offset().top
            });
        }($("section" + $(this).attr("href")));
    }), $("a", "#find-a-stylist").on("click", function(e) {
        e.preventDefault(), $("#find-a-stylist #lead-form-drawer").slideToggle("slow"), 
        "on" == $("#find-a-stylist-cta").attr("data-show") ? $("#find-a-stylist-cta").attr("data-show", "off") : $("#find-a-stylist-cta").attr("data-show", "on");
    }), $(window).on("scroll", function() {
        var $section = function(window_scroltop) {
            var found_section = null;
            return $sections.each(function() {
                var section_top_offset = $(this).offset().top, section_bottom_offset = $(this).offset().top + $(this).outerHeight() - 1;
                window_scroltop >= section_top_offset && window_scroltop < section_bottom_offset && (found_section = $(this));
            }), found_section;
        }($(window).scrollTop());
        void 0 !== $section && null !== $section && function($section) {
            $("a", $menu).each(function() {
                $(this).removeAttr("data-active");
                var href = $(this).attr("href"), section_id = $section.attr("id");
                href == "#" + section_id && function($menu_item) {
                    $menu_item.attr("data-active", !0);
                }($(this));
            });
        }($section);
    }), $(window).on("scrollstart", function() {
        $("body").addClass("scrolling");
    }).on("scrollstop", function() {
        setTimeout(function() {
            $("body").removeClass("scrolling");
        }, 1e3);
    });
}(window.jQuery), "clothing-collection-style-and-ideas-style-tips" == window.jQuery("body").attr("data-page-id") && function($, Slick) {
    $("#tips").slick({
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [ {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: !1
            }
        } ]
    });
}(window.jQuery, window.Slick), window.jQuery("body").hasClass("tax-styles") && function($, Breakpoints, TweenMax, ScrollMagic, Modernizr) {
    if ($(document).ready(function() {
        $(".tax-styles > *").dblclick(function(e) {
            e.preventDefault();
        });
    }), $(window).width() >= Breakpoints.Screen_Desktop && !$("body").hasClass("isMobileBrowser")) {
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
            triggerElement: ".tax-styles--js-1",
            triggerHook: "onEnter",
            duration: 1.25 * $(window).height()
        }).setTween(".tax-styles--js-1-item", {
            y: -25
        }).addTo(controller), new ScrollMagic.Scene({
            triggerElement: ".tax-styles--js-2",
            triggerHook: "onEnter",
            duration: 1.25 * $(window).height()
        }).setTween(".tax-styles--js-2-item", {
            y: -25
        }).addTo(controller), new ScrollMagic.Scene({
            triggerElement: ".tax-styles--js-3",
            triggerHook: "onEnter",
            duration: 2.5 * $(window).height()
        }).setTween(".tax-styles--js-3-item", {
            y: -25
        }).addTo(controller), new ScrollMagic.Scene({
            triggerElement: ".tax-styles--js-4",
            triggerHook: "onEnter",
            duration: 3.75 * $(window).height()
        }).setTween(".tax-styles--js-4-item", {
            y: -25
        }).addTo(controller);
    }
}(window.jQuery, window.Breakpoints, window.TweenMax, window.ScrollMagic, window.Modernizr), 
"page-what-is-cabi" == window.jQuery("#page").attr("data-page-id") && function($) {
    $(".cabi-wrap .animated").waypoint(function() {
        $(".cabi-wrap .animated").addClass("fadeIn");
    }, {
        offset: "80%"
    }), $(".about-story__content").hide(), $(".expanding-btn__js").on("click", function() {
        var btn = $(this);
        return btn.hasClass("open") ? (btn.removeClass("open"), $(".about-story__content").slideToggle(750)) : (btn.addClass("open"), 
        $(".about-story__content").slideToggle(750)), !1;
    });
}(window.jQuery), "clothing-collection-wish-list" == window.jQuery("body").attr("data-page-id") && function($, WishList, CollectionItem, Modal, SocialShare) {
    var $remove_button = $("<a/>", {
        id: "collection-item-remove-button",
        text: "Remove",
        class: "btn btn-black"
    }), $selected_collection_item = null;
    $(document).on("click", "#collection-item-remove-button", function(e) {
        e.preventDefault(), e.stopPropagation(), Modal.open("#remove-item-modal"), $selected_collection_item = $remove_button.parents(".collection-item");
    }), $(document).on("click", "#remove-collection-item-confirm-button", function(e) {
        e.preventDefault(), WishList.remove_item($selected_collection_item.data("api").item_id).then(function() {
            location.reload();
        });
    }), $(".collection-item").each(function() {
        new CollectionItem($(this));
    }).on("mouseenter", function(e) {
        $remove_button.insertBefore($(this).find(".quick-look"));
    }).on("mouseleave", function(e) {
        $remove_button.remove();
    });
}(window.jQuery, window.WishList, window.CollectionItem, window.Modal, window.SocialShare), 
"wishlist-share" == window.jQuery("body").attr("data-page-id") && function($, CollectionItem) {
    $(".collection-item").each(function() {
        new CollectionItem($(this));
    });
}(window.jQuery, window.CollectionItem);