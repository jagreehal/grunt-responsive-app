grunt-responsive-app
====================

## Commit Tags as follows!

* v0.0.1 - Added grunt packages to check JavaScript quality, load tasks and commit to GitHub
	* grunt
	* grunt-contrib-jshint
	* jshint-stylish
	* load-grunt-tasks
	* grunt-bump
	
* v0.0.2 - PROBLEM: need to create server that can be accessed by devices on the same network
	* grunt-contrib-connect

* v0.0.3 - PROBLEM: need to sync HTML across devices
	* grunt-contrib-watch
	
* v0.0.4 - PROBLEM: need to sync CSS across devices
* v0.0.5 - PROBLEM: want responsive boxes full width 'mobile' otherwise single row 
* v0.0.6 - PROBLEM: having to repeat breakpoints. SOLUTION: Use LESS variables
	* grunt-contrib-less
* v0.0.7 - PROBLEM: embedding media queries bloats CSS. SOLUTION: Combine them together!
	* grunt-combine-media-queries
* v0.0.8 - PROBLEM: Vendor prefixes. Need a mix-in alternative.
	* grunt-autoprefixer
* v0.0.9 - PROBLEM: LESS file becoming messy. SOLUTION: use imports!
* v0.0.10 - PROBLEM: Reloading CSS causes reload injection would be better. SOLUTION: Browser sync with fix until this is resolved https://github.com/shakyShane/grunt-browser-sync/issues/11
	* grunt-browser-sync
* v0.0.11 - PROBLEM: I need a flexible grid (without a framework!). SOLUTION: Grids don't overthink it! Also mixin for REM, debug and normalize
* v0.0.12 - PROBLEM: Get on with creating the product page!. SOLUTION: Add boilerplate code for product
* v0.0.13 - PROBLEM: What about related items!. SOLUTION: Added related item using flex wrap (Firefox v28) to so autoprefixer in action.
* v0.0.14 - PROBLEM: What about reviews!. SOLUTION: Added reviews.
* v0.0.15 - PROBLEM: I want to use icons!. SOLUTION: Grunticon!
	* grunt-grunticon	 
* v0.0.16 - PROBLEM: I want images... responsive ones!	* grunt-responsive-images
* v0.0.17 - PROBLEM: My html, css, js and images are bloated! SOLUTION: Compress	* grunt-contrib-clean
	* grunt-usemin
	* grunt-contrib-uglify
	* grunt-concurrent
	* grunt-contrib-copy
	* grunt-contrib-imagemin (jpeg issues)
	* grunt-svgmin
	* grunt-contrib-htmlmin
	* grunt-contrib-cssmin
	* grunt-contrib-concat
	* grunt-smushit
* v0.0.18 - PROBLEM: Browsers are caching out of date files. SOLUTION: Modify files after every build	
	* grunt-rev
* v0.0.19 - PROBLEM: I need to know if how performant my page is. SOLUTION: Use phantoms to run yslow script	
	* grunt-exec
* v0.0.20 - PROBLEM: I want to be able to compare performance after every build. SOLUTION: Use phantomas to capture metrics	
	* grunt-phantomas
* v0.0.21 - PROBLEM: I want to screenshots of the page after every build. 
	* grunt-autoshot
* v0.0.22 - PROBLEM: I want to know how long my grunt tasks are taking
	* time-grunt
* v0.0.23 - PROBLEM: I want to improve the build time. SOLUTION: run things concurrently!
	* grunt-concurrent