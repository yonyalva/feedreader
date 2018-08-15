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
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('URL defined', function() {
			let urlempty = 0;
			let urldefine = true;
			for (i = 0; i < allFeeds.length; i++){
				if (allFeeds[i].url === "") {
					urlempty ++;
				}	
				if (!allFeeds[i].hasOwnProperty("url")) {
					urldefine = false;
				}						
			}
			expect(urldefine).toBe(true);
			expect(urlempty).toBe(0);
		 });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('name defined', function() {
			let nameempty = 0;
			let namedefine = true;
			for (i = 0; i < allFeeds.length; i++){
				if (allFeeds[i].name === "") {
					nameempty ++;
				}	
				if (!allFeeds[i].hasOwnProperty("name")) {
					namedefine = false;
				}						
			}
			expect(namedefine).toBe(true);
			expect(nameempty).toBe(0);
		 });
    });


    /* Test suite named "The menu" */
	describe('The menu', function() {
		
		
        /* This test ensures the menu element is
         * hidden by default.
         */
		 it("It's Hidden", function() {			 
			 const body = $("body");
					expect(body.hasClass("menu-hidden")).toBe(true);
				});
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		  it("Menu Changes", function() {			 
			 const burger = document.querySelector(".menu-icon-link");
			 const body = $("body");;
				burger.click();
				expect(body.hasClass("menu-hidden")).toBe(false);
				burger.click();
				expect(body.hasClass("menu-hidden")).toBe(true);
				});
	});
    /* Test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
			
			beforeEach(function(done) {
				loadFeed(3, done);
				 });
			it("At least one entry", function() {
				const list = document.querySelectorAll(".feed .entry");	
					expect(list.length).not.toBe(0);
});
	});

		
		
    /* Test suite named "New Feed Selection" */
		describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
       */
			let firstFeed, secondFeed;
			beforeEach(function(done) {
				loadFeed(0, function()  {
					firstFeed = document.querySelector('.feed').innerHTML;
						  
					loadFeed(3, function() {
						secondFeed = document.querySelector('.feed').innerHTML;
						done();
					});
				});
			});
	
			it("Loads new feeds", function() {	
				expect(firstFeed).not.toBe(secondFeed);
			});

	});
	
	  
}());
