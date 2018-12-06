# Buto-Plugin-FormSelectsearch
Selectbox replacement. When using this one should use an input instead of a selectbox.

Include in head.

```
type: widget
data:
  plugin: form/selectsearch
  method: include
```

Include Javascript in html page with id for input. This will transform element.

```
PluginFormSelectsearch.mod('_id_of_input_', 'Some text related to value in input', '/path/search', 'Modal label');
```


Then all search will go to url /path/search?sw=. The Javascript below are to be included in this page.

```
PluginFormSelectsearch.row_click('1234', 'Some text related to this value.')
```
