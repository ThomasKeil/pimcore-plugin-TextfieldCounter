/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */


pimcore.registerNS("pimcore.plugin.textfieldcounter");

pimcore.plugin.textfieldcounter = Class.create(pimcore.plugin.admin, {

    getClassName: function() {
        return "pimcore.plugin.textfieldcounter";
    },

    initialize: function() {
        pimcore.plugin.broker.registerPlugin(this);
    }

});

var textfieldcounterPlugin = new pimcore.plugin.textfieldcounter();

