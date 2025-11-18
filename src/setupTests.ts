import '@testing-library/jest-dom';
import * as React from 'react';

// Avoid `any` by using a safer cast for the global object.
(globalThis as unknown as { React?: typeof React }).React = React;
