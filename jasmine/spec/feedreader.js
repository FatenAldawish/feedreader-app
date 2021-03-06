/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         function TestURL(feed) {
           it('has a URL defined ' , function() {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBe(0);
           });
         }

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         function TestName(feed) {
           it('has a name defined ' , function() {
           expect(feed.name).toBeDefined();
           expect(feed.name.length).not.toBe(0);
           });
         }

         for ( var feed of allFeeds) {
           TestURL(feed);
           TestName(feed);
         }
    });


    /* test suite named "The menu" */
    describe('The menu', function() {
      /* test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('should be hidden by default', function () {
            expect($("body").hasClass('menu-hidden')).toBe(true);
       });

       /* test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should changes the visibility when the menu icon is clicked', function () {
            // first click display the menu
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(false);

            // if the menu clicked again it'll be hidden
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

    });



    /* test suite named "Initial Entries" */
    describe('nitial Entries', function() {
      beforeEach(function (done) {
        loadFeed(0, done);
      });
      /* test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       it('should be at least a single .entry element within the .feed container.', function(){
         expect($('.feed .entry').length).not.toEqual(0);
       });

    });



    /*  new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var actualContent, newContent;

      beforeEach(function (done) {
        loadFeed(0, function () {
                actualContent = $('.feed').text();

                loadFeed(1, function () {
                    newContent = $('.feed').text();
                    done();
                });
              });
      });

      /* test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       it('Should content changes after new feed is loaded', function(){
         expect(actualContent).not.toBe(newContent);

       });

    });


}());
