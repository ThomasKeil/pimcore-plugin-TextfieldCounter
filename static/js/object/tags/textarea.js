/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */


pimcore.object.tags.textarea = Class.create(pimcore.object.tags.textarea, {

    getLayoutEdit: function ($super) {
        $super();
        this.createCountDisplay();
        return this.component;
    }
});
pimcore.object.tags.textarea.addMethods(TextfieldCounter.helpers.countdisplay);