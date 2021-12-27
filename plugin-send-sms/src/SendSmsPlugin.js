import React from 'react';
import { VERSION, Tab } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import SmsPanel from './components/SmsPanel/SmsPanel';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'SendSmsPlugin';

export default class SendSmsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    flex.TaskCanvasTabs.Content.add(
      <Tab label='SMS' key='SmsPanel-tab'>
        <SmsPanel key='SmsPanel-component' />
      </Tab>,
      {
        sortOrder: 10,
      },
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`,
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
