/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */


pimcore.object.classes.klass  = Class.create(pimcore.object.classes.klass, {


    initLayoutFields: function ($super) {
        textfieldcounter_remote_data = null;
        jQuery.ajax({
            url: "/plugin/TextfieldCounter/class/getdata",
            async: false,
            dataType: "json",
            type: "GET",
            data: {
                id: this.data.id
            },
            success: function(data) {
                textfieldcounter_remote_data = data;
            }
        });


        var rootNode = this.tree.getRootNode();

        rootNode.textfieldcounter_data = textfieldcounter_remote_data;
        $super();
    },

    saveOnComplete: function ($super, response) {
        $super(response);
        var configuration = Ext.encode(this.getData());
        var values = Ext.encode(this.data);

        Ext.Ajax.request({
            url: '/plugin/TextfieldCounter/class/save',
            method: "post",
            params: {
                configuration: configuration,
                id: this.data.id
            },
            success: this.saveTextfieldCounterOnComplete.bind(this),
            failure: this.saveTextfieldCounterOnError.bind(this)
        });
    },

    saveTextfieldCounterOnComplete: function (response) {

        try {
            var res = Ext.decode(response.responseText);
            if(!res.success) {
                throw "save of textfieldcounter data was not successful, see debug.log";
            }
        } catch (e) {
            this.saveRestrictionsOnError();
        }

    },

    saveTextfieldCounterOnError: function () {
        pimcore.helpers.showNotification(t("error"), t("textfieldcounter_save_error"), "error");
    }

});