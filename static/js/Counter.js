/**
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 *
 * inspired by http://www.sencha.com/forum/showthread.php?121667-Ext-3.3-Textfield-character-counter-plugin.
 */


// create namespace for plugins
Ext.namespace('Ext.ux.plugins');

Ext.ux.plugins.Counter = function (config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.plugins.Counter, Ext.util.Observable, {
    init: function (field) {
        field.on({
            scope: field,
            keyup: this.updateField,
            focus: this.updateField
        });

        Ext.apply(field, {
            onRender: field.onRender.createSequence(function () {
                this.wrap = this.el.wrap({
                    tag: 'div',
                    id: this.id + '-wrapper'
                },true);
            }),

            afterRender: field.afterRender.createSequence(function () {
                var length = this.getValue().length;

                var charsmax       = field.charsmax;
                if (!charsmax) charsmax = field.autoCreate.maxlength;

                if (charsmax) {
                    var output = length + '/' + charsmax;

                    this.counter = Ext.DomHelper.append(Ext.get(this.wrap).id,{
                        tag: 'span',
                        style: 'color:#C0C0C0;padding-left:5px;',
                        html: output
                    });
/*
                if (length > this.targetmaxlength || length < this.targetminlength) {
                    this.addClass("textfieldcounter_yellow");
                }
*/

                }
            })
        });

    },

    updateField:function(textField) {
        var length = textField.getValue().length;
        var charsmin       = textField.charsmin;
        var charstargetmin = textField.charstargetmin;
        var charstargetmax = textField.charstargetmax;
        var charsmax       = textField.charsmax;
        if (!charsmax) charsmax = textField.autoCreate.maxlength;

        if (charsmax) {
            var output = length + '/' + charsmax;
            Ext.get(this.counter).update(output);


            textField.removeClass("textfieldcounter_red");
            textField.removeClass("textfieldcounter_yellow");

            if (charsmin && length < charsmin) {
              textField.addClass("textfieldcounter_red");
            } else if (charsmax && length >= charsmax) {
              textField.addClass("textfieldcounter_red");
            } else if (charstargetmin && length < charstargetmin) {
              textField.addClass("textfieldcounter_yellow");
            } else if (charstargetmax && length > charstargetmax) {
              textField.addClass("textfieldcounter_yellow");
            }
        }
    }
});