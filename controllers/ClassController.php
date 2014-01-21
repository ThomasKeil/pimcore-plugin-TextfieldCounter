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


class TextfieldCounter_ClassController extends Pimcore_Controller_Action_Admin {

  public function getdataAction() {
    $class_id = $this->_getParam("id");
    $class = Object_Class::getById($class_id);

    if (is_null($class)) {
      throw new Exception("Class with id ".$class_id." doesn't exist.");
    }
    $class_name = strtolower($class->getName());

    $classesXML = TextfieldCounter_Config::getInstance();
    $classDOM = $classesXML->getClasses();

    $field_information = array();
    if ($classDOM->$class_name) {
      foreach ($classDOM->$class_name->children() as $input_field_node) {
        $attributes = array();
        foreach ($input_field_node->attributes() as $key => $value) $attributes[$key] = $value->__toString();
        $field_information[$attributes["name"]] = array(
          "charsmin" => $attributes["charsmin"],
          "charstargetmin" => $attributes["charstargetmin"],
          "charstargetmax" => $attributes["charstargetmax"],
          "charsmax" => $attributes["charsmax"],
        );
      }
    }

    $response = array(
      "fields" =>  $field_information
    );
    $this->_helper->json($response);
  }

  public function saveAction() {
    $class = Object_Class::getById(intval($this->getParam("id")));
    $class_config = Zend_Json::decode($this->getParam("configuration"));

    $class_name = strtolower($class->getName());

    $classesXML = TextfieldCounter_Config::getInstance();

    $classDOM = $classesXML->getClasses();

    unset($classDOM->$class_name);
    $classDOM->addChild($class_name);

    $this->setValues($class_config, $class_name, $classDOM);

    if ($classDOM->$class_name->count() == 0) unset($classDOM->$class_name); // remove empty classes


    $classesXML->writeClassesXml();

    $this->_helper->json(array("success" => true, "config" => $class_config));
  }

  private function setValues($class_config, $class_name, $classDOM) {
    if (array_key_exists("childs", $class_config) && is_array($class_config["childs"])) {

      foreach ($class_config["childs"] as $child) {
        $this->setValues($child, $class_name, $classDOM);
        $field_type = $child["fieldtype"];
        if (in_array($field_type, array("input", "textarea", "wysiwyg"))) {
          $fieldNode = $classDOM->$class_name->addChild("inputfield");
          $fieldNode->addAttribute("name", $child["name"]);
          $fieldNode->addAttribute("charsmin", $child["textfieldcounter_charsmin"]);
          $fieldNode->addAttribute("charstargetmin", $child["textfieldcounter_charstargetmin"]);
          $fieldNode->addAttribute("charstargetmax", $child["textfieldcounter_charstargetmax"]);
          $fieldNode->addAttribute("charsmax", $child["textfieldcounter_charsmax"]);
        }
      }
    }
  }



}