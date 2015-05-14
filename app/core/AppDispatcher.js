'use strict';

import { Dispatcher } from 'flux';
import PayloadSources from '../constants/PayloadSources';

const isProduction = process.env.NODE_ENV === 'production';

class AppDispatcher extends Dispatcher {
  handleServerAction(action) {
    if (!isProduction) {
      console.log('server action', action);
    }

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action
    });
  }

  handleViewAction(action) {
    if (!isProduction) {
      console.log('view action', action);
    }

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action
    });
  }
}

export default new AppDispatcher();
