//  Handelbars
{/* <div>
{{#if (high data)}}
<image src ="https://i.postimg.cc/Xqh22cFn/Firefly-A-room-that-is-moist-with-water-dripping-off-the-walls-and-furniture-and-pooling-on-the-flo.jpg">
<h1 style="position: fixed; bottom: 1rem; right: 1rem; font-size: 8rem">
  <b style="color: #fff; padding: 1px 8px;" >H2O ↑</b></h1>
{{/if}}
{{#if (medhigh data)}}
<image src ="https://i.postimg.cc/xdhhpQSw/Firefly-A-room-with-furniture-and-soft-light-it-feels-cozy-but-slightly-moist-and-damp-like-there.jpg">
<h1 style="position: fixed; bottom: 1rem; right: 1rem; font-size: 8rem">
  <b style="color: #fff; padding: 1px 8px;" >H2O ↗ </b></h1>
{{/if}}
{{#if (med data)}}
<image src ="https://i.postimg.cc/qvY9XSHN/Firefly-A-room-filled-with-plants-large-windows-and-sparse-furniture-One-plant-features-prominentl.jpg">
<h1 style="position: fixed; bottom: 1rem; right: 1rem; font-size: 8rem">
  <b style="color: #fff; padding: 1px 8px;" >H2O →</b></h1>
{{/if}}
{{#if (medlow data)}}
<image src ="https://i.postimg.cc/xdhhpQSw/Firefly-A-room-with-furniture-and-soft-light-it-feels-cozy-but-slightly-moist-and-damp-like-there.jpg">
<h1 style="position: fixed; bottom: 1rem; right: 1rem; font-size: 8rem">
  <b style="color: #fff; padding: 1px 8px;" >H2O ↘</b></h1>
{{/if}}
{{#if (low data)}}
{{!-- <image  src="https://i.postimg.cc/vT74HDJZ/room-dry.png"> --}}
<image  src="https://i.postimg.cc/Ss3R0q5c/Firefly-A-room-that-is-dry-with-cracked-walls-and-furniture-and-sand-on-the-floor-39564.jpg">
<h1 style="position: fixed; bottom: 1rem; right: 1rem; font-size: 8rem">
  <b style="color: #fff; padding: 1px 8px;" >H2O ↓</b></h1>
{{/if}} */}


// JS
handlebars.registerHelper("high", function (data) {
    let humidity = data[0].Mean.toFixed();
    return humidity > 65;
  })
  handlebars.registerHelper("medhigh", function (data) {
    let humidity = data[0].Mean.toFixed();
    return humidity > 55 && humidity < 66;
  })
  
  handlebars.registerHelper("med", function (data) {
    let humidity = data[0].Mean.toFixed();
    return humidity > 45 && humidity < 56;
  })
  handlebars.registerHelper("medlow", function (data) {
    let humidity = data[0].Mean.toFixed();
    return humidity > 35 && humidity < 46;
  })
  handlebars.registerHelper("low", function (data) {
    let humidity = data[0].Mean.toFixed();
    return humidity < 36;
  })
  
  
  