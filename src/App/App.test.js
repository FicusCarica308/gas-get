/**
 * @jest-environment jsdom
 */
import App from './App';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

describe('checks if <App /> component is rendered properly', () => {
  const wrapper = shallow(<App />);
  it('Should render .App wrapper in the DOM', () => {
    expect(wrapper.find('.App')).to.have.lengthOf(1);
  });
  it('Should render .App-header wrapper in the DOM', () => {
    expect(wrapper.find('.App-header')).to.have.lengthOf(1);
  });
});
