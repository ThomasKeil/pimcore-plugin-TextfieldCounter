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

class TextfieldCounter_ObjectController extends Pimcore_Controller_Action_Admin {

  /**
   * @var $plugin_config Zend_Config_Xml
   */
  private $plugin_config;

  /**
   * @var $config TextfieldCounter_Config
   */
  private $config;

  public function init() {
    parent::init();
    $this->config = new TextfieldCounter_Config();
    $this->plugin_config = new Zend_Config_Xml(TEXTFIELDCOUNTER_VAR.DIRECTORY_SEPARATOR."config.xml", null, true); // Filname, section, allowModifications
  }

  public function getAction() {
    $object_id = $this->_getParam("id");

    $object = Object_Abstract::getById($object_id);

    $class = Object_Class::getById($object->getO_classId());

    $class_name = strtolower($class->getName());

    $classesXML = TextfieldCounter_Config::getInstance();

    $classDOM = $classesXML->getClasses();

    $field_information = array();
    foreach ($classDOM->$class_name->children() as $input_field_node) {
      $attributes = array();
      foreach ($input_field_node->attributes() as $key => $value) $attributes[$key] = $value->__toString();
      $field_information[$attributes["name"]] = $attributes;
    }

    $this->_helper->json($field_information);
  }

}