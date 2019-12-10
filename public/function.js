function PluginFormSelectsearch(){
  this.data = {id: null, url: null, label: null, description: null}
  this.sw_min_length = 2;
  this.method = function(){};
  /**
   * Modify form element to clickable button showing text.
   */
  this.mod = function(id, text, url, label, click, sw_min_length, method, description){
    if(typeof sw_min_length!='undefined' && sw_min_length != null){
      this.sw_min_length = sw_min_length;
    }
    if(typeof method!='undefined' && method != null){
      this.method = method;
    }
    var select = document.getElementById(id);
    if(select == null){
      alert('PluginFormSelectsearch says: Element with id '+id+' is not in dom.');
      return null;
    }
    if(!text){
      text = '-';
    }
    if(typeof description!='undefined' && description != null){
      this.description = description;
    }
    /**
     * Link.
     */
    var element = [
      {type: 'a', innerHTML: [
          {type: 'div', innerHTML: [
              {type: 'span', attribute: {class: 'glyphicon glyphicon-triangle-right', style: 'float:right'}},
              {type: 'span', innerHTML: text, attribute: {id: 'text_'+id}}
          ], attribute: {class: 'alert alert-secondary', style: 'padding:10px;height:40px'}}
      ], attribute: {href: '#', onclick: "PluginFormSelectsearch.element_click({id: '"+id+"', url: '"+url+"', label: '"+label+"', description: '"+description+"'});"}}
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
          {type: 'p', innerHTML: data.description},
          {type: 'form', innerHTML: [
              {type: 'input', attribute: {class: 'form-control', type: 'text',      id: 'sw_'+data.id, name: 'sw'}},
              {type: 'input', attribute: {class: 'btn btn-primary', type: 'submit', value: PluginI18nJson_v1.i18n('Search'), onclick: "PluginFormSelectsearch.search(this);return false;" }}
          ], attribute: {class: 'form-inline', id: 'form_selectsearch'}}
      ], attribute: {class: 'well'}},
      {type: 'div', innerHTML: '', attribute: {id: 'form_selectsearch_container'} } 
    ];
    PluginWfDom.render(element, document.getElementById('modal_'+data.id+'_body'));
    this.method();
    setTimeout(plugin_form_selectsearch_focus, 500);
    function plugin_form_selectsearch_focus(){$("#sw_"+data.id).focus();}
  }
  /**
   * Search url?sw=
   */
  this.search = function(btn){
    var sw = document.getElementById('sw_'+this.data.id).value.trim();
    if(sw.length >= this.sw_min_length){
      this.loading_add(btn.parentNode);
      $.post(this.data.url, $('#form_selectsearch').serialize()).done(function(data) { 
        document.getElementById('form_selectsearch_container').innerHTML = data;
        var scripts = document.getElementById('form_selectsearch_container').getElementsByTagName('script');
        for (var i=0;i<scripts.length;i++) {
          eval(scripts[i].innerHTML);
        }
        PluginFormSelectsearch.loading_remove();
      });
    }
  }
  this.loading_add = function(data){
    var img = document.createElement('img');
    img.src = '/plugin/form/form_v1/loading.gif';
    img.className = 'plugin_form_form_v1_loading';
    img.style.marginLeft = '10px';
    document.getElementById(data.id).appendChild(img);
  }
  this.loading_remove = function(){
    $(".plugin_form_form_v1_loading").remove();
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
