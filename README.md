#BoilerplateV 
An extensive HTML5 framework for building robust web sites utilising [Jade](http://jade-lang.com/), SCSS/PostCSS with [Gulp](http://gulpjs.com). The boilerplate is based on [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt). The difference is, instead of Browserify, it uses Webpack. By default, it uses Foundation. For Boostrap lovers, you can checkout the [**boilerplate**](https://github.com/viperfx07/boilerplatev/tree/feature/bootstrap) feature branch.

>Notes:
>
>- gulp-sass though using node-sass options, can't make a sourcemap without gulp-sourcemaps
>- for browsersync, because using node-gyp, see INSTALLATION part on https://github.com/nodejs/node-gyp
>   P.S On my home machine (Win10), it works fine without installing the requirements
>- To install latest and save to dev a module => npm i -D <module>@latest

##Requirements
1. Node (npm) = use the latest version
2. Python (this is required by imagemin, but without it, it works just fine)
3. Gulp (run **npm i -g gulp** if you don't have it)

##Getting Started
1. npm install
2. gulp (add --production for the production (minified) codes)

```
├── gulp/                      # Folder for gulp tasks
├── www/                     # Folder for production www output
├── tmp/                       # Folder for temporary development output
├── src
|   ├── _data                  # JSON/YAML files that add data to templates
|   ├── _img		           # Images
|   ├── _layouts               # Layout structure for app
|   |   └── global.jade
|   ├── _modules               # Reusable modules (curretly not implemented)
|   |   └── link
|   |       ├── __tests__
|   |       |   └── link.spec.js
|   |       ├── link.jade
|   |       ├── link.js
|   |       └── link.scss
|   ├── _partials             # Reusable jade partials
|   ├── _mixins               # Jade mixins
|   ├── _css                  # Global css, mixins, variables, etc
|   |   └── main.scss         # Main stylesheet (import everything to this file)
|   ├── _js					  # Global js, base classes, etc
|   |   └── main.js           # Main bootstrap file
|   ├── _fonts                # Fonts (including icon font)
|   ├── index.jade            # Homepage template
|   ├── favicon.ico
|   └── robots.txt
├── gulpfile.babel.js         # Gulp task configuration
└── package.json              # Dependencies and site/folder configuration
```

Congratulations! You should now have successfully created a Yeogurt project and are ready to start building out your site/app.

Now you can run the following gulp tasks:

- `gulp serve` for previewing your site/app on a development server.
- `gulp serve --production` for previewing a production version of your site/app.
- `gulp` for testing and building a development version of your site.
- `gulp --production` same as `gulp` but builds a production version of your site.
- `gulp test` for linting your scripts and running unit tests.

You can learn more about what tasks are available in the [gulp tasks](#gulp-workflow) section.

##HTML
It will be generated using Jade

##CSS
It will be generated using SCSS with the concept of BEM (Block Element Modifier) with ITCSS (Inverted Triangle CSS)

###Framework
[Foundation 6](http://foundation.zurb.com/sites/docs/) (as the time of writing). If you want to use Bootstrap, use the **bootstrap** feature branch.

Reason:

- It can generate the breakpoint-wis classes for you with a single variable change
- Smaller footprints
- A11y (Accessibility) Friendly
- [Other features](http://foundation.zurb.com/sites.html)

The most important files for Foundation in this boilerplate are **_settings.foundation.scss** and **_generic.foundation.scss**. For you who uses Bootstrap feature branch, they are **_settings.bootstrap.scss** and **_generic.bootstrap.scss**

###ITCSS 
(ref: https://speakerdeck.com/dafed/managing-css-projects-with-itcss)

Managing CSS at scale is hard; and a lot harder than it should be. ITCSS is a simple, effective, and as-yet unpublished methodology to help manage, maintain, and scale CSS projects of all sizes. 
In this talk we’ll take a sneak peek at what ITCSS is and how it works to tame and control UI code as it grows.

The structure:

1. **Settings** - global variables, config switches, brand colours, etc.
2. **Tools** - Globally available tools, public mixins and helper functions.
3. **Generic** - Ground-zero styles (normalize.css, reset, box-sizing). Low specificity, far-reaching.
4. **Base** - Unclassed HTML elements (H1-H6, basic links, lists, etc). Last layer we see type selectors (e.g. a{}, blockqoute {}).
5. **Objects** - Cosmetic-free design patterns, OOCSS, begin using classes exclusively, agnostically named (e.g. .ui-list {}).
6. **Components** - Designed components, chunks of UI, still only using classes, more explicitly named (e.g. .product-list {}).
7. **Theme** (optional).
8. **Win/Trumps** - Helpers and overrides. Usually carry !important.

**ITCSS** benefits:
* Manages source order
* Filters explicitness
* Tames the cascade
* Sanitizes inheritance

### BEM
(ref: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**Important note:**
*Just because something happens to live inside a block it doesn’t always mean is is actually a BEM element*

### Icons

I'm using gulp-iconfont to generate fonts. The SCSS file is generated from the src\_icons\icons_template.scss, which results in 03\_generic/\_generic.icons.scss. 

The icons scss follows the Font-Awesome standard, so use it like when you use Font-Awesome, but instead of using .fa, you need to use .icon. 

Although the template is similar to **FontAwesome**,  don't use it like .fa.fa-[icon-name], instead just use like **.icon-[icon-name]** e.g. .icon-facebook (don't need .icon.icon-facebook). 

**Notes** 
"icon" as a class. **Adblock Plus** apparently has a CSS rule to hide icon-[social-icons] elements. This happens for other classes like .footer-[social] as well

### Sprites

I'm using [postcss-sprites](https://github.com/2createStudio/postcss-sprites) plugin to generate a sprite. All you need to do is to put all the images that you want to generate as a sprite in src/_img/sprite/ folder and it will be generated as **sprite.png**. If you want to use it, you can use the sprite mixin **m-sprite(filename)**.

### Tools/Mixins/Functions
**Important**:

1. All user-created functions must use f-*function-name* name convention, e.g. color: **f-color()** and put in **src/scss/02_tools/** folder and named **_tools.function.*function-name*.scss**.
2. All user-created mixins need to use m-*mixin-name* name convention: **@include m-icon()**. and put in **src/scss/02_tools/** folder and named **_tools.mixin.*mixin-name*.scss**
3. Foundation mixins found [here](http://foundation.zurb.com/sites/docs/sass-mixins.html) (if using Foundation).

Notes:
It hasn't had any setup the task to generate more than 1 sprite. Please see [here](https://github.com/2createStudio/postcss-sprites) for reference.

##JS: Vanilla JS + jQuery


## Gulp Workflow

### `gulp --production`
Runs [`gulp test`](#gulp-test) and builds out an optimized site through compilation of preprocessors (Jade, Sass, etc), minification of CSS and HTML, uglification of Javascript, and optimization of images.

### `gulp serve`
Starts up a development server that watches files and automatically reloads them to the browser when a change is detected.

**Extra Task Target(s)**

|Tasks| Description
|---------|-------
|`gulp serve --production`|  starts up a server that loads a production version of the site
|`gulp serve --open`|  starts up a server and opens it within your default browser


## Issues / Todo

1. (FIXED) Source map is not correct.
> This is fixed by changing the outputStyle of the sass to default.

2. Sometimes, browsersync doesn't reload, even though there's no error


## Multiple Sites

1. **gulp/copy.js** has **copy_otherWWW** which is configured in package.json
This will allow the users to copy the tmp directory to single or multiple other directories (i.e sites directories).
To run this task, type `gulp copy_otherWWW`. But before making and copying js/css to multiple directories/sites, make sure you check the other two tips below. This will prevent duplication that gives you a headache and hard to manage codes.

2. **_CSS-wise**, it's BEST to use **ONE main.css** for all of the sites and using theme for specific site.
For example, **siteA** has a theme class **theme--siteA**, while siteB has **theme--siteB** class in the body so that the users can just those classes. **Folder structure-wise**, it's better to structure them like this:

```
src
	css
		07_theme
			siteA
				04_base			-- base specifically for siteA theme (optional, if needed) 
				06_components	-- components specifically for siteB theme
				..etc..
			siteB
				04_base			-- base specifically for siteB theme (optional, if needed) 
				06_components	-- components specifically for siteB theme
				..etc..
```

3. **JS-wise**, it's BEST to use **ONE main.js** for all of the sites and using **require** to import the specific-site script into the **main.js asynchronously**.
For example, if you look on **_src/js**, there's a folder called partials. Inside it, we can have files / folders depend how you want to structure it, and you can use require as per example to include them asyncly in **main.js**.
If the codes needed all the time, just use import.
