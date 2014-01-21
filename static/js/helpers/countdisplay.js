/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */


pimcore.registerNS("TextfieldCounter.helpers.countdisplay");
TextfieldCounter.helpers.countdisplay = {
    createCountDisplay: function () {
        if (this.object.textfieldcount_settings) {
            var lengths = this.object.textfieldcount_settings[this.fieldConfig.name];
            var maxlength = this.fieldConfig.columnLength;
            if (!maxlength) {
                maxlength = lengths.charsmax;
            }

            if (maxlength) {
                var new_input = {
                    enableKeyEvents: true,
                    plugins: new Ext.ux.plugins.Counter(),
                    charsmin: lengths.charsmin,
                    charstargetmin: lengths.charstargetmin,
                    charstargetmax: lengths.charstargetmax,
                    charsmax: lengths.charsmax
                };

                this.component  = this.component.cloneConfig(new_input);
            }
        }

    }
};