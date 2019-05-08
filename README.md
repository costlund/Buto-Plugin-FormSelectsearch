# Buto-Plugin-FormSelectsearch
Selectbox replacement. When using this one should use an input instead of a selectbox.

Include js file in head.

```
type: widget
data:
  plugin: form/selectsearch
  method: include
```

Include Javascript in html page with id for input. This will transform element to showing clickable text instead of input. When user click on this a modal windows appears with a search field.
Use method param to modify dom around the form.
```
click = true;
sw_min_length = 2;
method = function(){alert();};
PluginFormSelectsearch.mod('_id_of_input_', 'Some text related to value in input', '/path/search', 'Modal label', click, sw_min_length, method);
```


Then all search will go to url /path/search?sw=. The Javascript below are to be included in this page. One could generate a table or any other html element to click on.

```
PluginFormSelectsearch.row_click('1234', 'Some text related to this value.')
```
