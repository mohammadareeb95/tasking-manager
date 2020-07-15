import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { store } from '../../../store';
import { ConnectedIntl } from '../../../utils/internationalization';
import TasksByStatus from '../taskStatus';

describe('', () => {
  const stats = {
    ready: 168,
    badImagery: 3,
    lockedForMapping: 4,
    mapped: 21,
    lockedForValidation: 6,
    validated: 2,
    invalidated: 9,
    totalTasks: 213,
  };
  const { container } = render(
    <Provider store={store}>
      <ConnectedIntl>
        <TasksByStatus stats={stats} />
      </ConnectedIntl>
    </Provider>,
  );
  it('', () => {
    expect(screen.getByText('Tasks by status').className).toBe('barlow-condensed ttu f3');
    expect(container.querySelector('canvas')).toBeInTheDocument();
    expect(screen.getByText('168')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('More mapping needed')).toBeInTheDocument();
    expect(screen.getByText('Available for mapping')).toBeInTheDocument();
    expect(screen.getByText('Locked for mapping')).toBeInTheDocument();
    expect(screen.getByText('Ready for validation')).toBeInTheDocument();
    expect(screen.getByText('Locked for validation')).toBeInTheDocument();
    expect(screen.getByText('Finished')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });
});
