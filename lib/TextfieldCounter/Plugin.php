<?php

/**
 * This source file is subject to the new BSD license that is
 * available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2014 Weblizards GmbH (http://www.weblizards.de)
 * @author     Thomas Keil <thomas@weblizards.de>
 * @license    http://www.pimcore.org/license     New BSD License
 */

if (!defined("TEXTFIELDCOUNTER_PLUGIN")) define("TEXTFIELDCOUNTER_PLUGIN", PIMCORE_PLUGINS_PATH.DIRECTORY_SEPARATOR."TextfieldCounter");
if (!defined("TEXTFIELDCOUNTER_VAR"))    define("TEXTFIELDCOUNTER_VAR", PIMCORE_WEBSITE_PATH . "/var/plugins/TextfieldCounter");


class TextfieldCounter_Plugin extends Pimcore_API_Plugin_Abstract implements Pimcore_API_Plugin_Interface {

  public static function needsReloadAfterInstall() {
      return true; // User muss neu geladen werden
  }

  public static function install() {
    if (!is_dir(TEXTFIELDCOUNTER_VAR)) mkdir(TEXTFIELDCOUNTER_VAR);

    foreach (array("classes.xml", "config.xml") as $config_file) {
      if (!file_exists(TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR.$config_file)) {
        copy(TEXTFIELDCOUNTER_PLUGIN.DIRECTORY_SEPARATOR."files".DIRECTORY_SEPARATOR.$config_file, TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR.$config_file);
      }
    }

    if (self::isInstalled()) {
      return "TextfieldCounter Plugin successfully installed.";
    } else {
      return "TextfieldCounter Plugin could not be installed";
    }
  }

  public static function uninstall() {
    return "Plugin didn't need to be uninstalled";
  }

  public static function isInstalled() {
    if (!is_dir(TEXTFIELDCOUNTER_VAR)) return false;
    if (!is_file(TEXTFIELDCOUNTER_VAR."/config.xml")) return false;
    return true;
  }

  public function preDispatch() {

  }

  /**
   *
   * @param string $language
   * @return string path to the translation file relative to plugin direcory
   */
  public static function getTranslationFile($language) {
    if(file_exists(PIMCORE_PLUGINS_PATH . "/TextfieldCounter/texts/" . $language . ".csv")){
      return "/TextfieldCounter/texts/" . $language . ".csv";
    }
    return "/TextfieldCounter/texts/en.csv";
  }

  /**
   * Hook called when maintenance script is called
   */
  public function maintenance() {

  }

}