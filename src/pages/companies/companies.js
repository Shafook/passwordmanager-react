import React, { useEffect, useState } from 'react';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Selection,
  Editing,
  Toolbar,
  Item,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import './companies.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCompany,
  deleteCompany,
  selectCompanies,
  updateCompany,
} from '../../features/company/companySlice';
import { Link } from 'react-router-dom';

const allowedPageSizes = [8, 12, 20];

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const Companies = () => {
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [requestStatus, setRequestStatus] = useState('idle');

  const companies = useSelector(selectCompanies);
  const dispatch = useDispatch();

  const customDataSource = new CustomStore({
    key: 'id',
    load: () => {
      return companies;
    },

    insert: (values) => {
      return addCompany(values);
    },

    remove: (key) => {
      return deleteRecordByID(key);
    },

    update: (key, values) => {
      return editCompany({ ...values, id: key });
    },
  });

  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowKeys);
  };

  const deleteRecordByID = (Id) => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(deleteCompany({ Id })).unwrap();
      } catch (err) {
        alert('Failed to delete the password: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const deleteRecords = () => {
    selectedItemKeys.forEach((Id) => {
      deleteRecordByID(Id);
    });
  };

  const addCompany = (data) => {
    // const id = uuid();
    // const newPass = { ...data, id: id };
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(addNewCompany(data)).unwrap();
      } catch (err) {
        alert('Failed to save the company: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const editCompany = (data) => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(updateCompany(data)).unwrap();
      } catch (err) {
        alert('Failed to save the password: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const renderGridCell = (data) => {
    return <Link to={`/companies/${data.key}`}>{data.text}</Link>;
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Companies</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={customDataSource}
            // keyExpr='id'
            showBorders={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            selectedRowKeys={selectedItemKeys}
            onSelectionChanged={selectionChanged}
          >
            <Selection mode='multiple' />
            <Editing
              mode='row'
              useIcons={true}
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
            />

            {/* <Column dataField='id' caption='Id' width={100} /> */}
            <Column
              dataField='name'
              caption='Company'
              cellRender={renderGridCell}
            />
            <Toolbar>
              <Item name='addRowButton' showText='always' />
              <Item location='after'>
                <Button
                  onClick={deleteRecords}
                  icon='trash'
                  disabled={!selectedItemKeys.length}
                  text='Delete Selected Records'
                />
              </Item>
            </Toolbar>

            <Paging defaultPageSize={12} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={allowedPageSizes}
            />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Companies;
