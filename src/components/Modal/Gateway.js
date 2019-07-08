// @flow
import React, { Children, Component } from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup } from 'react-transition-group';

import { type ModalType } from './Modal';

const FirstChild = ({ children }) => Children.toArray(children)[0] || null;

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default class ModalGateway extends Component<{
  children: ModalType,
  target: HTMLElement,
}> {
  static defaultProps = {
    target: canUseDOM ? document.body : null,
  };
  render() {
    if (!canUseDOM) return null;
    const { target, children } = this.props;
    return createPortal(
      <TransitionGroup component={FirstChild} children={children} />,
      target,
    );
  }
}
