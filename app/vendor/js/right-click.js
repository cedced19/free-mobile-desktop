$(function() {
    var Menu = function (cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui'), 

            menu = new gui.Menu(), 

            cut = new gui.MenuItem({
                label: cutLabel, 
                click: function() {
                    document.execCommand('cut');
                }
            }), 

            copy = new gui.MenuItem({
                label: copyLabel,
                click: function() {
                    document.execCommand('copy');
                }
            }), 

            paste = new gui.MenuItem({
                label: pasteLabel, 
                click: function() {
                    document.execCommand('paste');
                }
            });

        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    var menu = new Menu('Cut', 'Copy', 'Paste');


    $(document).on('contextmenu', function(e) {
        e.preventDefault();
        menu.popup(e.originalEvent.x, e.originalEvent.y);
    });
});