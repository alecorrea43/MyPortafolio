// En ErrorBoundary.js
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Loguear o gestionar el error, si es necesario
  }

  render() {
    if (this.state.hasError) {
      return <p>Hubo un error en el componente.</p>;
    }

    return this.props.children;
  }
}
