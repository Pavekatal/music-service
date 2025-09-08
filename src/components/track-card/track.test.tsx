import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@shared-types/SharedTypes';
import ReduxProvider from '../../store/ReduxProvider';
import Track from './Track';
import { formatTime } from '@utils/helper';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  render(
    <ReduxProvider>
      <Track track={mockTrack} playlist={mockTracks} />
    </ReduxProvider>,
  );
  it('Рендер данных трека', () => {
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
