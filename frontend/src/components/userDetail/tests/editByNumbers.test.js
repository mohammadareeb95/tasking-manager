import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { store } from '../../../store';
import { ConnectedIntl } from '../../../utils/internationalization';
import { EditsByNumbers } from '../editsByNumbers';

describe('EditsByNumbers card', () => {
  it('renders a message if the user has not stats yet', () => {
    render(
      <Provider store={store}>
        <ConnectedIntl>
          <EditsByNumbers osmStats={{}} />
        </ConnectedIntl>
      </Provider>,
    );

    expect(screen.getByText('Edits by numbers').className).toBe('f4 mv3 fw6');
    expect(
      screen.getByText(
        'No data to show yet. OpenStreetMap edits stats are updated with a delay of one hour.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the chart if osmStats data is present', () => {
    const stats = {
      total_building_count_add: 3282,
      total_building_count_mod: 7959,
      total_waterway_count_add: 11493,
      total_poi_count_add: 10805,
      total_road_km_add: 5571.84370201545,
      total_road_km_mod: 4203.47860727417,
      total_waterway_km_add: 512.706405358494,
      total_road_count_add: 13345,
      total_road_count_mod: 51730,
    };
    const { container } = render(
      <Provider store={store}>
        <ConnectedIntl>
          <EditsByNumbers osmStats={stats} />
        </ConnectedIntl>
      </Provider>,
    );

    expect(screen.getByText('Edits by numbers').className).toBe('f4 mv3 fw6');
    expect(
      screen.queryByText(
        'No data to show yet. OpenStreetMap edits stats are updated with a delay of one hour.',
      ),
    ).not.toBeInTheDocument();
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
