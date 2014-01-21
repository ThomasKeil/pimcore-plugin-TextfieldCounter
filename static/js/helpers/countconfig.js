/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */

pimcore.registerNS("TextfieldCounter.helpers.countconfig");
TextfieldCounter.helpers.countconfig = {
    createCountConfig: function (title) {
        var node = this.treeNode;

        while (node.parentNode != null) {
            node = node.parentNode;
        }
        if (!node.textfieldcounter_data) { // TODO: this probably isn't yet working with fieldcollections
            return this.layout;
        }

        charsmin = "";
        charstargetmin = "";
        charstargetmax = "";
        charsmax = "";

        if (node.textfieldcounter_data && node.textfieldcounter_data["fields"] && node.textfieldcounter_data["fields"][title]) {
            charsmin = node.textfieldcounter_data["fields"][title]["charsmin"];
            charstargetmin = node.textfieldcounter_data["fields"][title]["charstargetmin"];
            charstargetmax = node.textfieldcounter_data["fields"][title]["charstargetmax"];
            charsmax = node.textfieldcounter_data["fields"][title]["charsmax"];
        }

        this.layout.add({
            xtype: "form",
            title: t("TextfieldCounter settings"),
            bodyStyle: "padding: 10px;",
            style: "margin: 10px 0 10px 0",
            items: [
                {
                    xtype: "spinnerfield",
                    fieldLabel: t("charsmin"),
                    name: "textfieldcounter_charsmin",
                    value: charsmin
                },{
                    xtype: "spinnerfield",
                    fieldLabel: t("charstargetmin"),
                    name: "textfieldcounter_charstargetmin",
                    value: charstargetmin
                },{
                    xtype: "spinnerfield",
                    fieldLabel: t("charstargetmax"),
                    name: "textfieldcounter_charstargetmax",
                    value: charstargetmax
                },{
                    xtype: "spinnerfield",
                    fieldLabel: t("charsmax"),
                    name: "textfieldcounter_charsmax",
                    value: charsmax
                }
            ]
        });
    }
};