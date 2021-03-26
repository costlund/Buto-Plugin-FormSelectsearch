# Buto-Plugin-FormSelectsearch
Selectbox replacement. When using this one should use an input instead of a selectbox.

## Include
Include js file in head.
```
type: widget
data:
  plugin: form/selectsearch
  method: include
```

## Transform an input
Include Javascript in html page with id for input. This will transform element to showing clickable text instead of input. When user click on this a modal windows appears with a search field.
```
var data = {};
data.id = '_id_of_input_';
data.text = 'Click here';
data.url = '/page/search';
data.lable = 'Lable';
data.click = false;
data.sw_min_length = 0;
data.method = null;
data.description = 'Please search';
data.description_right = 'Text on the right side of search field.';
data.description_below = 'Text below search field.';
data.sw = '';
PluginFormSelectsearch.mod2(data);
```
Use method param to modify dom around the form. One could here add extra form controls for more advanced searching.

## Search page
A custom search page has to be created. Can be a table or just links to click on. The result must contain method row_click.
```
PluginFormSelectsearch.row_click('1234', 'Some text related to this value.')
```

## Extra input
One could use this div (id: form_selectsearch_extra_input) to add extra form controls along with method param.
```
data.method = my_custom_method_to_add_extra_input;
```


