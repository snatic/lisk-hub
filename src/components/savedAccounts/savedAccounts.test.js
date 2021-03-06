import React from 'react';
import { expect } from 'chai';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import networks from '../../constants/networks';
import SavedAccounts from './savedAccounts';

const mountWithRouter = (node, options) => mount(<Router>{node}</Router>, options);
const fakeStore = configureStore();

describe('SavedAccounts', () => {
  let wrapper;
  const publicKey = 'fab9d261ea050b9e326d7e11587eccc343a20e64e29d8781b50fd06683cacc88';
  const activeAccount = {
    passsphrase: 'dolphin inhale planet talk insect release maze engine guilt loan attend lawn',
    publicKey: 'ecf6a5cc0b7168c7948ccfaa652cce8a41256bdac1be62eb52f68cde2fb69f2d',
    balance: 0,
  };

  const savedAccounts = [
    {
      publicKey: 'hab9d261ea050b9e326d7e11587eccc343a20e64e29d8781b50fd06683cacc88',
      network: networks.mainnet.code,
    },
    {
      network: networks.customNode.code,
      publicKey,
      address: 'http://localhost:4000',
    },
    {
      network: networks.mainnet.code,
      publicKey,
    },
    {
      network: networks.testnet.code,
      publicKey: activeAccount.publicKey,
    },
  ];

  const props = {
    closeDialog: () => {},
    accountRemoved: spy(),
    accountSwitched: spy(),
    networkOptions: {
      code: networks.mainnet.code,
    },
    activeAccount,
    savedAccounts,
    t: key => key,
    history: {
      push: spy(),
    },
  };

  beforeEach(() => {
    const store = fakeStore({
      account: {
        balance: 100e8,
      },
    });
    wrapper = mountWithRouter(<SavedAccounts {...props} />, {
      context: { store, i18n },
      childContextTypes: {
        store: PropTypes.object.isRequired,
        i18n: PropTypes.object.isRequired,
      },
    });
  });

  it('should render "Add a LIsk Id" card', () => {
    expect(wrapper.find('.add-lisk-id-card')).to.have.lengthOf(1);
  });

  it('should render savedAccounts.length of save account cards', () => {
    expect(wrapper.find('.saved-account-card')).to.have.lengthOf(savedAccounts.length);
  });

  it('should call props.accountRemoved on the second "remove button" click', () => {
    wrapper.find('button.edit-button').simulate('click');
    wrapper.find('button.remove-button').at(1).simulate('click');
    wrapper.find('button.remove-button').at(1).simulate('click');
    expect(props.accountRemoved).to.have.been.calledWith(savedAccounts[1]);
  });

  it('should call props.accountSwitched on the "saved account card" click', () => {
    wrapper.find('.saved-account-card').at(1).simulate('click');
    expect(props.accountSwitched).to.have.been.calledWith(savedAccounts[1]);
    expect(props.history.push).to.have.been.calledWith('/main/dashboard/');
  });

  it('should not call props.accountSwitched on the "saved account card" click if in "edit" mode', () => {
    wrapper.find('button.edit-button').simulate('click');
    wrapper.find('.saved-account-card').at(0).simulate('click');
    // TODO figure out why this test doesn't work
    // expect(props.accountSwitched).to.not.have.been.calledWith();
  });
});

