import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import ToDo from '../src/components/ToDo';
// Prueba de renderizado básica:
describe('ToDo Component', () => {
  test('renders correctly with given props', () => {
    render(<ToDo text="Sample Text" id={1} setUpdateUI={() => {}} setShowPopup={() => {}} setPopupContent={() => {}} />);
    
    // Verifica que el texto y los íconos estén presentes
    expect(screen.getByText('Sample Text')).toBeTruthy();
    expect(screen.getByTestId('edit-icon')).toBeTruthy();
    expect(screen.getByTestId('delete-icon')).toBeTruthy();
  });
});

// Pruebas Funcionales:
//Prueba de eliminación:

describe('ToDo Component', () => {
  test('deletes ToDo on icon click', async () => {
    const setUpdateUIMock = jest.fn();
    axios.delete.mockResolvedValueOnce({ data: 'Deleted ToDo' });

    render(
      <ToDo text="Sample Text" id={1} setUpdateUI={setUpdateUIMock} setShowPopup={() => {}} setPopupContent={() => {}} />
    );

    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    // Wait for the asynchronous deleteTodo function to complete
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/delete/1'));
      expect(setUpdateUIMock).toHaveBeenCalled();
    });
  });
});
  
// Prueba de actualización:

describe('ToDo Component', () => {
  test('updates ToDo on icon click', () => {
    const setShowPopupMock = jest.fn();
    const setPopupContentMock = jest.fn();

    render(<ToDo text="Sample Text" id={1} setUpdateUI={() => {}} setShowPopup={setShowPopupMock} setPopupContent={setPopupContentMock} />);
    
    const editIcon = screen.getByTestId('edit-icon');
    fireEvent.click(editIcon);

    expect(setPopupContentMock).toHaveBeenCalledWith({ text: 'Sample Text', id: 1 });
    expect(setShowPopupMock).toHaveBeenCalledWith(true);
  });
});