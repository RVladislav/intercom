var app = app || {};

function fu (n){

    if(n==1)
    {alert("back")}
    if(n==2)
    {alert("next")}
    console.log(n)
}

$(function() {

    $('#header').hide();
    $('#top-menu').hide();
    //global
    //app.employers - collection of userprofiles
    //app.router - backbone router

    var EmployerCollection = Backbone.Collection.extend({
        url: '/api/user_profile.json'
    });

    app.employers = new EmployerCollection
    app.topMenuView = new TopMenuView();
    app.topMenuView.render(); //bind search event 

    var appRouter = Backbone.Router.extend({
        routes: {
            'employers': 'employers',
            'news': 'news',
            'mypage': 'mypage',
            'mypage/(:param)': 'mypage',
            'groups': 'groups',
            'employers/(:param)': 'employers',
            '*actions': 'search'
        },

        search: function(param) {
            app.employers.fetch({
                error: function() {
                    console.log("some errors");
                },
                success: function() {
                    var empView = new EmployersView({});
                    empView.render();
                }
            });
        },

        mypage: function(param) {
            if (param !== null) {
                console.log("mypage id: " + param);
                var myPageView = new MyPageView({
                model: app.employers.first()
            });
                myPageView.render();
            } else {
                var myPageView = new MyPageView({
                model: app.employers.first()
            });
                myPageView.render();
            }
        },

        employers: function(param) {
            if (param !== null) {
                app.employers.fetch({
                    data: {
                            skills: param.split(' ')
                    },
                    error: function() {
                        console.log("some errors");
                    },
                    success: function() {
                        var empView = new EmployersView({});
                        empView.render();
                    }
                });
            } else {
                app.employers.fetch({
                    error: function() {
                        console.log("some errors");
                    },
                    success: function() {
                        var empView = new EmployersView({});
                        empView.render();
                    }
                });
            }
        },

        news: function() {
            var newsView = new NewsView();
            newsView.render();
        },


        groups: function() {
            var groupsView = new GroupsView();
            groupsView.render();
        }

    });

    app.router = new appRouter();
    Backbone.history.start();
});