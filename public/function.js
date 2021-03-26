function PluginFormSelectsearch(){
  this.data = {id: null, url: null, label: null, description: '', description_right: '', sw: '', extra_input: '', description_below: ''}
  this.sw_min_length = 2;
  this.method = function(){};
  /**
   * Modify form element to clickable button showing text.
   */
  this.mod2 = function(data){
    this.mod(
      data.id,
      data.text,
      data.url,
      data.lable,
      data.click,
      data.sw_min_length,
      data.method,
      data.description,
      data.description_right,
      data.sw,
      data.extra_input,
      data.description_below
      );
  }
  this.mod = function(id, text, url, label, click, sw_min_length, method, description, description_right, sw, extra_input, description_below){
    console.log('description_below', description_below);
    /**
     * 
     */
    if(typeof sw_min_length!='undefined' && sw_min_length != null){
      this.sw_min_length = sw_min_length;
    }
    if(typeof method!='undefined' && method != null){
      this.method = method;
    }else{
      this.method = function(){};
    }
    var select = document.getElementById(id);
    if(select == null){
      alert('PluginFormSelectsearch says: Element with id '+id+' is not in dom.');
      return null;
    }
    if(!text){
      text = '-';
    }
    /**
     * Description
     */
    if(typeof description!='undefined' && description != null){
      this.data.description = description;
    }else{
      this.data.description = '';
    }
    /**
     * Description right
     */
    if(typeof description_right!='undefined' && description_right != null){
      this.data.description_right = description_right;
    }else{
      this.data.description_right = '';
    }
    /**
     * Description below
     */
     if(typeof description_below!='undefined' && description_below != null){
      this.data.description_below = description_below;
    }else{
      this.data.description_below = '';
    }
    /**
     * sw
     */
    if(typeof sw!='undefined' && sw != null){
      this.data.sw = sw;
    }
    /**
     * extra_input
     */
     if(typeof extra_input!='undefined' && extra_input != null){
      this.data.extra_input = extra_input;
    }else{
      this.data.extra_input = '';
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
      ], attribute: {href: '#', onclick: "PluginFormSelectsearch.element_click({id: '"+id+"', url: '"+url+"', label: '"+label+"', description: '"+this.data.description+"', description_right: '"+this.data.description_right+"', sw: '"+this.data.sw+"', description_below: '"+this.data.description_below+"'});"}}
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
    PluginWfBootstrapjs.modal({id: 'modal_'+data.id, content: '', label: data.label, size: 'xl'});
    var element = [
      {type: 'div', innerHTML: [
          {type: 'p', innerHTML: data.description},
          {type: 'form', innerHTML: [
              {type: 'input', attribute: {class: 'form-control', type: 'text',      id: 'sw_'+data.id, name: 'sw', value: data.sw}},
              {type: 'input', attribute: {class: 'btn btn-primary', type: 'submit', value: PluginI18nJson_v1.i18n('Search'), onclick: "PluginFormSelectsearch.search(this);return false;" }},
              {type: 'span', innerHTML: data.description_right, attribute: {style: 'margin-left:20px'}},
              {type: 'div', innerHTML: data.extra_input, attribute: {id: 'form_selectsearch_extra_input'}} 
          ], attribute: {class: 'form-inline', id: 'form_selectsearch'}},
          {type: 'p', innerHTML: data.description_below},
      ], attribute: {class: 'alert alert-secondary'}},
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
