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