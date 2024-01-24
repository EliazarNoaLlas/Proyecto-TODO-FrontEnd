import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Popup from '../src/components/Popup';

jest.mock('axios');

describe('Popup Component', () => {
  test('renders Popup component', () => {
    render(<Popup setShowPopup={() => {}} popupContent={{ text: 'Sample Text', id: 1 }} setUpdateUI={() => {}} />);
    const titleElement = screen.getByText(/Update ToDo/i);
    expect(titleElement).toBeTruthy();
  });

  test('updates ToDo on button click', async () => {
    const setShowPopupMock = jest.fn();
    const setUpdateUIMock = jest.fn();
    const mockResponse = { data: 'Updated ToDo' };
    axios.put.mockResolvedValue(mockResponse);

    render(
      <Popup setShowPopup={setShowPopupMock} popupContent={{ text: 'Sample Text', id: 1 }} setUpdateUI={setUpdateUIMock} />
    );

    const updateButton = screen.getByRole('button', { name: /Update/i });
    fireEvent.click(updateButton);

    // Wait for the asynchronous updateToDo function to complete
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/update/1'), { toDo: 'Sample Text' });
      expect(setUpdateUIMock).toHaveBeenCalled();
      expect(setShowPopupMock).toHaveBeenCalledWith(false);
    });
  });
});
