/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */


pimcore.object.object = Class.create(pimcore.object.object, {
    getData: function ($super) {
        remote_textfieldcount_settings = null;
        jQuery.ajax({
            url: "/plugin/TextfieldCounter/object/get",
            async: false,
            dataType: "json",
            type: "GET",
            data: {
                id: this.id
            },
            success: function(data) {
                remote_textfieldcount_settings = data;
            }
        });
        this.textfieldcount_settings = remote_textfieldcount_settings;
        $super();
    }
});


// Re-Initialize the Variant to introduce the overloaded getData method
pimcore.object.variant = Class.create(pimcore.object.object, {

});