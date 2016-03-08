## Description

Run all of yours frontend casperjs tests inside phantom environment.

## Installation

> paste casperjs folder inside /lib e rename to 'casperjs', **or** alter file /lib/test_bootstrap.js point to your casperjs installation:
	Line 45:
	phantom.casperPath = GetDirectory('YOUR_LOCATION/casperjs');
	phantom.injectJs(GetDirectory('YOUR_LOCATION/casperjs/bin/bootstrap.js'));

> setup a test file and paste inside /test_files
> excute phantomjs run.js
