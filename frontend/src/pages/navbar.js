import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { StyledLink as Link } from "baseui/link";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";

export default function Navbar() {
  const [css] = useStyletron();
  return (
    <HeaderNavigation>
      <NavigationList $align={ALIGN.left}>
        <NavigationItem
          $as="a"
          href="/"
          className={css({
            textDecorationLine: "none",
          })}
        >
          <span role="img">🪰</span> FlyDAR
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Link href="/#/create">Register Trap</Link>
        </NavigationItem>
        {/* <NavigationItem>
          <Link href="/#/edit">Edit User Details</Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="/#/list">List All Users</Link>
        </NavigationItem> */}
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        <NavigationItem className={css({ marginRight: "10px" })}>
          <Button $as="a" href="/#/review">
            Review Registered Fruit Traps
          </Button>
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
}
