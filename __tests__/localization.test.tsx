import {
  ILocalizationContext,
  ILocalizationProvider,
} from '@/context/localization';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

const MockChildComponent = () => {
  const context = useContext(ILocalizationContext);
  return <div>{`Current language is ${context.language}`}</div>;
};

describe('ILocalizationProvider', () => {
  it('renders its children', () => {
    render(
      <ILocalizationProvider>
        <div>Child component</div>
      </ILocalizationProvider>
    );
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('provides the localization context to children', () => {
    render(
      <ILocalizationProvider>
        <MockChildComponent />
      </ILocalizationProvider>
    );
    expect(screen.getByText('Current language is EN')).toBeInTheDocument();
  });
});
