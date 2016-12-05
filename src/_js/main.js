/**
 * Some useful packages (you can install by using npm)
 * 1. webfontloader  = async font loaders
 * 2. slick-carousel = Simple, easy, responsive carousel (buggy centerMode - variableWidth - lazyMode)
 * 3. jquery-match-height = Use this to match the height of elements. Either use this or Equalizer from Foundation
 * 4. dropkickjs = if you need custom dropdown
 *
 * IMPORTANT:
 * To import async-ly, you need to wrap your codes in require.ensure([], () => { });
 * It's best not to async plugins, to leverage browser cache
 * Ref: https://webpack.github.io/docs/code-splitting.html
 *  
 * NOTES:
 * This boilerplate uses CDN/external for jQuery package. Configured in gulp/webpack.js. 
 * This to prevent the needs of jQuery from node_modules
 */

// import wf from 'webfontloader';
import $ from 'jquery';

// wf.load({
//     google: {
//       families: ['Open Sans:400,600,800:latin', 'Slabo 27px:400:latin']
//     }
// });

$(() => {

    /////////////////////////////////
    // Partial requires example    //
    /////////////////////////////////
    if( true ) {
        require.ensure([], () => {
            require('./partials/partial')($);
        }, "partials");    
    }
    
});
