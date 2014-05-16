var app = app || {};

$(function() {

    var AppView = Backbone.View.extend({});
    app = new AppView();
    app.employerTemplate = $("#employer-template").html();
    app.myPageTemplate = $("#employer-detail-template").html();

    EmployerView = Backbone.View.extend({

        // tagName: "li",

        template: _.template(app.employerTemplate),

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    EmployersView = Backbone.View.extend({

        el: '.content',
        
        events: {
            'click .page_button': 'changePage',
        },

        changePage: function(e){
            var page_Id = $(".page_button");
            console.log("func changePage " + $(e.target).data("direction"));  

            var newPage = parseInt(this.page) + parseInt($(e.target).data("direction"));
            if(newPage < 1) newPage = 1;

            app.router.navigate('/employers//' + newPage, {
                   trigger: true
            });            
        },


        initialize: function(e) {
            console.log("initialization");
            this.$el.html('');
            // this.$el.append("<ul class='employer-list'> </ul>");
            this.$el.append("<div class='employer-list'> </div>");
            this.$el.append("<p>" +
                "<input class='page_button' data-direction = '-1' type='button' value=' << '>"+
                "<input class='page_button' data-direction = '1' type='button' value=' >> '>" +
                "</p>");

            // console.log(this);
            // console.log(e);
            // this.page = e.page;
            this.page = 1;
        },

        render: function() {
            this.$(".employer-list").html('');
            if (app.employers.length) {
                _.each(app.employers.models, this.addOne);
            }
            return this;
        },

        addOne: function(employer) {
            var view = new EmployerView({
                model: employer
            });
            this.$(".employer-list").append(view.render().el);
        }
    });

    MyPageView = Backbone.View.extend({
        el: '.content',

        template: _.template(app.myPageTemplate),
        initialize: function() {
            //console.log("test1");
        },

        render: function() {
            //console.log("test");
            this.$el.html('');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
            //console.log(this.template);
        },
    });

    NewsView = Backbone.View.extend({
        el: '.content',
        render: function() {
            this.$el.html('<img src="http://dummyimage.com/600x500&text=News" alt="" />');
            return this;
        }
    });

    GroupsView = Backbone.View.extend({
        el: '.content',
        render: function() {
            this.$el.html('<img src="http://dummyimage.com/600x500&text=Groups" alt="" />');
            return this;
        }
    });

    TopMenuView = Backbone.View.extend({
        el: '.top-menu',

        events: {
            'click .menu-item': 'selectPage',
            'click .btn-search': 'searchByClick',
            'keypress .search-control': 'search',
        },

        initialize: function() {},

        render: function() {
            return this;
        },

        selectPage: function(ev) {    //?!
            var urlPath = $(ev.currentTarget).attr('value').toLowerCase();
            app.router.navigate(urlPath, {
                trigger: true
            });
        },

        search: function(e) {
            console.log("Tt12");
            if (e.which === 13) {
                var keywords = $(e.target).val();

                //if (keywords === '') return;
                if (keywords === '') {
                    app.router.navigate('/employers', {
                        trigger: true
                    });
                } else {
                    app.router.navigate('/employers/' + keywords + '/', {
                        trigger: true
                    });
                }
            }
        },

        searchByClick: function(e) {
            console.log("Tt");
            var keywords = $('.search-control').val();
            if (keywords === '') {
                app.router.navigate('/employers', {
                    trigger: true
                });
            } else {
                app.router.navigate('/employers/' + keywords+ '/', {
                    trigger: true
                });
            }
        }
    });
});
