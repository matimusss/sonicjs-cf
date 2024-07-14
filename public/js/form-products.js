





(function () {
Formio.createForm(document.getElementById('formio-attributes'), {
  components: [
    {
      type: 'editgrid',
      label: 'Attributes',
      key: 'attributes',
      defaultOpen: true,
      removeRow: 'Cancel',
      components: 

      [
        {
          "label": "Enter your annual income (trigger)",
          "placeholder": "EX $52,000",
          "tooltip": "Input a value less than 45,000 to trigger the condition",
          "mask": false,
          "spellcheck": true,
          "tableView": false,
          "currency": "USD",
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "income",
          "type": "currency",
          "input": true,
          "delimiter": true
        },
        {
          "label": "Select your marital status (trigger)",
          "optionsLabelPosition": "right",
          "tooltip": "Select Single or Widowed to trigger the condition",
          "inline": false,
          "tableView": false,
          "values": [
            {
              "label": "Single",
              "value": "single",
              "shortcut": ""
            },
            {
              "label": "Married",
              "value": "married",
              "shortcut": ""
            },
            {
              "label": "Separated",
              "value": "separated",
              "shortcut": ""
            },
            {
              "label": "Widowed",
              "value": "widowed",
              "shortcut": ""
            }
          ],
          "key": "maritalStatus",
          "type": "radio",
          "input": true
        },
        {
          "title": "Conditional Panel",
          "collapsible": false,
          "key": "panel",
          "customConditional": "show = (data.income \u003C 45000) & (data.maritalStatus == 'single' || data.maritalStatus == 'widowed');",
          "type": "panel",
          "label": "Panel",
          "input": false,
          "tableView": false,
          "components": [
            {
              "label": "HTML",
              "attrs": [
                {
                  "attr": "",
                  "value": ""
                }
              ],
              "content": "You are eligible for financial assistance:",
              "refreshOnChange": false,
              "key": "html",
              "type": "htmlelement",
              "input": false,
              "tableView": false
            },
            {
              "label": "Enter your email address for application information",
              "placeholder": "Please enter a valid email address",
              "tableView": true,
              "key": "enterYourEmailAddressForApplicationInformation",
              "type": "email",
              "input": true
            }
          ]
        },
        {
          "label": "\u003Cb\u003EReset Form\u003C/b\u003E",
          "action": "reset",
          "showValidations": false,
          "theme": "secondary",
          "block": true,
          "disableOnInvalid": true,
          "tableView": false,
          "key": "submit",
          "type": "button",
          "input": true
        }
      ]
      
    }
  ]
});
})();






  (function () {
 

    Formio.createForm(document.getElementById('formio-tags'), {
      components: [
          {
            label: 'Tags',
            key: 'tags',
            type: 'editgrid',
            input: true,
            templates: {
              header: '' +
                '<div class="row">' +
                '  {% util.eachComponent(components, function(component) { %} ' +
                '    <div class="col-sm-2">' +
                '      <strong>{{ component.label }}</strong>' +
                '    </div>' +
                '  {% }) %}' +
                '</div>',
              row: '' +
                '<div class="row">' +
                '  {%util.eachComponent(components, function(component) { %}' +
                '    <div class="col-sm-2">' +
                '      {{ row[component.key] }}' +
                '    </div>' +
                '  {% }) %}' +
                '  <div class="col-sm-2">' +
                '    <div class="btn-group pull-right">' +
                '      <div class="btn btn-default btn-sm editRow"><i class="bi bi-edit"></i></div>' +
                '      <div class="btn btn-danger btn-sm removeRow"><i class="bi bi-trash"></i></div>' +
                '    </div>' +
                '  </div>' +
                '</div>',
              footer: ''
            },
            components: [
          
              {
                label: 'Nombre de Tag',
                key: 'tagName',
                type: 'select',
                input: true,
                data: {
                  values: [
                    {value: 'Remeras', label: 'Remeras'},
                    {value: 'Batas', label: 'Batas'},
                    {value: 'Ojotas', label: 'Ojotas'},
                    {value: 'Buzos', label: 'Buzos'}
                  ]
                },
                dataSrc: "values",
                template: '<span>{{ item.label }}</span>'
              }
            ]
          }
        ]
    })
    .then(function(form) {
      // Provide a default submission.
      form.submission = {
        data: {
          tags: [
            {
              tagName: 'Corbatas'
            },
            {
              tagName: 'Guantes'
            }
          ]
        }
      };
    });

  })
  
  ();






