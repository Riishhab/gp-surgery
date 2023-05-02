import React from "react";
import TopNav from "@govuk-react/top-nav";
import Crown from "@govuk-react/icon-crown";

const Header2 = () => {
  return (
    <TopNav
      company={
        <TopNav.Anchor href="https://example.com" target="new">
          <TopNav.IconTitle icon={<Crown height="32" width="36" />}>
            GOV.UK
          </TopNav.IconTitle>
        </TopNav.Anchor>
      }
      serviceTitle={
        <TopNav.NavLink href="https://example.com" target="new">
          Service Title
        </TopNav.NavLink>
      }
    >
      <TopNav.NavLink href="https://example.com?q=catdog">
        Navigation item #1
      </TopNav.NavLink>
      <TopNav.NavLink href="https://example.com?q=dogcat">
        Navigation item #2
      </TopNav.NavLink>
    </TopNav>
  );
};

export default Header2;
