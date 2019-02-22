function PluginFormSelectsearch(){
  this.data = {id: null, url: null, label: null}
  /**
   * Modify form element to clickable button showing text.
   */
  this.mod = function(id, text, url, label, click){
    var select = document.getElementById(id);
    if(select == null){
      alert('PluginFormSelectsearch says: Element with id '+id+' is not in dom.');
      return null;
    }
    /**
     * Link.
     */
    var element = [
      {type: 'a', innerHTML: [
          {type: 'div', innerHTML: [
              {type: 'span', attribute: {class: 'glyphicon glyphicon-triangle-right', style: 'float:right'}},
              {type: 'span', innerHTML: text, attribute: {id: 'text_'+id}}
          ], attribute: {class: 'well', style: 'padding:10px;height:40px'}}
      ], attribute: {href: '#', onclick: "PluginFormSelectsearch.element_click({id: '"+id+"', url: '"+url+"', label: '"+label+"'});"}}
    ];
    PluginWfDom.render(element, document.getElementById('div_'+id));
    /**
     * Hide current select.
     */
    select.style.display='none';
    /**
     * Click
     */
    if(click==true){
      document.getElementById('text_'+id).click();
    }
  }
  /**
   * Create search modal.
   */
  this.element_click = function(data){
    this.data = data;
    PluginWfBootstrapjs.modal({id: 'modal_'+data.id, content: '', label: data.label, size: 'lg', footer_btn_close: true, footer_btn_close_text: PluginI18nJson_v1.i18n('Close')});
    var element = [
      {type: 'div', innerHTML: [
          {type: 'form', innerHTML: [
              {type: 'input', attribute: {class: 'form-control', type: 'text', id: 'sw_'+data.id}},
              {type: 'input', attribute: {class: 'btn btn-default', type: 'submit', value: PluginI18nJson_v1.i18n('Search'), onclick: "PluginFormSelectsearch.search();return false;" }}
          ], attribute: {class: 'form-inline'}}
      ], attribute: {class: 'well'}},
      {type: 'div', innerHTML: '', attribute: {id: 'ajax_'+data.id} } 
    ];
    PluginWfDom.render(element, document.getElementById('modal_'+data.id+'_body'));
    setTimeout(plugin_form_selectsearch_focus, 500);
    function plugin_form_selectsearch_focus(){$("#sw_"+data.id).focus();}
  }
  /**
   * Search url?sw=
   */
  this.search = function(){
    var sw = document.getElementById('sw_'+this.data.id).value.trim();
    if(sw.length >= 2){
      PluginWfAjax.load('ajax_'+this.data.id, this.data.url+'?sw='+sw);
    }
  }
  /**
   * Set element value and text.
   * Close search modal.
   */
  this.row_click = function(value, text){
    var input = document.getElementById(this.data.id);
    var span = document.getElementById('text_'+this.data.id);
    /**
     * Close modal.
     */
    $("#modal_"+this.data.id).modal('hide');
    /**
     * Select item in hidden selectbox.
     */
    input.value = value;
    span.innerHTML = text;
  }
}
var PluginFormSelectsearch = new PluginFormSelectsearch();
