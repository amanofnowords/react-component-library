import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextInput } from '.';

test('Input validation renders error message.', () => {
    // Arrange
    const inputID = 'test';
    const inputAttributes = { 'data-testid': inputID };
    const errorMessage = 'There is an error';
    const errorMessageAttributes = { 'data-testid': 'errorMsg' };

    const { getByTestId, queryByTestId } = render(
        <TextInput
            componentID={inputID}
            errorMessage={errorMessage}
            inputAttributes={inputAttributes}
            errorMessageAttributes={errorMessageAttributes}
            validate={true}
        />,
    );
    // Act - change input
    fireEvent.change(getByTestId(inputID), { target: { value: 'Mark3' } });

    // Assert - error to be render
    const $error = queryByTestId('errorMsg');
    expect($error).toBeInTheDocument();
});

test('Input validation not render error message.', () => {
    // Arrange
    const inputID = 'test';
    const inputAttributes = { 'data-testid': inputID };
    const errorMessage = 'There is an error';
    const errorMessageAttributes = { 'data-testid': 'errorMsg' };

    const { getByTestId, queryByTestId } = render(
        <TextInput
            componentID={inputID}
            errorMessage={errorMessage}
            inputAttributes={inputAttributes}
            errorMessageAttributes={errorMessageAttributes}
            validate={true}
        />,
    );
    // Act - change input
    fireEvent.change(getByTestId(inputID), { target: { value: 'Mark' } });

    // Assert - error to not be render
    const $error = queryByTestId('errorMsg');
    expect($error).not.toBeInTheDocument();
});
