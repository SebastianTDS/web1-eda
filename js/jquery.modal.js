/* 
  Inclusión del grupo para customizar el iframe y que muestre
  el hospital seleccionado de la lista en el mapa.
*/
$(function(){
  var referencias = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.2310564428813!2d-58.517364985025566!3d-34.64886726739492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8517078ae25%3A0x34a4956109b8dee9!2sHospital%20Donaci%C3%B3n%20Francisco%20Santojanni!5e0!3m2!1ses!2sar!4v1605666043681!5m2!1ses!2sar",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4644.133108119219!2d-58.429069344014394!3d-34.60674034392535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa08481f63a95b599!2sHospital%20Italiano%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1605667844046!5m2!1ses!2sar",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4638.509942456934!2d-58.53560289491966!3d-34.70715140710508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd5052a953205c954!2sHospital%20Dr.%20Alberto%20Balestrini!5e0!3m2!1ses!2sar!4v1605668539212!5m2!1ses!2sar"
  ];

  $(".boton").click(function(){
    $("#mapa").attr("src", referencias[this.value]);
    $(window).scrollTop($("#mapa").position().top);

    $(".close-modal").trigger('click');
  })
});

/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.2
*/

(function (factory) {
    // Making your jQuery plugin work better with npm tools
    // http://blog.npmjs.org/post/112712169830/making-your-jquery-plugin-work-better-with-npm
    if(typeof module === "object" && typeof module.exports === "object") {
      factory(require("jquery"), window, document);
    }
    else {
      factory(jQuery, window, document);
    }
  }(function($, window, document, undefined) {
  
    var modals = [],
        getCurrent = function() {
          return modals.length ? modals[modals.length - 1] : null;
        },
        selectCurrent = function() {
          var i,
              selected = false;
          for (i=modals.length-1; i>=0; i--) {
            if (modals[i].$blocker) {
              modals[i].$blocker.toggleClass('current',!selected).toggleClass('behind',selected);
              selected = true;
            }
          }
        };
  
    $.modal = function(el, options) {
      var remove, target;
      this.$body = $('body');
      this.options = $.extend({}, $.modal.defaults, options);
      this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
      this.$blocker = null;
      if (this.options.closeExisting)
        while ($.modal.isActive())
          $.modal.close(); // Close any open modals.
      modals.push(this);
      if (el.is('a')) {
        target = el.attr('href');
        this.anchor = el;
        //Select element by id from href
        if (/^#/.test(target)) {
          this.$elm = $(target);
          if (this.$elm.length !== 1) return null;
          this.$body.append(this.$elm);
          this.open();
        //AJAX
        } else {
          this.$elm = $('<div>');
          this.$body.append(this.$elm);
          remove = function(event, modal) { modal.elm.remove(); };
          this.showSpinner();
          el.trigger($.modal.AJAX_SEND);
          $.get(target).done(function(html) {
            if (!$.modal.isActive()) return;
            el.trigger($.modal.AJAX_SUCCESS);
            var current = getCurrent();
            current.$elm.empty().append(html).on($.modal.CLOSE, remove);
            current.hideSpinner();
            current.open();
            el.trigger($.modal.AJAX_COMPLETE);
          }).fail(function() {
            el.trigger($.modal.AJAX_FAIL);
            var current = getCurrent();
            current.hideSpinner();
            modals.pop(); // remove expected modal from the list
            el.trigger($.modal.AJAX_COMPLETE);
          });
        }
      } else {
        this.$elm = el;
        this.anchor = el;
        this.$body.append(this.$elm);
        this.open();
      }
    };
  
    $.modal.prototype = {
      constructor: $.modal,
  
      open: function() {
        var m = this;
        this.block();
        this.anchor.blur();
        if(this.options.doFade) {
          setTimeout(function() {
            m.show();
          }, this.options.fadeDuration * this.options.fadeDelay);
        } else {
          this.show();
        }
        $(document).off('keydown.modal').on('keydown.modal', function(event) {
          var current = getCurrent();
          if (event.which === 27 && current.options.escapeClose) current.close();
        });
        if (this.options.clickClose)
          this.$blocker.click(function(e) {
            if (e.target === this)
              $.modal.close();
          });
      },
  
      close: function() {
        modals.pop();
        this.unblock();
        this.hide();
        if (!$.modal.isActive())
          $(document).off('keydown.modal');
      },
  
      block: function() {
        this.$elm.trigger($.modal.BEFORE_BLOCK, [this._ctx()]);
        this.$body.css('overflow','hidden');
        this.$blocker = $('<div class="' + this.options.blockerClass + ' blocker current"></div>').appendTo(this.$body);
        selectCurrent();
        if(this.options.doFade) {
          this.$blocker.css('opacity',0).animate({opacity: 1}, this.options.fadeDuration);
        }
        this.$elm.trigger($.modal.BLOCK, [this._ctx()]);
      },
  
      unblock: function(now) {
        if (!now && this.options.doFade)
          this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this,true));
        else {
          this.$blocker.children().appendTo(this.$body);
          this.$blocker.remove();
          this.$blocker = null;
          selectCurrent();
          if (!$.modal.isActive())
            this.$body.css('overflow','');
        }
      },
  
      show: function() {
        this.$elm.trigger($.modal.BEFORE_OPEN, [this._ctx()]);
        if (this.options.showClose) {
          this.closeButton = $('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
          this.$elm.append(this.closeButton);
        }
        this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker);
        if(this.options.doFade) {
          this.$elm.css({opacity: 0, display: 'inline-block'}).animate({opacity: 1}, this.options.fadeDuration);
        } else {
          this.$elm.css('display', 'inline-block');
        }
        this.$elm.trigger($.modal.OPEN, [this._ctx()]);
      },
  
      hide: function() {
        this.$elm.trigger($.modal.BEFORE_CLOSE, [this._ctx()]);
        if (this.closeButton) this.closeButton.remove();
        var _this = this;
        if(this.options.doFade) {
          this.$elm.fadeOut(this.options.fadeDuration, function () {
            _this.$elm.trigger($.modal.AFTER_CLOSE, [_this._ctx()]);
          });
        } else {
          this.$elm.hide(0, function () {
            _this.$elm.trigger($.modal.AFTER_CLOSE, [_this._ctx()]);
          });
        }
        this.$elm.trigger($.modal.CLOSE, [this._ctx()]);
      },
  
      showSpinner: function() {
        if (!this.options.showSpinner) return;
        this.spinner = this.spinner || $('<div class="' + this.options.modalClass + '-spinner"></div>')
          .append(this.options.spinnerHtml);
        this.$body.append(this.spinner);
        this.spinner.show();
      },
  
      hideSpinner: function() {
        if (this.spinner) this.spinner.remove();
      },
  
      //Return context for custom events
      _ctx: function() {
        return { elm: this.$elm, $elm: this.$elm, $blocker: this.$blocker, options: this.options, $anchor: this.anchor };
      }
    };
  
    $.modal.close = function(event) {
      if (!$.modal.isActive()) return;
      if (event) event.preventDefault();
      var current = getCurrent();
      current.close();
      return current.$elm;
    };
  
    // Returns if there currently is an active modal
    $.modal.isActive = function () {
      return modals.length > 0;
    };
  
    $.modal.getCurrent = getCurrent;
  
    $.modal.defaults = {
      closeExisting: true,
      escapeClose: false,
      clickClose: false,
      closeText: '<div class="adjust">X</div>',
      closeClass: '',
      modalClass: "modal",
      blockerClass: "jquery-modal",
      spinnerHtml: '',
      showSpinner: false,
      showClose: true,
      fadeDuration: 250,   // Number of milliseconds the fade animation takes.
      fadeDelay: 0.5        // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
    };
  
    // Event constants
    $.modal.BEFORE_BLOCK = 'modal:before-block';
    $.modal.BLOCK = 'modal:block';
    $.modal.BEFORE_OPEN = 'modal:before-open';
    $.modal.OPEN = 'modal:open';
    $.modal.BEFORE_CLOSE = 'modal:before-close';
    $.modal.CLOSE = 'modal:close';
    $.modal.AFTER_CLOSE = 'modal:after-close';
    $.modal.AJAX_SEND = 'modal:ajax:send';
    $.modal.AJAX_SUCCESS = 'modal:ajax:success';
    $.modal.AJAX_FAIL = 'modal:ajax:fail';
    $.modal.AJAX_COMPLETE = 'modal:ajax:complete';
  
    $.fn.modal = function(options){
      if (this.length === 1) {
        new $.modal(this, options);
      }
      return this;
    };
  
    // Automatically bind links with rel="modal:close" to, well, close the modal.
    $(document).on('click.modal', 'a[rel~="modal:close"]', $.modal.close);
    $(document).on('click.modal', 'a[rel~="modal:open"]', function(event) {
      event.preventDefault();
      $(this).modal();
    });
  }));
  