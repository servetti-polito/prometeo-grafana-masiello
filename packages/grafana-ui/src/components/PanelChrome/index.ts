import React from 'react';

import { LoadingIndicator } from './LoadingIndicator';
import { PanelChrome as PanelChromeComponent, PanelChromeProps } from './PanelChrome';
import { MyPanelChrome as MyPanelChromeComponent, MyPanelChromeProps } from './MyPanelChrome';
import { TitleItem } from './TitleItem';

/**
 * @internal
 */
export type { PanelChromeProps, PanelPadding } from './PanelChrome';
/**
 * @internal
 */
export type { MyPanelChromeProps, MyPanelPadding } from './MyPanelChrome';

/**
 * @internal
 */
export interface PanelChromeType extends React.FC<PanelChromeProps> {
  LoadingIndicator: typeof LoadingIndicator;
  TitleItem: typeof TitleItem;
}
/**
 * @internal
 */
export interface MyPanelChromeType extends React.FC<MyPanelChromeProps> {
  LoadingIndicator: typeof LoadingIndicator;
  TitleItem: typeof TitleItem;
}

/**
 * @internal
 */
export const PanelChrome = PanelChromeComponent as PanelChromeType;
PanelChrome.LoadingIndicator = LoadingIndicator;
PanelChrome.TitleItem = TitleItem;
/**
 * @internal
 */
export const MyPanelChrome = MyPanelChromeComponent as MyPanelChromeType;
MyPanelChrome.LoadingIndicator = LoadingIndicator;
MyPanelChrome.TitleItem = TitleItem;

/**
 * Exporting the components for extensibility and since it is a good practice
 * according to the api-extractor.
 */
export {
  LoadingIndicator as PanelChromeLoadingIndicator,
  type LoadingIndicatorProps as PanelChromeLoadingIndicatorProps,
} from './LoadingIndicator';

export { PanelDescription } from './PanelDescription';

export { usePanelContext, PanelContextProvider, type PanelContext, PanelContextRoot } from './PanelContext';

export * from './types';
