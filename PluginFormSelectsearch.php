<?php
class PluginFormSelectsearch{
  public static function widget_include(){
    wfPlugin::enable('include/js');
    $element = array();
    $element[] = wfDocument::createWidget('include/js', 'include', array('src' => '/plugin/form/selectsearch/function.js'));
    wfDocument::renderElement($element);
  }
}