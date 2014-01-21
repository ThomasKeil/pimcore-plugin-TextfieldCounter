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


class TextfieldCounter_Config {

  private $classes;

  /**
   * @var $config Zend_Config_Xml
   */
  private $config;

  /**
   * Singleton instance
   *
   * @var TextfieldCounter_Config
   */
  protected static $_instance = null;

  /**
   * Returns an instance of TextfieldCounter_Config
   *
   * Singleton pattern implementation
   *
   * @return TextfieldCounter_Config
   */
  public static function getInstance() {
    if (null === self::$_instance) {
      self::$_instance = new self();
    }

    return self::$_instance;
  }

  public function __construct() {
    $this->classes = simplexml_load_file(TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR."classes.xml");
    $this->config = new Zend_Config_Xml(TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR."config.xml", null, true); // Filname, section, allowModifications
  }


  public function getClasses() {
    return $this->classes->classes;
  }

  public function getConfig() {
    return $this->config;
  }

  public function getClassesAsArray() {
    $classes = array();
    foreach ($this->classes->classes->children() as $class_node) {
      $class_name = $class_node->getName();
      $classes[$class_name] = array();
      foreach ($class_node->children() as $child_node) {
        $attributes = array();
        foreach ($child_node->attributes() as $key => $value) $attributes[$key] = $value;
/*
        TODO: Is leftover from SphinxSearch needed?
        $name = strval($attributes["name"]);
        $classes[$class_name][$name] = array(
          "weight" => array_key_exists("weight", $attributes) ? intval($attributes["weight"]) : 1,
          "store_attribute" => array_key_exists("field_type", $attributes)
        );*/
      }
    }
    return $classes;
  }

  public function writeClassesXml() {
    $this->classes->asXML(TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR."classes.xml");
  }
}