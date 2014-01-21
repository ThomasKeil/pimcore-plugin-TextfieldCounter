/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */



pimcore.object.classes.data.textarea = Class.create(pimcore.object.classes.data.textarea, {

    getLayout: function ($super) {
        $super();
        var title = this.datax.name;

        this.createCountConfig(title);
        return this.layout;
    }
});
pimcore.object.classes.data.textarea.addMethods(TextfieldCounter.helpers.countconfig);
