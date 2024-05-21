import { useState } from 'react';

const SidebarLinkGroup = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return children(handleClick, open);
};

export default SidebarLinkGroup;
