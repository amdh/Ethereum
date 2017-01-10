//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package['templating-runtime'].Template;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var TemplateVar;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/frozeman_template-var/TemplateVar.js                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/**                                                                                                           // 1
Template helpers                                                                                              // 2
                                                                                                              // 3
@module package frozeman:template-var                                                                         // 4
**/                                                                                                           // 5
                                                                                                              // 6
                                                                                                              // 7
/**                                                                                                           // 8
The `TemplateVar` provides reactive variables for template instances.                                         // 9
                                                                                                              // 10
Note! The reactive variables, are not preserved over hot code reloads, like the Meteor `Session` object does.
                                                                                                              // 12
                                                                                                              // 13
To set and get properties inside template helpers, hooks and events do as follow:                             // 14
                                                                                                              // 15
    // set a property                                                                                         // 16
    TemplateVar.set('myProperty', 'myValue');                                                                 // 17
                                                                                                              // 18
    // to get it inside a helper, or callback                                                                 // 19
    TemplateVar.get('myProperty');                                                                            // 20
                                                                                                              // 21
                                                                                                              // 22
@class TemplateVar                                                                                            // 23
@constructor                                                                                                  // 24
**/                                                                                                           // 25
TemplateVar = {                                                                                               // 26
                                                                                                              // 27
    /**                                                                                                       // 28
    Gets the current template instance and returns also the correct keys and values.                          // 29
                                                                                                              // 30
    @method _getTemplateInstance                                                                              // 31
    @param {Object} givenTemplate            the current template                                             // 32
    @param {String} key                 the given key                                                         // 33
    @param {Mixed} value                the value to set                                                      // 34
    @return {String} The generated key name.                                                                  // 35
    **/                                                                                                       // 36
    _getTemplateInstance: function(givenTemplate, key, value){                                                // 37
        var template = null;                                                                                  // 38
                                                                                                              // 39
        // try if a template instance was given                                                               // 40
        if(_.isObject(givenTemplate) && (givenTemplate.hasOwnProperty('_templateInstance') || givenTemplate.hasOwnProperty('view'))) {
                                                                                                              // 42
            // if it couldn't get the template, check if a template instance was given.                       // 43
            if(givenTemplate.hasOwnProperty('_templateInstance'))                                             // 44
                template = givenTemplate;                                                                     // 45
            else if(givenTemplate.hasOwnProperty('view'))                                                     // 46
                template = givenTemplate.view;                                                                // 47
                                                                                                              // 48
        // otherwise try to get one yourself                                                                  // 49
        } else {                                                                                              // 50
            try {                                                                                             // 51
                                                                                                              // 52
                template = Template.instance().view;                                                          // 53
                value = key;                                                                                  // 54
                key = givenTemplate;                                                                          // 55
                                                                                                              // 56
            } catch(e) {                                                                                      // 57
                throw new Meteor.Error('TemplateVar: works only from withing template helpers, callbacks or events. Additonally you can pass a template instance as the first parameter.');
            }                                                                                                 // 59
        }                                                                                                     // 60
                                                                                                              // 61
                                                                                                              // 62
                                                                                                              // 63
                                                                                                              // 64
        // move on view up if its a #with, #if or #unless                                                     // 65
        while(template.name.indexOf('Template.') === -1 && template.parentView) {                             // 66
            template = template.parentView;                                                                   // 67
        }                                                                                                     // 68
                                                                                                              // 69
        // make sure the template session object exists                                                       // 70
        if(template && !template._templateVar)                                                                // 71
            template._templateVar = {};                                                                       // 72
                                                                                                              // 73
        // create Reactive var, if not existing                                                               // 74
        if(template && !template._templateVar[key])                                                           // 75
            template._templateVar[key] = new ReactiveVar(value);                                              // 76
                                                                                                              // 77
                                                                                                              // 78
        // build the keyname                                                                                  // 79
        return {                                                                                              // 80
            key: key,                                                                                         // 81
            value: value,                                                                                     // 82
            template: template                                                                                // 83
        };                                                                                                    // 84
    },                                                                                                        // 85
                                                                                                              // 86
    /**                                                                                                       // 87
    Gets the template instance form an DOM selector of an element within.                                     // 88
                                                                                                              // 89
    @method _getTemplateInstance                                                                              // 90
    @param {String} selector            an element withing the template to get                                // 91
    @return {Object} The template instace                                                                     // 92
    **/                                                                                                       // 93
    _getTemplateInstanceBySelector: function(selector){                                                       // 94
                                                                                                              // 95
        var view;                                                                                             // 96
                                                                                                              // 97
        try {                                                                                                 // 98
            view = Blaze.getView($(selector)[0]);                                                             // 99
        } catch(e) {                                                                                          // 100
                                                                                                              // 101
        }                                                                                                     // 102
                                                                                                              // 103
        // set interval until elemtn appears and re-call funciton????                                         // 104
        if(selector && view) {                                                                                // 105
                                                                                                              // 106
            // move on view up if its a #with, #if or #unless                                                 // 107
            while(view.name.indexOf('Template.') === -1 && view.parentView) {                                 // 108
                view = view.parentView;                                                                       // 109
            }                                                                                                 // 110
                                                                                                              // 111
            if(!view || !view.templateInstance)                                                               // 112
                return;                                                                                       // 113
                                                                                                              // 114
            // view is not yet rendered, wait for it and recall this function                                 // 115
            if(!view.isRendered) {                                                                            // 116
                var wait = new ReactiveVar(false);                                                            // 117
                                                                                                              // 118
                view.onViewReady(function(){                                                                  // 119
                    if(wait)                                                                                  // 120
                        wait.set(true);                                                                       // 121
                    wait = null;                                                                              // 122
                });                                                                                           // 123
                                                                                                              // 124
                return wait;                                                                                  // 125
            }                                                                                                 // 126
                                                                                                              // 127
            return view.templateInstance();                                                                   // 128
                                                                                                              // 129
        } else {                                                                                              // 130
            console.warn('TemplateVar: Couldn\'t find an element within a template matching the selector "'+ selector +'"');
            return null;                                                                                      // 132
        }                                                                                                     // 133
    },                                                                                                        // 134
                                                                                                              // 135
                                                                                                              // 136
    // PUBLIC                                                                                                 // 137
                                                                                                              // 138
    /**                                                                                                       // 139
    When get is called we use the ReactiveVar.get from the template instance.                                 // 140
                                                                                                              // 141
    @method get                                                                                               // 142
    @param {Object} template            the current template                                                  // 143
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'myPropertyName'`
    @return {Mixed} The stored value.                                                                         // 145
    **/                                                                                                       // 146
    get: function (template, propertyName) {                                                                  // 147
        var values = TemplateVar._getTemplateInstance(template, propertyName);                                // 148
                                                                                                              // 149
        return values.template._templateVar[values.key].get();                                                // 150
    },                                                                                                        // 151
                                                                                                              // 152
                                                                                                              // 153
    /**                                                                                                       // 154
    When set is called every depending reactive function where `TemplateVar.get()` with the same key is called will rerun.
                                                                                                              // 156
    @method set                                                                                               // 157
    @param {Object} template            the current template                                                  // 158
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @param {String|Object} value     If the value is a string with `rerun`, then it will be rerun all dependent functions where get `TemplateInstance.get()` was called.
    @return undefined                                                                                         // 161
    **/                                                                                                       // 162
    set: function (template, propertyName, value) {                                                           // 163
        var values = TemplateVar._getTemplateInstance(template, propertyName, value);                         // 164
                                                                                                              // 165
        values.template._templateVar[values.key].set(values.value);                                           // 166
    },                                                                                                        // 167
                                                                                                              // 168
                                                                                                              // 169
    /**                                                                                                       // 170
    When get is called we use the ReactiveVar.get from the template instance.                                 // 171
                                                                                                              // 172
    @method get                                                                                               // 173
    @param {Object} selector         a selector of an element within another template                         // 174
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'myPropertyName'`
    @return {Mixed} The stored value.                                                                         // 176
    **/                                                                                                       // 177
    getFrom: function (selector, propertyName) {                                                              // 178
        var template = TemplateVar._getTemplateInstanceBySelector(selector);                                  // 179
        if(!template)                                                                                         // 180
            return;                                                                                           // 181
                                                                                                              // 182
        if(template instanceof ReactiveVar) {                                                                 // 183
            // make reactive                                                                                  // 184
            template.get();                                                                                   // 185
            return;                                                                                           // 186
        }                                                                                                     // 187
                                                                                                              // 188
        if(template.view._templateVar && template.view._templateVar[propertyName])                            // 189
            return template.view._templateVar[propertyName].get();                                            // 190
    },                                                                                                        // 191
                                                                                                              // 192
                                                                                                              // 193
    /**                                                                                                       // 194
    When set is called every depending reactive function where `TemplateVar.get()` with the same key is called will rerun.
                                                                                                              // 196
    @method set                                                                                               // 197
    @param {Object} selector         a selector of an element within another template                         // 198
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @param {String|Object} value     If the value is a string with `rerun`, then it will be rerun all dependent functions where get `TemplateInstance.get()` was called.
    @return undefined                                                                                         // 201
    **/                                                                                                       // 202
    setTo: function (selector, propertyName, value) {                                                         // 203
        var template = TemplateVar._getTemplateInstanceBySelector(selector);                                  // 204
        if(!template)                                                                                         // 205
            return;                                                                                           // 206
                                                                                                              // 207
        if(template.view._templateVar && template.view._templateVar[propertyName])                            // 208
            template.view._templateVar[propertyName].set(value);                                              // 209
    }                                                                                                         // 210
};                                                                                                            // 211
                                                                                                              // 212
// Register Global helpers                                                                                    // 213
/**                                                                                                           // 214
Global TemplateVar helper                                                                                     // 215
                                                                                                              // 216
@method (TemplateVar)                                                                                         // 217
**/                                                                                                           // 218
Template.registerHelper('TemplateVar', function(name){                                                        // 219
    return {                                                                                                  // 220
        get: TemplateVar.get.bind(this, Template.instance()),                                                 // 221
        set: TemplateVar.set.bind(this, Template.instance()),                                                 // 222
        getFrom: TemplateVar.getFrom.bind(this),                                                              // 223
        setTo: TemplateVar.setTo.bind(this)                                                                   // 224
    };                                                                                                        // 225
});                                                                                                           // 226
                                                                                                              // 227
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['frozeman:template-var'] = {}, {
  TemplateVar: TemplateVar
});

})();
