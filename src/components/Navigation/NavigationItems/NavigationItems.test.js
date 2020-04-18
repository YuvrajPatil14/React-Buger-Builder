import React from "react";

import { configure, shallow } from "enzyme";
import NavigationItems from "./NavigationItems";
import Adapter from "enzyme-adapter-react-16";

import NavigationItem from "./NavigationItem/NavigationItem";
configure({ adapter: new Adapter() });
describe("NavigationItems", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render 2 Nav item elements when not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render 3 Nav item elements when authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated/>);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("Logout", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
  });
});
