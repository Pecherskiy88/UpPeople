import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import UserProfile from "./Profile";

it("renders without crashing", () => {
  const wrapper = mount(
    <MemoryRouter>
      <UserProfile
        match={{
          params: { id: "1" },
          isExact: true,
          path: "/users/:id",
          name: "User Profile"
        }}
      />
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(
    true
  );
  wrapper.unmount();
});
