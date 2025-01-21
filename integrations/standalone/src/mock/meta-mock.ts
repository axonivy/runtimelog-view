import type { CompositeInfo, ParameterInfo, VariableInfo } from '@axonivy/log-view-protocol';

export const ATTRIBUTES: VariableInfo = {
  types: {
    'testlog.Person': [
      {
        attribute: 'address',
        description: '',
        simpleType: 'Address',
        type: 'testlog.Address'
      },
      {
        attribute: 'birthday',
        description: '',
        simpleType: 'Number',
        type: 'Number'
      },
      {
        attribute: 'surname',
        description: '',
        simpleType: 'String',
        type: 'String'
      },
      {
        attribute: 'first name',
        description: '',
        simpleType: 'String',
        type: 'String'
      }
    ],
    'testlog.Address': [
      {
        attribute: 'address',
        description: '',
        simpleType: 'String',
        type: 'String'
      }
    ],
    'testlog.testLog.testLogData': [
      {
        attribute: 'data',
        description: '',
        simpleType: 'Data',
        type: 'testlog.Data'
      }
    ],
    'testlog.Data': [
      {
        attribute: 'persons',
        description: '',
        simpleType: 'List<Person>',
        type: 'List<testlog.Person>'
      },
      {
        attribute: 'strings',
        description: '',
        simpleType: 'List<String>',
        type: 'List<String>'
      }
    ]
  },
  variables: [
    {
      attribute: 'data',
      description: '',
      simpleType: 'testLogData',
      type: 'testlog.testLog.testLogData'
    }
  ]
};

export const COMPOSITES: Array<CompositeInfo> = [
  {
    id: 'log.test.project.AddressComponent',
    startMethods: [
      {
        name: 'start',
        parameters: [{ name: 'address', type: 'log.test.project.Address', description: 'Address for the component' }],
        deprecated: false
      },
      { name: 'empty', parameters: [], deprecated: false }
    ]
  },
  {
    id: 'log.test.project.PersonComponent',
    startMethods: [
      {
        name: 'start',
        parameters: [{ name: 'person', type: 'log.test.project.Person', description: 'Person for the Component' }],
        deprecated: false
      }
    ]
  }
];

export const COMPOSITE_PARAMS: Array<ParameterInfo> = [{ name: 'info', type: 'String', description: 'Inlogation' }];
