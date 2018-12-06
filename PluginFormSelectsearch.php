<?php
class PluginFormSelectsearch{
  public static function widget_include(){
    $element = array();
    $element[] = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/form/selectsearch/function.js', 'type' => 'text/javascript'));
    wfDocument::renderElement($element);
  }
}