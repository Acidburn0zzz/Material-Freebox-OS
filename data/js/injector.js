/**
 * Material-Freebox-OS
 * Client dependencies injector
 */
(function() {
    if (document.title.indexOf('Freebox OS') != 0)
        return;

    // Define functions
    var Injector = {
        metaName: 'MaterialFreeboxOS',
        hasMeta: function(key) {
            var metas = document.getElementsByTagName('meta');
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == key)
                    return true;
            }

            return false;
        },
        addMeta: function(key, val) {
            var m = document.createElement('meta');
            m.name = key;
            m.content = val;
            document.head.appendChild(m);
            return m;
        },
        getDeps: function() {
            return {
                js: [
                    'data/js/script.js'
                ],
                css: [
                    'data/css/style.css',
                    //'https://cdn.materialdesignicons.com/1.5.54/css/materialdesignicons.min.css', <- Invalid certificate, let's use this one instead:
                    'https://www.s-quent.in/bundles/app/3d/css/materialdesignicons.min.css',
                    'https://fonts.googleapis.com/css?family=Roboto:400,300'
                ]
            };
        },
        getDepURI: function(relative) {
            return relative.substring(0, 'http'.length) == 'http'
                ? relative
                : chrome.extension.getURL(relative);
        },
        injectScript: function(src) {
            var s = document.createElement('script');
            s.src = src;
            (document.head || document.documentElement).appendChild(s);
        },
        injectStylesheet: function(src) {
            var s = document.createElement('link');
            s.rel = 'stylesheet';
            s.href = src;
            s.media = 'all';
            s.type = 'text/css';
            document.head.appendChild(s);
        },
        injectAll: function() {
            var deps = this.getDeps();
            var that = this;

            // Inject scripts
            deps.js.forEach(function(uri) {
                that.injectScript(that.getDepURI(uri));
            });

            // Inject stylesheets
            deps.css.forEach(function(uri) {
                that.injectStylesheet(that.getDepURI(uri));
            });
        }
    };

    // Check if Material-Freebox-OS meta tag is here
    // (it would mean that another instance has already been injected)
    if (Injector.hasMeta(Injector.metaName))
        throw new Error('Material-Freebox-OS already injected, aborting.');

    // Append Material-Freebox-OS meta tag to head
    Injector.addMeta(Injector.metaName, true);

    // Inject dependencies
    Injector.injectAll();
})();
